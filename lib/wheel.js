import "server-only";
import { query, transaction } from "./db";
import { parseJson, slugify, str, strList, strOrNull, toInt } from "./validation";
import { WHEEL_ICON_NAMES } from "@/components/wheel-of-emotion/icon-names";

export const DEFAULT_STATEMENTS_KEY = "wheel.default_statements";
export const QUOTE_KEY = "wheel.quote";
export const REFLECTION_MAX = 500;
const COLOR_RE = /^#[0-9a-fA-F]{6}$/;

const FALLBACK_STATEMENTS = [
  "Something specific triggered this",
  "It has been building for a while",
  "It is connected to someone close to me",
  "It is about how I see myself",
  "I'm not sure yet",
];
const FALLBACK_QUOTE = "Emotions are not the enemy; they are information.";

const iconOr = (name, fallback) => (WHEEL_ICON_NAMES.includes(name) ? name : fallback);

/* ────────────────────────────── settings ────────────────────────────── */

export async function getSetting(key, fallback = null) {
  const rows = await query("SELECT setting_value FROM site_settings WHERE setting_key = ? LIMIT 1", [key]);
  return rows.length ? rows[0].setting_value : fallback;
}

export async function setSetting(key, value) {
  await query(
    "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",
    [key, value]
  );
}

export async function getWheelSettings() {
  const [statements, quote] = await Promise.all([getSetting(DEFAULT_STATEMENTS_KEY), getSetting(QUOTE_KEY)]);
  const list = parseJson(statements, null);
  return {
    defaultStatements: Array.isArray(list) && list.length ? list : FALLBACK_STATEMENTS,
    quote: quote ?? FALLBACK_QUOTE,
  };
}

export async function saveWheelSettings(input) {
  const statements = strList(input?.defaultStatements, 12, 200);
  if (!statements.length) return { ok: false, error: "Add at least one default statement." };
  await setSetting(DEFAULT_STATEMENTS_KEY, JSON.stringify(statements));
  await setSetting(QUOTE_KEY, str(input?.quote, 300));
  return { ok: true };
}

/* ────────────────────────────── mappers ────────────────────────────── */

function mapEmotion(row) {
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    color: row.color,
    icon: iconOr(row.icon, "Sparkles"),
    description: row.description || "",
    prompt: row.prompt || "",
    insight: row.insight || "",
    underlying: row.underlying || "",
    deeper: row.deeper || "",
    core_need: row.core_need || "",
    is_active: Boolean(row.is_active),
    sort_order: row.sort_order,
  };
}

function mapFeeling(row) {
  const statements = parseJson(row.statements, null);
  return {
    id: row.id,
    emotion_id: row.emotion_id,
    label: row.label,
    noun: row.noun || "",
    statements: Array.isArray(statements) ? statements : null,
    insight: row.insight || "",
    underlying: row.underlying || "",
    deeper: row.deeper || "",
    core_need: row.core_need || "",
    sort_order: row.sort_order,
  };
}

function mapNeed(row) {
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    icon: iconOr(row.icon, "Heart"),
    core_need: row.core_need || "",
    is_active: Boolean(row.is_active),
    sort_order: row.sort_order,
  };
}

/* ────────────────────────────── public ────────────────────────────── */

/**
 * Everything the public wheel needs, in the same shape the original data.js used
 * (emotion.id = slug, feelings[].id, needs[].id = slug, camelCase coreNeed).
 */
export async function getWheelData() {
  const [emotionRows, feelingRows, needRows, settings] = await Promise.all([
    query("SELECT * FROM emotions WHERE is_active = 1 ORDER BY sort_order, id"),
    query(
      `SELECT f.* FROM emotion_feelings f JOIN emotions e ON e.id = f.emotion_id
        WHERE e.is_active = 1 ORDER BY f.sort_order, f.id`
    ),
    query("SELECT * FROM emotion_needs WHERE is_active = 1 ORDER BY sort_order, id"),
    getWheelSettings(),
  ]);
  const feelings = feelingRows.map(mapFeeling);

  return {
    emotions: emotionRows.map(mapEmotion).map((e) => ({
      id: e.slug,
      label: e.label,
      color: e.color,
      icon: e.icon,
      description: e.description,
      prompt: e.prompt || undefined,
      insight: e.insight,
      underlying: e.underlying,
      deeper: e.deeper,
      coreNeed: e.core_need,
      feelings: feelings
        .filter((f) => f.emotion_id === e.id)
        .map((f) => ({
          id: `f${f.id}`,
          label: f.label,
          ...(f.noun ? { noun: f.noun } : {}),
          ...(f.statements ? { statements: f.statements } : {}),
          ...(f.insight ? { insight: f.insight } : {}),
          ...(f.underlying ? { underlying: f.underlying } : {}),
          ...(f.deeper ? { deeper: f.deeper } : {}),
          ...(f.core_need ? { coreNeed: f.core_need } : {}),
        })),
    })),
    needs: needRows.map(mapNeed).map((n) => ({ id: n.slug, label: n.label, icon: n.icon, coreNeed: n.core_need })),
    defaultStatements: settings.defaultStatements,
    quote: settings.quote,
  };
}

