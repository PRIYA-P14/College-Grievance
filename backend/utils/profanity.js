const banned = ["abuse", "idiot", "stupid", "hate", "damn"]; 

export const hasProfanity = (text) => {
  const content = (text || "").toLowerCase();
  return banned.some((word) => content.includes(word));
};
