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
const feeling = (emotion, label, extra = {}) => ({
  id: `${emotion}-${label.toLowerCase().replace(/\s+/g, "-")}`,
  label,
  ...extra,
});

export const DEFAULT_STATEMENTS = [
  "Something specific triggered this",
  "It has been building for a while",
  "It is connected to someone close to me",
  "It is about how I see myself",
  "I'm not sure yet",
];

/** Order is clockwise starting from the top of the wheel */
export const EMOTIONS = [
  {
    id: "joy",
    label: "Joy",
    color: "#D6A54E",
    icon: Sun,
    description: "Something feels light, warm, or good.",
    underlying: "Gratitude",
    deeper: "Wanting this moment to last",
    coreNeed: "To feel alive and appreciated",
    feelings: [
      feeling("joy", "Grateful", { noun: "gratitude" }),
      feeling("joy", "Content", { noun: "contentment" }),
      feeling("joy", "Excited", { noun: "excitement" }),
      feeling("joy", "Proud", { noun: "pride" }),
      feeling("joy", "Hopeful", { noun: "hope" }),
      feeling("joy", "Playful", { noun: "playfulness" }),
      feeling("joy", "Relieved", { noun: "relief" }),
      feeling("joy", "Peaceful", { noun: "peace" }),
    ],
  },
  {
    id: "trust",
    label: "Trust",
    color: "#6C7D45",
    icon: Leaf,
    description: "Something feels steady, safe, or reliable.",
    underlying: "Calm",
    deeper: "Hope that others will stay",
    coreNeed: "To feel safe and supported",
    feelings: [
      feeling("trust", "Safe", { noun: "safety" }),
      feeling("trust", "Supported", { noun: "support" }),
      feeling("trust", "Accepted", { noun: "acceptance" }),
      feeling("trust", "Confident", { noun: "confidence" }),
      feeling("trust", "Connected", { noun: "connection" }),
      feeling("trust", "Respected", { noun: "respect" }),
      feeling("trust", "Secure", { noun: "security" }),
      feeling("trust", "Open", { noun: "openness" }),
    ],
  },
  {
    id: "fear",
    label: "Fear",
    color: "#4B5D51",
    icon: Mountain,
    description: "Something feels uncertain, threatening, or unsafe.",
    underlying: "Vulnerability",
    deeper: "Fear of losing control",
    coreNeed: "To feel safe and secure",
    feelings: [
      feeling("fear", "Anxious", { noun: "anxiety" }),
      feeling("fear", "Worried", { noun: "worry" }),
      feeling("fear", "Overwhelmed", { noun: "overwhelm" }),
      feeling("fear", "Insecure", { noun: "insecurity" }),
      feeling("fear", "Nervous", { noun: "nervousness" }),
      feeling("fear", "Scared", { noun: "fear" }),
      feeling("fear", "Helpless", { noun: "helplessness" }),
      feeling("fear", "Uncertain", { noun: "uncertainty" }),
    ],
  },
  {
    id: "surprise",
    label: "Surprise",
    color: "#4E7D8B",
    icon: Sparkles,
    description: "Something happened that you did not expect.",
    underlying: "Uncertainty",
    deeper: "Needing to make sense of change",
    coreNeed: "To feel grounded",
    feelings: [
      feeling("surprise", "Shocked", { noun: "shock" }),
      feeling("surprise", "Confused", { noun: "confusion" }),
      feeling("surprise", "Amazed", { noun: "amazement" }),
      feeling("surprise", "Startled"),
      feeling("surprise", "Unsettled"),
      feeling("surprise", "Curious", { noun: "curiosity" }),
      feeling("surprise", "Speechless"),
      feeling("surprise", "Moved"),
    ],
  },
  {
    id: "sadness",
    label: "Sadness",
    color: "#5A6D8B",
    icon: Droplet,
    description: "Something feels lost, painful, or emotionally heavy.",
    underlying: "Hurt",
    deeper: "Fear of rejection",
    coreNeed: "To feel valued and accepted",
    feelings: [
      feeling("sadness", "Lonely", { noun: "loneliness" }),
      feeling("sadness", "Hurt", {
        noun: "hurt",
        underlying: "Sadness",
        deeper: "Feeling unimportant",
      }),
      feeling("sadness", "Grieving", { noun: "grief", deeper: "Fear of loss" }),
      feeling("sadness", "Empty", { noun: "emptiness" }),
      feeling("sadness", "Disappointed", {
        noun: "disappointment",
        statements: [
          "Expectations weren't met",
          "Someone let you down",
          "Reality feels different from what you hoped",
          "I feel disappointed in myself",
          "I'm not sure yet",
        ],
        insight:
          "Sometimes disappointment is connected to an unmet expectation, a need for reassurance, or the loss of something you hoped would happen.",
        underlying: "Hurt",
        deeper: "Fear of rejection",
        coreNeed: "To feel valued and accepted",
      }),
      feeling("sadness", "Rejected", { noun: "rejection" }),
      feeling("sadness", "Discouraged", { noun: "discouragement" }),
      feeling("sadness", "Hopeless", { noun: "hopelessness" }),
    ],
  },
  {
    id: "disgust",
    label: "Disgust",
    color: "#6D4E6A",
    icon: Waves,
    description: "Something feels wrong, off, or against your values.",
    underlying: "Discomfort",
    deeper: "A personal value being crossed",
    coreNeed: "To feel respected",
    feelings: [
      feeling("disgust", "Uncomfortable", { noun: "discomfort" }),
      feeling("disgust", "Disapproving", { noun: "disapproval" }),
      feeling("disgust", "Repelled", { noun: "repulsion" }),
      feeling("disgust", "Judgmental", { noun: "judgment" }),
      feeling("disgust", "Embarrassed", { noun: "embarrassment" }),
      feeling("disgust", "Ashamed", { noun: "shame" }),
      feeling("disgust", "Offended", { noun: "offense" }),
      feeling("disgust", "Averse", { noun: "aversion" }),
    ],
  },
  {
    id: "anger",
    label: "Anger",
    color: "#A3473E",
    icon: Flame,
    description: "Something feels unfair, blocked, or crossed a line.",
    underlying: "Hurt",
    deeper: "Feeling powerless or unheard",
    coreNeed: "To feel respected and heard",
    feelings: [
      feeling("anger", "Frustrated", { noun: "frustration" }),
      feeling("anger", "Irritated", { noun: "irritation" }),
      feeling("anger", "Resentful", { noun: "resentment" }),
      feeling("anger", "Betrayed", { noun: "betrayal" }),
      feeling("anger", "Jealous", { noun: "jealousy" }),
      feeling("anger", "Annoyed", { noun: "annoyance" }),
      feeling("anger", "Bitter", { noun: "bitterness" }),
      feeling("anger", "Furious", { noun: "fury" }),
    ],
  },
  {
    id: "anticipation",
    label: "Anticipation",
    color: "#C0784A",
    icon: Eye,
    description: "You are waiting for, or looking toward, something ahead.",
    underlying: "Hope",
    deeper: "Uncertainty about what comes next",
    coreNeed: "To feel prepared and in control",
    feelings: [
      feeling("anticipation", "Eager", { noun: "eagerness" }),
      feeling("anticipation", "Restless", { noun: "restlessness" }),
      feeling("anticipation", "Impatient", { noun: "impatience" }),
      feeling("anticipation", "Expectant", { noun: "expectation" }),
      feeling("anticipation", "Prepared"),
      feeling("anticipation", "Hopeful", { noun: "hope" }),
      feeling("anticipation", "Watchful"),
      feeling("anticipation", "Curious", { noun: "curiosity" }),
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
  const name = (f.noun ?? f.label).toLowerCase();
  return {
    heading: f.noun
      ? `You may be experiencing ${f.noun}.`
      : `You may be feeling ${f.label.toLowerCase()}.`,
    statements: f.statements ?? DEFAULT_STATEMENTS,
    insight:
      f.insight ??
      `Sometimes ${name} is connected to an unmet need, a change you did not choose, or something that matters deeply to you.`,
    underlying: f.underlying ?? emotion.underlying,
    deeper: f.deeper ?? emotion.deeper,
    coreNeed: f.coreNeed ?? emotion.coreNeed,
  };
}
