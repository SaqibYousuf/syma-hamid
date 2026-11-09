import React from "react";
import { BookOpen, Brain, Eye, Flower2, Heart, RefreshCw, Sparkle, Sparkles } from "lucide-react";

// Hexagram inside a circle (Inner-Alchemy)
function AlchemyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 3.5 L19.4 16.3 H4.6 Z" />
      <path d="M12 20.5 L4.6 7.7 H19.4 Z" />
    </svg>
  );
}

const ICONS = {
  all: Eye,
  "mind-and-thought": Brain,
  "emotions-and-healing": Heart,
  relationships: Flower2,
  "self-awareness": Sparkle,
  "inner-transformation": Sparkles,
  "cognitive-reframing": RefreshCw,
  "inner-alchemy": AlchemyIcon,
  "book-insights": BookOpen,
};

export default function CategoryIcon({ slug, className = "h-5 w-5" }) {
  const Icon = ICONS[slug] || Sparkle;
  return <Icon className={className} strokeWidth={1.3} aria-hidden="true" />;
}
