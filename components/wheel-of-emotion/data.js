/* ------------------------------------------------------------------ */
/* Wheel of Emotions                                                    */
/* The content (emotions, feelings, needs, default statements) now     */
/* comes from the database — edit it in Admin > Wheel of Emotions.     */
/* Starting content: database/wheel-of-emotions.sql                    */
/* ------------------------------------------------------------------ */

/* Images: replace these sample paths with your own assets */
export const EW_IMAGES = {
  /** Soft misty mountains shown at the bottom of most steps */
  mist: "/images/wheel_of_emotion/mist-mountains.png",
  /** Botanical line drawing in the right panel of step 1 */
  botanical: "/images/wheel_of_emotion/botanical-sprig.png",
  /** Rock / moss texture on the left edge of step 5 */
  rock: "/images/wheel_of_emotion/rock-texture.png",
  /** Small botanical drawing inside the step 5 card */
  botanicalSmall: "/images/wheel_of_emotion/botanical-small.png",
};

/** Used only if the database has no default statements */
export const DEFAULT_STATEMENTS = [
  "Something specific triggered this",
  "It has been building for a while",
  "It is connected to someone close to me",
  "It is about how I see myself",
  "I'm not sure yet",
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getEmotion(emotions, id) {
  return emotions.find((e) => e.id === id) ?? null;
}

/**
 * Text for steps 3–5. A feeling's own values win; otherwise the emotion's values are used.
 */
export function getFeelingDetails(emotion, f, defaultStatements = DEFAULT_STATEMENTS) {
  return {
    heading: f.noun ? `You may be experiencing ${f.noun}.` : `You may be feeling ${f.label.toLowerCase()}.`,
    statements: f.statements?.length ? f.statements : defaultStatements,
    insight: f.insight || emotion.insight,
    underlying: f.underlying || emotion.underlying,
    deeper: f.deeper || emotion.deeper,
    coreNeed: f.coreNeed || emotion.coreNeed,
  };
}
