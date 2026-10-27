import { NextResponse } from "next/server";
import { handle, jsonError, readJson } from "@/lib/api";
import { getPublicAssessment, getProfiles } from "@/lib/assessments";
import { query } from "@/lib/db";
import { toInt } from "@/lib/validation";

/**
 * POST /api/assessments/[id]/calculate
 * Scores answers and returns the result profile without saving anything to the DB.
 */
export const POST = handle(async (request, { params }) => {
  const { id } = await params;
  const body = await readJson(request);
  if (!body) return jsonError("Invalid request.");

  const assessment = await getPublicAssessment(id);
  if (!assessment) return jsonError("This assessment is not available.", 404);
  if (!assessment.questions.length) return jsonError("This assessment has no questions yet.", 400);

  const answersIn = Array.isArray(body?.answers) ? body.answers : [];
  const answerByQuestion = new Map(answersIn.map((a) => [toInt(a?.questionId), a]));

  // Option → profile mapping
  const optionRows = await query(
    `SELECT o.id, o.question_id, o.profile_id
       FROM assessment_options o JOIN assessment_questions q ON q.id = o.question_id
      WHERE q.assessment_id = ?`,
    [assessment.id]
  );
  const optionInfo = new Map(optionRows.map((o) => [o.id, o]));
  const profiles = await getProfiles(assessment.id);

  const counts = new Map(profiles.map((p) => [p.id, 0]));

  for (const [index, q] of assessment.questions.entries()) {
    const given = answerByQuestion.get(q.id);
    if (q.type === "choice") {
      const optionId = toInt(given?.optionId);
      const opt = optionId ? optionInfo.get(optionId) : null;
      if (!opt || opt.question_id !== q.id) {
        return jsonError(`Please answer question ${index + 1}.`, 400);
      }
      if (opt.profile_id && counts.has(opt.profile_id)) {
        counts.set(opt.profile_id, counts.get(opt.profile_id) + 1);
      }
    }
  }

  let winner = null;
  for (const p of profiles) {
    if (!winner || counts.get(p.id) > counts.get(winner.id)) winner = p;
  }

  const scores = profiles.map((p) => ({ profile_id: p.id, title: p.title, count: counts.get(p.id) }));

  return NextResponse.json({
    result: winner,
    scores,
    profiles,
    closing: {
      title: assessment.closing_title,
      text: assessment.closing_text,
      reflection: assessment.final_reflection,
    },
  });
});
