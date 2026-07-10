const express = require("express");
const pool = require("../db/pool");

const router = express.Router();

function normalize(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
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
      nationality: normalize(answers.nationality) === normalize(p.nationality),
      club:        normalize(answers.club)        === normalize(p.current_club),
      fullName:    normalize(answers.fullName)    === normalize(p.full_name),
      position:    normalize(answers.position)    === normalize(p.position),
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
