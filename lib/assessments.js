import "server-only";
import { query, transaction } from "./db";
import { parseJson, slugify, str, strOrNull, strList, imagePath, toInt } from "./validation";

export const QUESTION_TYPES = ["choice", "text"];

/* ────────────────────────────── mappers ────────────────────────────── */

function mapAssessment(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description || "",
    intro_text: row.intro_text || "",
    image: row.image || "",
    duration: row.duration || "",
    closing_title: row.closing_title || "",
    closing_text: row.closing_text || "",
    final_reflection: row.final_reflection || "",
    is_published: Boolean(row.is_published),
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function mapProfile(row) {
  return {
    id: row.id,
    title: row.title,
    short_description: row.short_description || "",
    image: row.image || "",
    quote: row.quote || "",
    core_insight: row.core_insight || "",
    notices: parseJson(row.notices, []),
    pattern_steps: parseJson(row.pattern_steps, []),
    reflection: row.reflection || "",
    sort_order: row.sort_order,
  };
}

/* ────────────────────────────── public ────────────────────────────── */

/** Published assessments for the public grid, with question counts. */
export async function listPublishedAssessments() {
  const rows = await query(
    `SELECT a.*,
            (SELECT COUNT(*) FROM assessment_questions q WHERE q.assessment_id = a.id) AS question_count,
            (SELECT COUNT(*) FROM assessment_questions q WHERE q.assessment_id = a.id AND q.type = 'text') AS text_count
       FROM assessments a
      WHERE a.is_published = 1
      ORDER BY a.sort_order ASC, a.id ASC`
  );
  return rows.map((r) => ({
    ...mapAssessment(r),
    question_count: Number(r.question_count),
    text_count: Number(r.text_count),
  }));
}

/**
 * A published assessment with its questions/options for taking it.
 * Profile mapping is NOT sent to the browser — scoring happens on the server.
 */
export async function getPublicAssessment(idOrSlug) {
  const id = toInt(idOrSlug);
  const rows = await query(
    `SELECT * FROM assessments WHERE is_published = 1 AND ${id ? "id = ?" : "slug = ?"} LIMIT 1`,
    [id ?? String(idOrSlug)]
  );
  if (!rows.length) return null;
  const assessment = mapAssessment(rows[0]);
  const questions = await loadQuestions(assessment.id, { withProfiles: false });
  return { ...assessment, questions };
}

async function loadQuestions(assessmentId, { withProfiles }) {
  const questions = await query(
    "SELECT id, question, type, sort_order FROM assessment_questions WHERE assessment_id = ? ORDER BY sort_order, id",
    [assessmentId]
  );
  const options = questions.length
    ? await query(
        `SELECT o.id, o.question_id, o.option_text, o.profile_id, o.sort_order
           FROM assessment_options o
           JOIN assessment_questions q ON q.id = o.question_id
          WHERE q.assessment_id = ?
          ORDER BY o.sort_order, o.id`,
        [assessmentId]
      )
    : [];

  return questions.map((q) => ({
    id: q.id,
    question: q.question,
    type: q.type,
    options: options
      .filter((o) => o.question_id === q.id)
      .map((o) => ({
        id: o.id,
        text: o.option_text,
        ...(withProfiles ? { profile_id: o.profile_id } : {}),
      })),
  }));
}

export async function getProfiles(assessmentId) {
  const rows = await query(
    "SELECT * FROM assessment_profiles WHERE assessment_id = ? ORDER BY sort_order, id",
    [assessmentId]
  );
  return rows.map(mapProfile);
}

/* ────────────────────────────── admin ────────────────────────────── */

export async function listAssessmentsAdmin() {
  const rows = await query(
    `SELECT a.*,
            (SELECT COUNT(*) FROM assessment_questions q WHERE q.assessment_id = a.id) AS question_count,
            (SELECT COUNT(*) FROM assessment_profiles p WHERE p.assessment_id = a.id) AS profile_count,
            (SELECT COUNT(*) FROM assessment_submissions s WHERE s.assessment_id = a.id) AS submission_count
       FROM assessments a
      ORDER BY a.sort_order ASC, a.id ASC`
  );
  return rows.map((r) => ({
    ...mapAssessment(r),
    question_count: Number(r.question_count),
    profile_count: Number(r.profile_count),
    submission_count: Number(r.submission_count),
  }));
}

/** Full assessment for the admin editor (includes option → profile mapping). */
export async function getAssessmentForAdmin(id) {
  const rows = await query("SELECT * FROM assessments WHERE id = ? LIMIT 1", [id]);
  if (!rows.length) return null;
  const assessment = mapAssessment(rows[0]);
  const [profiles, questions] = await Promise.all([
    getProfiles(id),
    loadQuestions(id, { withProfiles: true }),
  ]);
  return { ...assessment, profiles, questions };
}

/**
 * Clean + validate the editor payload.
 * Returns { data, errors } — errors is an array of human readable strings.
 */
export function normalizeAssessmentInput(input) {
  const errors = [];
  const data = {
    title: str(input?.title, 255),
    slug: slugify(input?.slug || input?.title),
    description: strOrNull(input?.description, 2000),
    intro_text: strOrNull(input?.intro_text, 5000),
    image: imagePath(input?.image),
    duration: strOrNull(input?.duration, 100),
    closing_title: strOrNull(input?.closing_title, 255),
    closing_text: strOrNull(input?.closing_text, 5000),
    final_reflection: strOrNull(input?.final_reflection, 2000),
    is_published: Boolean(input?.is_published),
    profiles: [],
    questions: [],
  };

  if (!data.title) errors.push("Title is required.");
  if (!data.slug) errors.push("A URL slug could not be created from the title.");

  const profileKeys = new Set();
  for (const [i, p] of (Array.isArray(input?.profiles) ? input.profiles : []).slice(0, 20).entries()) {
    const key = str(p?.key, 64) || `p${i}`;
    const profile = {
      id: toInt(p?.id),
      key,
      title: str(p?.title, 255),
      short_description: strOrNull(p?.short_description, 500),
      image: imagePath(p?.image),
      quote: strOrNull(p?.quote, 1000),
      core_insight: strOrNull(p?.core_insight, 2000),
      notices: strList(p?.notices, 20, 300),
      pattern_steps: strList(p?.pattern_steps, 12, 100),
      reflection: strOrNull(p?.reflection, 2000),
    };
    if (!profile.title) errors.push(`Result profile #${i + 1} needs a title.`);
    profileKeys.add(key);
    data.profiles.push(profile);
  }

  for (const [i, q] of (Array.isArray(input?.questions) ? input.questions : []).slice(0, 100).entries()) {
    const type = QUESTION_TYPES.includes(q?.type) ? q.type : "choice";
    const question = {
      id: toInt(q?.id),
      question: str(q?.question, 1000),
      type,
      options: [],
    };
    if (!question.question) errors.push(`Question #${i + 1} needs text.`);

    if (type === "choice") {
      for (const [j, o] of (Array.isArray(q?.options) ? q.options : []).slice(0, 10).entries()) {
        const profileKey = str(o?.profileKey, 64) || null;
        const option = {
          id: toInt(o?.id),
          text: str(o?.text, 500),
          profileKey: profileKey && profileKeys.has(profileKey) ? profileKey : null,
        };
        if (!option.text) errors.push(`Question #${i + 1}, option #${j + 1} needs text.`);
        question.options.push(option);
      }
      if (question.options.length < 2) errors.push(`Question #${i + 1} needs at least 2 options.`);
    }
    data.questions.push(question);
  }

  // Stricter rules before something goes live
  if (data.is_published && data.questions.length > 0) {
    if (data.profiles.length === 0) {
      errors.push("Add at least one result profile before publishing.");
    }
    if (!data.questions.some((q) => q.type === "choice")) {
      errors.push("Add at least one multiple-choice question before publishing.");
    }
    data.questions.forEach((q, i) => {
      if (q.type !== "choice") return;
      q.options.forEach((o, j) => {
        if (!o.profileKey) errors.push(`Question #${i + 1}, option #${j + 1}: choose which result profile it counts towards.`);
      });
    });
  }

  return { data, errors };
}

async function uniqueSlug(conn, base, excludeId = null) {
  let slug = base;
  for (let n = 2; n < 1000; n++) {
    const [rows] = await conn.execute(
      "SELECT id FROM assessments WHERE slug = ? AND (? IS NULL OR id <> ?) LIMIT 1",
      [slug, excludeId, excludeId]
    );
    if (!rows.length) return slug;
    slug = `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
}

/**
 * Create (id = null) or update an assessment with its profiles, questions and options.
 * Existing rows are updated in place (keeps ids stable), new rows inserted,
 * removed rows deleted. Returns the assessment id.
 */
export async function saveAssessment(id, data) {
  return transaction(async (conn) => {
    const slug = await uniqueSlug(conn, data.slug, id);
    const fields = [
      data.title, slug, data.description, data.intro_text, data.image, data.duration,
      data.closing_title, data.closing_text, data.final_reflection, data.is_published ? 1 : 0,
    ];

    let assessmentId = id;
    if (assessmentId) {
      const [res] = await conn.execute(
        `UPDATE assessments SET title=?, slug=?, description=?, intro_text=?, image=?, duration=?,
                closing_title=?, closing_text=?, final_reflection=?, is_published=? WHERE id=?`,
        [...fields, assessmentId]
      );
      if (res.affectedRows === 0) throw Object.assign(new Error("Assessment not found"), { status: 404 });
    } else {
      const [[{ next }]] = await conn.execute("SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM assessments");
      const [res] = await conn.execute(
        `INSERT INTO assessments (title, slug, description, intro_text, image, duration,
                closing_title, closing_text, final_reflection, is_published, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [...fields, next]
      );
      assessmentId = res.insertId;
    }

    /* profiles */
    const [existingProfiles] = await conn.execute("SELECT id FROM assessment_profiles WHERE assessment_id = ?", [assessmentId]);
    const existingProfileIds = new Set(existingProfiles.map((r) => r.id));
    const keptProfileIds = new Set();
    const profileIdByKey = {};

    for (const [i, p] of data.profiles.entries()) {
      const values = [
        p.title, p.short_description, p.image, p.quote, p.core_insight,
        JSON.stringify(p.notices), JSON.stringify(p.pattern_steps), p.reflection, i + 1,
      ];
      if (p.id && existingProfileIds.has(p.id)) {
        await conn.execute(
          `UPDATE assessment_profiles SET title=?, short_description=?, image=?, quote=?, core_insight=?,
                  notices=?, pattern_steps=?, reflection=?, sort_order=? WHERE id=?`,
          [...values, p.id]
        );
        keptProfileIds.add(p.id);
        profileIdByKey[p.key] = p.id;
      } else {
        const [res] = await conn.execute(
          `INSERT INTO assessment_profiles (title, short_description, image, quote, core_insight,
                  notices, pattern_steps, reflection, sort_order, assessment_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [...values, assessmentId]
        );
        keptProfileIds.add(res.insertId);
        profileIdByKey[p.key] = res.insertId;
      }
    }
    for (const oldId of existingProfileIds) {
      if (!keptProfileIds.has(oldId)) await conn.execute("DELETE FROM assessment_profiles WHERE id = ?", [oldId]);
    }

    /* questions + options */
    const [existingQuestions] = await conn.execute("SELECT id FROM assessment_questions WHERE assessment_id = ?", [assessmentId]);
    const existingQuestionIds = new Set(existingQuestions.map((r) => r.id));
    const keptQuestionIds = new Set();

    for (const [i, q] of data.questions.entries()) {
      let questionId;
      if (q.id && existingQuestionIds.has(q.id)) {
        await conn.execute("UPDATE assessment_questions SET question=?, type=?, sort_order=? WHERE id=?", [q.question, q.type, i + 1, q.id]);
        questionId = q.id;
      } else {
        const [res] = await conn.execute(
          "INSERT INTO assessment_questions (assessment_id, question, type, sort_order) VALUES (?, ?, ?, ?)",
          [assessmentId, q.question, q.type, i + 1]
        );
        questionId = res.insertId;
      }
      keptQuestionIds.add(questionId);

      const [existingOptions] = await conn.execute("SELECT id FROM assessment_options WHERE question_id = ?", [questionId]);
      const existingOptionIds = new Set(existingOptions.map((r) => r.id));
      const keptOptionIds = new Set();
      for (const [j, o] of q.options.entries()) {
        const profileId = o.profileKey ? profileIdByKey[o.profileKey] ?? null : null;
        if (o.id && existingOptionIds.has(o.id)) {
          await conn.execute("UPDATE assessment_options SET option_text=?, profile_id=?, sort_order=? WHERE id=?", [o.text, profileId, j + 1, o.id]);
          keptOptionIds.add(o.id);
        } else {
          const [res] = await conn.execute(
            "INSERT INTO assessment_options (question_id, option_text, profile_id, sort_order) VALUES (?, ?, ?, ?)",
            [questionId, o.text, profileId, j + 1]
          );
          keptOptionIds.add(res.insertId);
        }
      }
      for (const oldId of existingOptionIds) {
        if (!keptOptionIds.has(oldId)) await conn.execute("DELETE FROM assessment_options WHERE id = ?", [oldId]);
      }
    }
    for (const oldId of existingQuestionIds) {
      if (!keptQuestionIds.has(oldId)) await conn.execute("DELETE FROM assessment_questions WHERE id = ?", [oldId]);
    }

    return assessmentId;
  });
}

export async function setAssessmentPublished(id, isPublished) {
  if (isPublished) {
    const full = await getAssessmentForAdmin(id);
    if (!full) return { ok: false, status: 404, error: "Assessment not found" };
    const { errors } = normalizeAssessmentInput({
      ...full,
      is_published: true,
      profiles: full.profiles.map((p) => ({ ...p, key: `p${p.id}` })),
      questions: full.questions.map((q) => ({
        ...q,
        options: q.options.map((o) => ({ ...o, profileKey: o.profile_id ? `p${o.profile_id}` : null })),
      })),
    });
    if (errors.length) return { ok: false, status: 400, error: errors[0], errors };
  }
  const res = await query("UPDATE assessments SET is_published = ? WHERE id = ?", [isPublished ? 1 : 0, id]);
  if (res.affectedRows === 0) return { ok: false, status: 404, error: "Assessment not found" };
  return { ok: true };
}

export async function reorderAssessments(ids) {
  await transaction(async (conn) => {
    for (const [i, id] of ids.entries()) {
      await conn.execute("UPDATE assessments SET sort_order = ? WHERE id = ?", [i + 1, id]);
    }
  });
}

export async function deleteAssessment(id) {
  const res = await query("DELETE FROM assessments WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

export async function duplicateAssessment(id) {
  const full = await getAssessmentForAdmin(id);
  if (!full) return null;
  const { data } = normalizeAssessmentInput({
    ...full,
    title: `${full.title} (copy)`,
    slug: `${full.slug}-copy`,
    is_published: false,
    profiles: full.profiles.map((p) => ({ ...p, id: null, key: `p${p.id}` })),
    questions: full.questions.map((q) => ({
      ...q,
      id: null,
      options: q.options.map((o) => ({ ...o, id: null, profileKey: o.profile_id ? `p${o.profile_id}` : null })),
    })),
  });
  return saveAssessment(null, data);
}
