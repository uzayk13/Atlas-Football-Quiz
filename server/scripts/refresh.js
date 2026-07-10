require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const pool = require("../db/pool");
const { searchPlayer } = require("../services/sportsdb");

const RATE_LIMIT_MS = 6500;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const { rows } = await pool.query("SELECT id, full_name FROM players ORDER BY updated_at ASC");
  console.log(`Refreshing ${rows.length} players…`);

  for (let i = 0; i < rows.length; i++) {
    const { id, full_name } = rows[i];
    process.stdout.write(`[${i + 1}/${rows.length}] ${full_name} … `);
    try {
      const data = await searchPlayer(full_name);
      if (!data) {
        console.log("not found");
      } else {
        await pool.query(
          `UPDATE players SET current_club = $1, position = $2, photo_url = $3, updated_at = now() WHERE id = $4`,
          [data.current_club, data.position, data.photo_url, id]
        );
        console.log(`OK → ${data.current_club ?? "—"}, ${data.position ?? "—"}`);
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
    if (i < rows.length - 1) await sleep(RATE_LIMIT_MS);
  }

  await pool.end();
  console.log("Refresh complete.");
}

main().catch((err) => { console.error(err); process.exit(1); });
