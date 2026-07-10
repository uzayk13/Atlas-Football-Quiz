export function normalizeAnswer(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function isAnswerCorrect(input, answer, strict = false) {
  if (strict) return (input || "").trim() === (answer || "").trim();
  return normalizeAnswer(input) === normalizeAnswer(answer);
}
