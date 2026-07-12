export function normalizeAnswer(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    // Turkish dotless ı has no diacritic decomposition, so fold it to "i"
    // — otherwise it'd get stripped as non-ASCII and split the word in two.
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Classic edit distance (insertions/deletions/substitutions).
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const row = [i];
    for (let j = 1; j <= n; j++) {
      row[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1]
        : 1 + Math.min(prev[j - 1], prev[j], row[j - 1]);
    }
    prev = row;
  }
  return prev[n];
}

// How many typo'd characters we forgive, scaled to the answer's length.
// Short strings (e.g. position codes like "GK") get no slack so we don't
// blur the line between genuinely different short answers.
function maxTypoDistance(len) {
  if (len < 4) return 0;
  if (len <= 5) return 1;
  if (len <= 10) return 2;
  return 3;
}

export function isAnswerCorrect(input, answer, strict = false) {
  if (strict) return (input || "").trim() === (answer || "").trim();
  const ni = normalizeAnswer(input);
  const na = normalizeAnswer(answer);
  if (!ni || !na) return false;
  if (ni === na) return true;
  return levenshtein(ni, na) <= maxTypoDistance(na.length);
}