/**
 * Save a visitor's reflection. Emotion/feeling/need are looked up in the database,
 * and the "deeper layers" are rebuilt on the server from the stored content.
 */
export async function saveReflection(input) {
  const reflection = str(input?.reflection, REFLECTION_MAX);
  if (!reflection) return { ok: false, status: 400, error: "Please write your reflection first." };

  const [emotionRow] = await query("SELECT * FROM emotions WHERE slug = ? AND is_active = 1 LIMIT 1", [str(input?.emotion, 100)]);
  if (!emotionRow) return { ok: false, status: 400, error: "Please choose an emotion." };
  const feelingId = toInt(String(input?.feeling ?? "").replace(/^f/, ""));
  const [feelingRow] = feelingId
    ? await query("SELECT * FROM emotion_feelings WHERE id = ? AND emotion_id = ? LIMIT 1", [feelingId, emotionRow.id])
    : [];
  if (!feelingRow) return { ok: false, status: 400, error: "Please choose a feeling." };
  const needSlug = str(input?.need, 100);
  const [needRow] = needSlug ? await query("SELECT * FROM emotion_needs WHERE slug = ? LIMIT 1", [needSlug]) : [];

  const emotion = mapEmotion(emotionRow);
  const feeling = mapFeeling(feelingRow);
  const statement = str(input?.statement, 500) || null;
  const layers = [
    { title: "Surface Emotion", value: feeling.label },
    { title: "Underlying Emotion", value: feeling.underlying || emotion.underlying },
    { title: "Deeper Layer", value: feeling.deeper || emotion.deeper },
    { title: "Core Need", value: needRow?.core_need || feeling.core_need || emotion.core_need },
  ];

  const res = await query(
    `INSERT INTO emotion_reflections (emotion_id, emotion_label, feeling_label, statement, need_label, layers, reflection)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [emotion.id, emotion.label, feeling.label, statement, needRow?.label ?? null, JSON.stringify(layers), reflection]
  );
  return { ok: true, id: res.insertId };
}

/* ────────────────────────────── admin: emotions ────────────────────────────── */

export async function listEmotionsAdmin() {
  const rows = await query(
    `SELECT e.*,
            (SELECT COUNT(*) FROM emotion_feelings f WHERE f.emotion_id = e.id) AS feeling_count,
            (SELECT COUNT(*) FROM emotion_reflections r WHERE r.emotion_id = e.id) AS reflection_count
       FROM emotions e ORDER BY e.sort_order, e.id`
  );
  return rows.map((r) => ({ ...mapEmotion(r), feeling_count: Number(r.feeling_count), reflection_count: Number(r.reflection_count) }));
}

export async function getEmotionAdmin(id) {
  const [row] = await query("SELECT * FROM emotions WHERE id = ? LIMIT 1", [id]);
  if (!row) return null;
  const feelings = await query("SELECT * FROM emotion_feelings WHERE emotion_id = ? ORDER BY sort_order, id", [id]);
  return { ...mapEmotion(row), feelings: feelings.map(mapFeeling) };
}

export function normalizeEmotionInput(input) {
  const errors = [];
  const data = {
    label: str(input?.label, 100),
    slug: slugify(input?.slug || input?.label),
    color: COLOR_RE.test(str(input?.color, 20)) ? str(input?.color, 20) : "",
    icon: iconOr(str(input?.icon, 50), "Sparkles"),
    description: strOrNull(input?.description, 1000),
    prompt: strOrNull(input?.prompt, 255),
    insight: strOrNull(input?.insight, 2000),
    underlying: strOrNull(input?.underlying, 255),
    deeper: strOrNull(input?.deeper, 255),
    core_need: strOrNull(input?.core_need, 255),
    is_active: input?.is_active === undefined ? true : Boolean(input.is_active),
    feelings: [],
  };
  if (!data.label) errors.push("Emotion name is required.");
  if (!data.slug) errors.push("A URL key could not be created from the name.");
  if (!data.color) errors.push("Choose a colour (e.g. #D6A54E).");

  const feelings = Array.isArray(input?.feelings) ? input.feelings.slice(0, 40) : [];
  feelings.forEach((f, i) => {
    const custom = Array.isArray(f?.statements) ? strList(f.statements, 12, 200) : null;
    const feeling = {
      id: toInt(f?.id),
      label: str(f?.label, 100),
      noun: strOrNull(f?.noun, 100),
      statements: custom && custom.length ? custom : null,
      insight: strOrNull(f?.insight, 2000),
      underlying: strOrNull(f?.underlying, 255),
      deeper: strOrNull(f?.deeper, 255),
      core_need: strOrNull(f?.core_need, 255),
    };
    if (!feeling.label) errors.push(`Feeling #${i + 1} needs a name.`);
    data.feelings.push(feeling);
  });
  if (data.is_active && data.feelings.length === 0) errors.push("Add at least one feeling (or turn the emotion off).");
  return { data, errors };
}

