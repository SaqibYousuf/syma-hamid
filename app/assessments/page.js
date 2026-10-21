import { connection } from "next/server";
import AssessmentGrid from "@/components/assessments/AssessmentGrid";
import AssessmentHero from "@/components/assessments/AssessmentHero";
import { listPublishedAssessments } from "@/lib/assessments";

export const metadata = {
  title: "Assessments",
  description: "Brief, thoughtful self-reflection assessments to help you gain clarity and understand your patterns.",
};

export default async function AssessmentsPage({ searchParams }) {
  await connection(); // always read fresh data from the database
  const { open } = await searchParams;

  let assessments = [];
  let loadError = false;
  try {
    assessments = await listPublishedAssessments();
  } catch (error) {
    console.error("[assessments] failed to load", error);
    loadError = true;
  }

  return (
    <div>
      <AssessmentHero />
      <AssessmentGrid
        assessments={assessments.map(({ created_at, updated_at, ...a }) => a)}
        loadError={loadError}
        initialOpen={typeof open === "string" ? open : null}
      />
    </div>
  );
}
