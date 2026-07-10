require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const fs = require("fs");
const path = require("path");
const pool = require("../db/pool");
const { searchPlayer } = require("../services/sportsdb");

const PLAYERS_FILE = path.join(__dirname, "players.json");
const RATE_LIMIT_MS = 3500; // Increased to avoid TheSportsDB burst rate limit

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function upsertPlayer(data) {
  await pool.query(
    `INSERT INTO players (full_name, nationality, flag_colors, current_club, position, photo_url, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, now())
     ON CONFLICT (full_name) DO UPDATE SET
       nationality  = EXCLUDED.nationality,
       flag_colors  = EXCLUDED.flag_colors,
       current_club = EXCLUDED.current_club,
       position     = EXCLUDED.position,
       photo_url    = EXCLUDED.photo_url,
       updated_at   = now()`,
    [data.full_name, data.nationality, data.flag_colors, data.current_club, data.position, data.photo_url]
  );
}

async function main() {
  const names = JSON.parse(fs.readFileSync(PLAYERS_FILE, "utf8"));
  console.log(`Seeding ${names.length} players…`);

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    process.stdout.write(`[${i + 1}/${names.length}] ${name} … `);
    try {
      const data = await searchPlayer(name);
      if (!data) {
        console.log("not found, skipping");
      } else {
        await upsertPlayer(data);
        console.log(`OK (${data.nationality}, ${data.current_club ?? "—"})`);
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
    if (i < names.length - 1) await sleep(RATE_LIMIT_MS);
  }

  await pool.end();
  console.log("Seed complete.");
}

main().catch((err) => { console.error(err); process.exit(1); });
