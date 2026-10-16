import { MOODS } from "../constants/moods.js";
import { GlobalStyles } from "../constants/styles.js";

export function moodToEmoji(moodValue) {
  return MOODS.find((mood) => mood.value === moodValue)?.emoji;
}

export function moodToColor(moodValue) {
  return MOODS.find((mood) => mood.value === moodValue)?.color ?? "paper100";
}
