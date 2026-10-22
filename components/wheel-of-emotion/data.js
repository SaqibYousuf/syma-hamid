import {
  Droplet,
  Eye,
  Flame,
  HandHeart,
  Heart,
  Leaf,
  Mountain,
  Sparkles,
  Sun,
  Users,
  Waves,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Images: replace these sample paths with your own assets             */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

/**
 * feeling(emotionId, label, extra)
 *  extra.noun        "You may be experiencing ___." (otherwise "You may be feeling ___.")
 *  extra.statements  Step 3 "Go deeper" options (otherwise DEFAULT_STATEMENTS)
 *  extra.insight     Step 4 paragraph (otherwise the emotion's insight)
 *  extra.underlying / deeper / coreNeed   Step 5 layers (otherwise the emotion's values)
 */
const feeling = (emotion, label, extra = {}) => ({
  id: `${emotion}-${label.toLowerCase().replace(/\s+/g, "-")}`,
  label,
  ...extra,
});

/** "Go deeper" items + a gentle way out */
const deeper = (...items) => [...items, "I'm not sure yet"];

export const DEFAULT_STATEMENTS = [
  "Something specific triggered this",
  "It has been building for a while",
  "It is connected to someone close to me",
  "It is about how I see myself",
  "I'm not sure yet",
];

/**
 * Wheel order is clockwise starting from the top.
 * Feelings are listed row by row (left, right, left, right...) as they appear on step 2.
 */
export const EMOTIONS = [
  /* 02 JOY ---------------------------------------------------------- */
  {
    id: "joy",
    label: "Joy",
    color: "#D6A54E",
    icon: Sun,
    description: "Something feels meaningful, pleasurable, connected, or deeply satisfying.",
    insight:
      "Joy can reveal what makes you feel connected, alive, valued, and aligned with yourself.",
    underlying: "Gratitude",
    deeper: "Wanting this moment to last",
    coreNeed: "To feel alive and appreciated",
    feelings: [
      feeling("joy", "Content", {
        noun: "contentment",
        statements: deeper("Peace", "Acceptance", "Feeling enough"),
      }),
      feeling("joy", "Happy", { noun: "happiness" }),
      feeling("joy", "Hopeful", { noun: "hope" }),
      feeling("joy", "Grateful", {
        noun: "gratitude",
        statements: deeper("Appreciation", "Connection", "Recognising what matters"),
      }),
      feeling("joy", "Excited", {
        noun: "excitement",
        statements: deeper(
          "Possibility",
          "Anticipation",
          "Energy toward something meaningful",
        ),
      }),
      feeling("joy", "Playful", { noun: "playfulness" }),
      feeling("joy", "Proud", { noun: "pride" }),
      feeling("joy", "Fulfilled", {
        noun: "fulfilment",
        statements: deeper(
          "Meaning",
          "Alignment",
          "Feeling that your life reflects what matters to you",
        ),
      }),
    ],
  },

  /* 03 TRUST -------------------------------------------------------- */
  {
    id: "trust",
    label: "Trust",
    color: "#6C7D45",
    icon: Leaf,
    description: "You feel safe enough to soften, connect, rely, or open up.",
    prompt: "Explore what feels closest to your experience:",
    insight:
      "Trust often grows when your nervous system experiences consistency, safety, respect, and emotional reliability.",
    underlying: "Calm",
    deeper: "Hope that others will stay",
    coreNeed: "To feel safe and supported",
    feelings: [
      feeling("trust", "Safe", {
        noun: "safety",
        statements: deeper("Protection", "Predictability", "Ability to relax"),
      }),
      feeling("trust", "Accepted", { noun: "acceptance" }),
      feeling("trust", "Connected", {
        noun: "connection",
        statements: deeper("Belonging", "Mutuality", "Emotional closeness"),
      }),
      feeling("trust", "Supported", { noun: "support" }),
      feeling("trust", "Understood", {
        statements: deeper("Feeling seen", "Feeling heard", "Emotional validation"),
      }),
      feeling("trust", "Secure", { noun: "security" }),
      feeling("trust", "Open", {
        noun: "openness",
        statements: deeper("Vulnerability", "Authenticity", "Willingness to be known"),
      }),
      feeling("trust", "Confident", { noun: "confidence" }),
    ],
  },

  /* 04 FEAR --------------------------------------------------------- */
  {
    id: "fear",
    label: "Fear",
    color: "#4B5D51",
    icon: Mountain,
    description: "Something feels threatening, uncertain, unsafe, or beyond your control.",
    insight:
      "Fear often points toward something you are trying to protect: your safety, identity, relationships, control, or sense of belonging.",
    underlying: "Vulnerability",
    deeper: "Fear of losing control",
    coreNeed: "To feel safe and secure",
    feelings: [
      feeling("fear", "Worried", {
        noun: "worry",
        statements: deeper(
          "Anticipating something going wrong",
          "Replaying possibilities",
          "Seeking certainty",
        ),
      }),
      feeling("fear", "Anxious", { noun: "anxiety" }),
      feeling("fear", "Nervous", { noun: "nervousness" }),
      feeling("fear", "Insecure", {
        noun: "insecurity",
        statements: deeper(
          "Doubting yourself",
          "Comparing yourself",
          "Fear of not being enough",
        ),
      }),
      feeling("fear", "Overwhelmed", { noun: "overwhelm" }),
      feeling("fear", "Vulnerable", {
        noun: "vulnerability",
        statements: deeper(
          "Feeling exposed",
          "Fear of being hurt",
          "Difficulty letting someone in",
        ),
      }),
      feeling("fear", "Threatened", {
        statements: deeper("Loss of safety", "Loss of control", "Fear of consequences"),
      }),
      feeling("fear", "Panicked", { noun: "panic" }),
    ],
  },

  /* 05 SURPRISE ----------------------------------------------------- */
  {
    id: "surprise",
    label: "Surprise",
    color: "#4E7D8B",
    icon: Sparkles,
    description: "Something unexpected interrupts what you thought would happen.",
    insight:
      "Surprise can be an invitation to pause before reacting and discover what this unexpected experience means to you.",
    underlying: "Uncertainty",
    deeper: "Needing to make sense of change",
    coreNeed: "To feel grounded",
    feelings: [
      feeling("surprise", "Startled"),
      feeling("surprise", "Shocked", {
        noun: "shock",
        statements: deeper(
          "“I didn't see this coming.”",
          "Difficulty processing",
          "Emotional interruption",
        ),
      }),
      feeling("surprise", "Amazed", { noun: "amazement" }),
      feeling("surprise", "Confused", {
        noun: "confusion",
        statements: deeper(
          "Conflicting information",
          "Uncertainty",
          "Searching for meaning",
        ),
      }),
      feeling("surprise", "Curious", {
        noun: "curiosity",
        statements: deeper(
          "Wanting to understand",
          "Exploring possibilities",
          "Openness to something new",
        ),
      }),
      feeling("surprise", "Uncertain", { noun: "uncertainty" }),
      feeling("surprise", "Disoriented", {
        noun: "disorientation",
        statements: deeper(
          "Losing your sense of what makes sense",
          "Needing clarity",
          "Re-establishing certainty",
        ),
      }),
      feeling("surprise", "Intrigued"),
    ],
  },

  /* 01 SADNESS ------------------------------------------------------ */
  {
    id: "sadness",
    label: "Sadness",
    color: "#5A6D8B",
    icon: Droplet,
    description: "Something feels lost, painful, or emotionally heavy.",
    insight:
      "Sometimes sadness is carrying a deeper need for connection, reassurance, acceptance, or closure.",
    underlying: "Hurt",
    deeper: "Fear of rejection",
    coreNeed: "To feel valued and accepted",
    feelings: [
      feeling("sadness", "Lonely", {
        noun: "loneliness",
        statements: deeper("Feeling disconnected", "Feeling unseen", "Wanting closeness"),
      }),
      feeling("sadness", "Disappointed", {
        noun: "disappointment",
        statements: [
          "Someone let me down",
          "My expectations weren't met",
          "I feel disappointed in myself",
          "Something I hoped for didn't happen",
          "I'm not sure yet",
        ],
        insight:
          "Sometimes disappointment is connected to an unmet expectation, a need for reassurance, or the loss of something you hoped would happen.",
      }),
      feeling("sadness", "Hurt", {
        noun: "hurt",
        underlying: "Sadness",
        deeper: "Feeling unimportant",
      }),
      feeling("sadness", "Rejected", { noun: "rejection" }),
      feeling("sadness", "Grieving", {
        noun: "grief",
        deeper: "Fear of loss",
        statements: deeper("Loss", "Longing", "Difficulty accepting what has changed"),
      }),
      feeling("sadness", "Discouraged", { noun: "discouragement" }),
      feeling("sadness", "Empty", { noun: "emptiness" }),
      feeling("sadness", "Hopeless", { noun: "hopelessness" }),
    ],
  },

  /* 06 DISGUST ------------------------------------------------------ */
  {
    id: "disgust",
    label: "Disgust",
    color: "#6D4E6A",
    icon: Waves,
    description:
      "Something feels deeply wrong, unpleasant, violating, or incompatible with your boundaries.",
    insight:
      "Disgust can signal a boundary, value, or sense of personal safety that feels threatened or crossed.",
    underlying: "Discomfort",
    deeper: "A personal value being crossed",
    coreNeed: "To feel respected and safe",
    feelings: [
      feeling("disgust", "Uncomfortable", {
        noun: "discomfort",
        statements: deeper(
          "Something doesn't feel right",
          "Internal resistance",
          "Desire for distance",
        ),
      }),
      feeling("disgust", "Repulsed", { noun: "repulsion" }),
      feeling("disgust", "Disapproving", { noun: "disapproval" }),
      feeling("disgust", "Disturbed"),
      feeling("disgust", "Offended", {
        statements: deeper(
          "A value feels crossed",
          "Feeling disrespected",
          "Moral or personal boundary activated",
        ),
      }),
      feeling("disgust", "Violated", {
        statements: deeper("Boundary crossed", "Loss of safety", "Need for protection"),
      }),
      feeling("disgust", "Contemptuous", { noun: "contempt" }),
      feeling("disgust", "Avoidant", {
        noun: "avoidance",
        statements: deeper(
          "Wanting distance",
          "Protecting yourself",
          "Not wanting further exposure",
        ),
      }),
    ],
  },

  /* 07 ANGER -------------------------------------------------------- */
  {
    id: "anger",
    label: "Anger",
    color: "#A3473E",
    icon: Flame,
    description:
      "Something feels unfair, obstructed, disrespectful, or threatening to what matters to you.",
    insight:
      "Anger often protects something important: a need, boundary, value, sense of dignity, or experience of fairness.",
    underlying: "Hurt",
    deeper: "Feeling powerless or unheard",
    coreNeed: "To feel respected and heard",
    feelings: [
      feeling("anger", "Irritated", { noun: "irritation" }),
      feeling("anger", "Frustrated", {
        noun: "frustration",
        statements: deeper(
          "Something is blocking you",
          "Your needs aren't being met",
          "Feeling stuck",
        ),
      }),
      feeling("anger", "Resentful", {
        noun: "resentment",
        statements: deeper(
          "Repeated disappointment",
          "Giving more than receiving",
          "Unexpressed needs",
        ),
      }),
      feeling("anger", "Disrespected"),
      feeling("anger", "Betrayed", {
        noun: "betrayal",
        statements: deeper(
          "Trust was broken",
          "Expectations were violated",
          "Feeling deeply hurt",
        ),
      }),
      feeling("anger", "Furious", { noun: "fury" }),
      feeling("anger", "Powerless", {
        noun: "powerlessness",
        statements: deeper(
          "Lack of control",
          "Feeling unheard",
          "Anger without an obvious outlet",
        ),
      }),
      feeling("anger", "Indignant", { noun: "indignation" }),
    ],
  },

  /* 08 ANTICIPATION ------------------------------------------------- */
  {
    id: "anticipation",
    label: "Anticipation",
    color: "#C0784A",
    icon: Eye,
    description: "Your attention moves toward what might happen next.",
    insight:
      "Anticipation reveals where your attention is going, and what you are hoping for, preparing for, or afraid might happen.",
    underlying: "Hope",
    deeper: "Uncertainty about what comes next",
    coreNeed: "To feel prepared and in control",
    feelings: [
      feeling("anticipation", "Curious", { noun: "curiosity" }),
      feeling("anticipation", "Interested", { noun: "interest" }),
      feeling("anticipation", "Hopeful", {
        noun: "hope",
        statements: deeper(
          "Possibility",
          "Desire for a positive outcome",
          "Willingness to keep moving forward",
        ),
      }),
      feeling("anticipation", "Eager", {
        noun: "eagerness",
        statements: deeper("Motivation", "Readiness", "Desire for progress"),
      }),
      feeling("anticipation", "Excited", { noun: "excitement" }),
      feeling("anticipation", "Expectant", {
        noun: "expectation",
        statements: deeper("Looking ahead", "Forming predictions", "Preparing emotionally"),
      }),
      feeling("anticipation", "Watchful"),
      feeling("anticipation", "Apprehensive", {
        noun: "apprehension",
        statements: deeper(
          "Expecting difficulty",
          "Uncertainty",
          "Preparing for possible threat",
        ),
      }),
    ],
  },
];

export const NEEDS = [
  {
    id: "understanding",
    label: "Understanding",
    icon: Heart,
    coreNeed: "To feel seen and understood",
  },
  {
    id: "connection",
    label: "Connection",
    icon: Users,
    coreNeed: "To feel close to others and not alone",
  },
  {
    id: "acceptance",
    label: "Acceptance",
    icon: HandHeart,
    coreNeed: "To feel valued and accepted",
  },
  {
    id: "clarity",
    label: "Clarity",
    icon: Sun,
    coreNeed: "To make sense of what happened",
  },
  {
    id: "space",
    label: "Space",
    icon: Leaf,
    coreNeed: "To have room to rest and reset",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getEmotion(id) {
  return EMOTIONS.find((e) => e.id === id) ?? null;
}

export function getFeelingDetails(emotion, f) {
  return {
    heading: f.noun
      ? `You may be experiencing ${f.noun}.`
      : `You may be feeling ${f.label.toLowerCase()}.`,
    statements: f.statements ?? DEFAULT_STATEMENTS,
    insight: f.insight ?? emotion.insight,
    underlying: f.underlying ?? emotion.underlying,
    deeper: f.deeper ?? emotion.deeper,
    coreNeed: f.coreNeed ?? emotion.coreNeed,
  };
}
