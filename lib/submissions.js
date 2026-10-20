import "server-only";
import { query, transaction } from "./db";
import { getProfiles, getPublicAssessment } from "./assessments";
import { EMAIL_RE, parseJson, str, toInt } from "./validation";

/**
 * Validate answers, work out the result profile, store everything.
 * Scoring: every chosen option adds one point to its profile; the profile with
 * the most points wins (ties go to the profile listed first in the admin).
 */
export async function submitAssessment(assessmentIdOrSlug, input) {
  const assessment = await getPublicAssessment(assessmentIdOrSlug);
  if (!assessment) return { ok: false, status: 404, error: "This assessment is not available." };
  if (!assessment.questions.length) return { ok: false, status: 400, error: "This assessment has no questions yet." };

  const name = str(input?.name, 191);
  const email = str(input?.email, 191).toLowerCase();
  if (name.length < 2) return { ok: false, status: 400, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, status: 400, error: "Please enter a valid email address." };

  const answersIn = Array.isArray(input?.answers) ? input.answers : [];
  const answerByQuestion = new Map(answersIn.map((a) => [toInt(a?.questionId), a]));

  // Option → profile mapping lives only on the server
  const optionRows = await query(
    `SELECT o.id, o.question_id, o.profile_id
       FROM assessment_options o JOIN assessment_questions q ON q.id = o.question_id
      WHERE q.assessment_id = ?`,
    [assessment.id]
  );
  const optionInfo = new Map(optionRows.map((o) => [o.id, o]));
  const profiles = await getProfiles(assessment.id);
  const profileById = new Map(profiles.map((p) => [p.id, p]));

  const counts = new Map(profiles.map((p) => [p.id, 0]));
  const answers = [];

  for (const [index, q] of assessment.questions.entries()) {
    const given = answerByQuestion.get(q.id);
    if (q.type === "choice") {
      const optionId = toInt(given?.optionId);
      const opt = optionId ? optionInfo.get(optionId) : null;
      if (!opt || opt.question_id !== q.id) {
        return { ok: false, status: 400, error: `Please answer question ${index + 1}.` };
      }
      if (opt.profile_id && counts.has(opt.profile_id)) counts.set(opt.profile_id, counts.get(opt.profile_id) + 1);
      answers.push({
        question_id: q.id,
        option_id: optionId,
        question_text: q.question,
        answer_text: q.options.find((o) => o.id === optionId)?.text ?? "",
        profile_title: opt.profile_id ? profileById.get(opt.profile_id)?.title ?? null : null,
      });
    } else {
      answers.push({
        question_id: q.id,
        option_id: null,
        question_text: q.question,
        answer_text: str(given?.text, 5000) || null,
        profile_title: null,
      });
    }
  }

  let winner = null;
  for (const p of profiles) {
    if (!winner || counts.get(p.id) > counts.get(winner.id)) winner = p;
  }
  const scores = profiles.map((p) => ({ profile_id: p.id, title: p.title, count: counts.get(p.id) }));

  const submissionId = await transaction(async (conn) => {
    const [res] = await conn.execute(
      `INSERT INTO assessment_submissions (assessment_id, assessment_title, name, email, result_profile_id, result_profile_title, scores)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [assessment.id, assessment.title, name, email, winner?.id ?? null, winner?.title ?? null, JSON.stringify(scores)]
    );
    for (const [i, a] of answers.entries()) {
      await conn.execute(
        `INSERT INTO assessment_submission_answers (submission_id, question_id, option_id, question_text, answer_text, profile_title, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [res.insertId, a.question_id, a.option_id, a.question_text, a.answer_text, a.profile_title, i + 1]
      );
    }
    return res.insertId;
  });

  return {
    ok: true,
    submissionId,
    result: winner,
    scores,
    profiles,
    closing: {
      title: assessment.closing_title,
      text: assessment.closing_text,
      reflection: assessment.final_reflection,
    },
  };
}

/* ────────────────────────────── admin ────────────────────────────── */

