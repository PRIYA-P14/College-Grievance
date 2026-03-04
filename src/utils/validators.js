import { COLLEGE_EMAIL_DOMAIN, WORD_COUNT_LIMITS } from "./constants.js";

export const isCollegeEmail = (email) => {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return normalized.endsWith(`@${COLLEGE_EMAIL_DOMAIN}`);
};

export const getWordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const isWordCountValid = (text) => {
  const count = getWordCount(text);
  return count >= WORD_COUNT_LIMITS.min && count <= WORD_COUNT_LIMITS.max;
};