async function uniqueSlug(conn, base, excludeId) {
  let slug = base;
  for (let n = 2; n < 1000; n++) {
    const [rows] = await conn.execute("SELECT id FROM emotions WHERE slug = ? AND (? IS NULL OR id <> ?) LIMIT 1", [slug, excludeId, excludeId]);
    if (!rows.length) return slug;
    slug = `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
}

/** Create (id = null) or update an emotion together with its feelings. */
export async function saveEmotion(id, data) {
  return transaction(async (conn) => {
    const slug = await uniqueSlug(conn, data.slug, id ?? null);
    const values = [slug, data.label, data.color, data.icon, data.description, data.prompt, data.insight, data.underlying, data.deeper, data.core_need, data.is_active ? 1 : 0];
    let emotionId = id;
    if (emotionId) {
      const [res] = await conn.execute(
        `UPDATE emotions SET slug=?, label=?, color=?, icon=?, description=?, prompt=?, insight=?, underlying=?, deeper=?, core_need=?, is_active=? WHERE id=?`,
        [...values, emotionId]
      );
      if (res.affectedRows === 0) throw Object.assign(new Error("Emotion not found"), { status: 404 });
    } else {
      const [[{ next }]] = await conn.execute("SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM emotions");
      const [res] = await conn.execute(
        `INSERT INTO emotions (slug, label, color, icon, description, prompt, insight, underlying, deeper, core_need, is_active, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [...values, next]
      );
      emotionId = res.insertId;
    }

    const [existing] = await conn.execute("SELECT id FROM emotion_feelings WHERE emotion_id = ?", [emotionId]);
    const existingIds = new Set(existing.map((r) => r.id));
    const kept = new Set();
    for (const [i, f] of data.feelings.entries()) {
      const fv = [f.label, f.noun, f.statements ? JSON.stringify(f.statements) : null, f.insight, f.underlying, f.deeper, f.core_need, i + 1];
      if (f.id && existingIds.has(f.id)) {
        await conn.execute(
          "UPDATE emotion_feelings SET label=?, noun=?, statements=?, insight=?, underlying=?, deeper=?, core_need=?, sort_order=? WHERE id=?",
          [...fv, f.id]
        );
        kept.add(f.id);
      } else {
        const [res] = await conn.execute(
          `INSERT INTO emotion_feelings (label, noun, statements, insight, underlying, deeper, core_need, sort_order, emotion_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [...fv, emotionId]
        );
        kept.add(res.insertId);
      }
    }
    for (const oldId of existingIds) {
      if (!kept.has(oldId)) await conn.execute("DELETE FROM emotion_feelings WHERE id = ?", [oldId]);
    }
    return emotionId;
  });
}

export async function setEmotionActive(id, isActive) {
  const res = await query("UPDATE emotions SET is_active = ? WHERE id = ?", [isActive ? 1 : 0, id]);
  return res.affectedRows > 0;
}

export async function deleteEmotion(id) {
  const res = await query("DELETE FROM emotions WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

export async function reorderEmotions(ids) {
  await transaction(async (conn) => {
    for (const [i, id] of ids.entries()) await conn.execute("UPDATE emotions SET sort_order = ? WHERE id = ?", [i + 1, id]);
  });
}

/* ────────────────────────────── admin: needs ────────────────────────────── */

export async function listNeedsAdmin() {
  const rows = await query("SELECT * FROM emotion_needs ORDER BY sort_order, id");
  return rows.map(mapNeed);
}

/** Replace the whole needs list (existing rows updated by id, missing rows deleted). */
export async function saveNeeds(list) {
  const errors = [];
  const items = (Array.isArray(list) ? list : []).slice(0, 12).map((n, i) => {
    const item = {
      id: toInt(n?.id),
      label: str(n?.label, 100),
      slug: slugify(n?.slug || n?.label),
      icon: iconOr(str(n?.icon, 50), "Heart"),
      core_need: strOrNull(n?.core_need, 255),
      is_active: n?.is_active === undefined ? true : Boolean(n.is_active),
    };
    if (!item.label) errors.push(`Need #${i + 1} needs a name.`);
    return item;
  });
  const slugs = items.map((n) => n.slug);
  if (new Set(slugs).size !== slugs.length) errors.push("Two needs have the same name.");
  if (errors.length) return { ok: false, errors };

  await transaction(async (conn) => {
    const [existing] = await conn.execute("SELECT id FROM emotion_needs");
    const existingIds = new Set(existing.map((r) => r.id));
    const kept = new Set(items.filter((n) => n.id && existingIds.has(n.id)).map((n) => n.id));
    for (const oldId of existingIds) {
      if (!kept.has(oldId)) await conn.execute("DELETE FROM emotion_needs WHERE id = ?", [oldId]);
    }
    // Temporarily free slugs so renames/swaps don't hit the unique key
    for (const id of kept) await conn.execute("UPDATE emotion_needs SET slug = CONCAT('tmp-', id) WHERE id = ?", [id]);
    for (const [i, n] of items.entries()) {
      const v = [n.slug, n.label, n.icon, n.core_need, n.is_active ? 1 : 0, i + 1];
      if (n.id && kept.has(n.id)) {
        await conn.execute("UPDATE emotion_needs SET slug=?, label=?, icon=?, core_need=?, is_active=?, sort_order=? WHERE id=?", [...v, n.id]);
      } else {
        await conn.execute("INSERT INTO emotion_needs (slug, label, icon, core_need, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?)", v);
      }
    }
  });
  return { ok: true };
}

/* ────────────────────────────── admin: reflections ────────────────────────────── */

function reflectionFilters({ emotionId, q, from, to }) {
  const where = [];
  const params = [];
  if (emotionId) {
    where.push("r.emotion_id = ?");
    params.push(emotionId);
  }
  if (q) {
    where.push("(r.reflection LIKE ? OR r.feeling_label LIKE ? OR r.statement LIKE ?)");
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (from) {
    where.push("r.created_at >= ?");
    params.push(`${from} 00:00:00`);
  }
  if (to) {
    where.push("r.created_at <= ?");
    params.push(`${to} 23:59:59`);
  }
  return { sql: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

export async function listReflections({ page = 1, pageSize = 20, ...filters } = {}) {
  const { sql, params } = reflectionFilters(filters);
  const size = Math.min(Math.max(toInt(pageSize) || 20, 1), 200);
  const current = Math.max(toInt(page) || 1, 1);
  const [{ total }] = await query(`SELECT COUNT(*) AS total FROM emotion_reflections r ${sql}`, params);
  const rows = await query(
    `SELECT r.* FROM emotion_reflections r ${sql} ORDER BY r.created_at DESC, r.id DESC LIMIT ${size} OFFSET ${(current - 1) * size}`,
    params
  );
  return {
    rows: rows.map((r) => ({ ...r, layers: parseJson(r.layers, []) })),
    total: Number(total),
    page: current,
    pages: Math.max(1, Math.ceil(Number(total) / size)),
  };
}

export async function exportReflections(filters = {}) {
  const { sql, params } = reflectionFilters(filters);
  const rows = await query(`SELECT r.* FROM emotion_reflections r ${sql} ORDER BY r.created_at DESC, r.id DESC LIMIT 10000`, params);
  return rows.map((r) => ({ ...r, layers: parseJson(r.layers, []) }));
}

export async function deleteReflection(id) {
  const res = await query("DELETE FROM emotion_reflections WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

export async function wheelStats() {
  const [row] = await query(
    `SELECT (SELECT COUNT(*) FROM emotions WHERE is_active = 1) AS emotions,
            (SELECT COUNT(*) FROM emotion_feelings) AS feelings,
            (SELECT COUNT(*) FROM emotion_reflections) AS reflections`
  );
  return { emotions: Number(row.emotions), feelings: Number(row.feelings), reflections: Number(row.reflections) };
}