function buildFilters({ assessmentId, profile, q, from, to }) {
  const where = [];
  const params = [];
  if (assessmentId) {
    where.push("s.assessment_id = ?");
    params.push(assessmentId);
  }
  if (profile) {
    where.push("s.result_profile_title = ?");
    params.push(profile);
  }
  if (q) {
    where.push("(s.name LIKE ? OR s.email LIKE ?)");
    params.push(`%${q}%`, `%${q}%`);
  }
  if (from) {
    where.push("s.created_at >= ?");
    params.push(`${from} 00:00:00`);
  }
  if (to) {
    where.push("s.created_at <= ?");
    params.push(`${to} 23:59:59`);
  }
  return { sql: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

export async function listSubmissions({ page = 1, pageSize = 20, ...filters } = {}) {
  const { sql, params } = buildFilters(filters);
  const size = Math.min(Math.max(toInt(pageSize) || 20, 1), 1000);
  const current = Math.max(toInt(page) || 1, 1);
  const [{ total }] = await query(`SELECT COUNT(*) AS total FROM assessment_submissions s ${sql}`, params);
  // LIMIT values are validated integers, so inlining them is safe
  const rows = await query(
    `SELECT s.id, s.assessment_id, s.assessment_title, s.name, s.email, s.result_profile_title, s.created_at
       FROM assessment_submissions s ${sql}
      ORDER BY s.created_at DESC, s.id DESC
      LIMIT ${size} OFFSET ${(current - 1) * size}`,
    params
  );
  return { rows, total: Number(total), page: current, pageSize: size, pages: Math.max(1, Math.ceil(Number(total) / size)) };
}

export async function getSubmission(id) {
  const rows = await query("SELECT * FROM assessment_submissions WHERE id = ? LIMIT 1", [id]);
  if (!rows.length) return null;
  const answers = await query(
    "SELECT * FROM assessment_submission_answers WHERE submission_id = ? ORDER BY sort_order, id",
    [id]
  );
  return { ...rows[0], scores: parseJson(rows[0].scores, []), answers };
}

export async function deleteSubmission(id) {
  const res = await query("DELETE FROM assessment_submissions WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

/** Rows for CSV export (all matching rows with their answers). */
export async function exportSubmissions(filters = {}) {
  const { sql, params } = buildFilters(filters);
  const rows = await query(
    `SELECT s.* FROM assessment_submissions s ${sql} ORDER BY s.created_at DESC, s.id DESC LIMIT 10000`,
    params
  );
  if (!rows.length) return [];
  const ids = rows.map((r) => r.id);
  const answers = await query(
    `SELECT submission_id, question_text, answer_text FROM assessment_submission_answers
      WHERE submission_id IN (${ids.map(() => "?").join(",")}) ORDER BY sort_order, id`,
    ids
  );
  return rows.map((r) => ({ ...r, answers: answers.filter((a) => a.submission_id === r.id) }));
}

export async function dashboardStats() {
  const [[totals], perAssessment, recent, profileBreakdown] = await Promise.all([
    query(
      `SELECT
         (SELECT COUNT(*) FROM assessments) AS assessments,
         (SELECT COUNT(*) FROM assessments WHERE is_published = 1) AS published,
         (SELECT COUNT(*) FROM assessment_submissions) AS submissions,
         (SELECT COUNT(*) FROM assessment_submissions WHERE created_at >= (UTC_TIMESTAMP() - INTERVAL 7 DAY)) AS last7`
    ),
    query(
      `SELECT a.id, a.title, COUNT(s.id) AS total
         FROM assessments a LEFT JOIN assessment_submissions s ON s.assessment_id = a.id
        GROUP BY a.id, a.title ORDER BY total DESC, a.sort_order ASC`
    ),
    query(
      `SELECT id, name, email, assessment_title, result_profile_title, created_at
         FROM assessment_submissions ORDER BY created_at DESC, id DESC LIMIT 8`
    ),
    query(
      `SELECT result_profile_title AS title, COUNT(*) AS total FROM assessment_submissions
        WHERE result_profile_title IS NOT NULL GROUP BY result_profile_title ORDER BY total DESC LIMIT 8`
    ),
  ]);
  return {
    totals: Object.fromEntries(Object.entries(totals).map(([k, v]) => [k, Number(v)])),
    perAssessment: perAssessment.map((r) => ({ ...r, total: Number(r.total) })),
    recent,
    profileBreakdown: profileBreakdown.map((r) => ({ ...r, total: Number(r.total) })),
  };
}

export async function distinctResultProfiles() {
  const rows = await query(
    "SELECT DISTINCT result_profile_title AS title FROM assessment_submissions WHERE result_profile_title IS NOT NULL ORDER BY title"
  );
  return rows.map((r) => r.title);
}
