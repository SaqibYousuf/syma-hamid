import {
  Anchor, Brain, Cloud, CloudRain, Compass, Droplet, Eye, Feather, Flame, Flower2, Frown, Gem, Hand,
  HandHeart, Heart, HeartCrack, Leaf, Meh, Moon, Mountain, Shield, Smile, Snowflake, Sparkles, Sprout,
  Star, Sun, Sunrise, Users, WavesHorizontal, Wind, Zap,
} from "lucide-react";

/** Icon name (stored in the database) → lucide component */
export const WHEEL_ICONS = {
  Anchor, Brain, Cloud, CloudRain, Compass, Droplet, Eye, Feather, Flame, Flower2, Frown, Gem, Hand,
  HandHeart, Heart, HeartCrack, Leaf, Meh, Moon, Mountain, Shield, Smile, Snowflake, Sparkles, Sprout,
  Star, Sun, Sunrise, Users, WavesHorizontal, Wind, Zap,
  Waves: WavesHorizontal, // older name
};

export function getWheelIcon(name) {
  return WHEEL_ICONS[name] || Sparkles;
}
