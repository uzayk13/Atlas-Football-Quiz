const express = require("express");
const pool = require("../db/pool");

const router = express.Router();

function normalize(s) {
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

function isMatch(input, answer) {
  const ni = normalize(input);
  const na = normalize(answer);
  if (!ni || !na) return false;
  if (ni === na) return true;
  return levenshtein(ni, na) <= maxTypoDistance(na.length);
}

// GET /api/players — returns all players with full data for client-side queue
router.get("/players", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, full_name, nationality, flag_colors, current_club, position, photo_url FROM players ORDER BY full_name"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/player/random — legacy endpoint, kept for reference
router.get("/player/random", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, split_part(full_name, ' ', 1) AS first_name, photo_url FROM players ORDER BY RANDOM() LIMIT 1"
    );
    if (rows.length === 0) return res.status(404).json({ error: "No players in database" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/guess — grades { playerId, answers: { nationality, club, fullName, position } }
router.post("/guess", async (req, res) => {
  const { playerId, answers = {} } = req.body;
  if (!playerId) return res.status(400).json({ error: "playerId required" });

  try {
    const { rows } = await pool.query(
      "SELECT full_name, nationality, current_club, position FROM players WHERE id = $1",
      [playerId]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Player not found" });

    const p = rows[0];
    const results = {
      nationality: isMatch(answers.nationality, p.nationality),
      club:        isMatch(answers.club, p.current_club),
      fullName:    isMatch(answers.fullName, p.full_name),
      position:    isMatch(answers.position, p.position),
    };
    const score = Object.values(results).filter(Boolean).length;

    res.json({
      results,
      score,
      correct: {
        nationality: p.nationality,
        club:        p.current_club,
        fullName:    p.full_name,
        position:    p.position,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
