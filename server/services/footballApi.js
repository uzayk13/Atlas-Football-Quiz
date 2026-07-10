require("dotenv").config();

const API_BASE = "https://v3.football.api-sports.io";
const SEASON = 2024;

async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "x-apisports-key": process.env.FOOTBALL_API_KEY },
  });
  if (!res.ok) throw new Error(`API-Football ${res.status}: ${path}`);
  return res.json();
}

// Normalize country name → two-letter flag code (covers the 35 nationalities in the pool)
const COUNTRY_TO_CODE = {
  Argentina: "ar", Portugal: "pt", France: "fr", Norway: "no", Spain: "es",
  England: "gb-eng", Brazil: "br", Egypt: "eg", Poland: "pl", Belgium: "be",
  "South Korea": "kr", Netherlands: "nl", Uruguay: "uy", Morocco: "ma",
  Georgia: "ge", Sweden: "se", Nigeria: "ng", Turkey: "tr", Croatia: "hr",
  Canada: "ca", Italy: "it", Slovenia: "si", Germany: "de", Colombia: "co",
  Serbia: "rs", USA: "us", Japan: "jp", Ghana: "gh", Cameroon: "cm",
  Ecuador: "ec", Switzerland: "ch", Kosovo: "xk", Hungary: "hu", Denmark: "dk",
};

function mapPosition(apiPos) {
  if (!apiPos) return null;
  if (apiPos === "Goalkeeper") return "GK";
  if (apiPos === "Defender") return "DF";
  if (apiPos === "Midfielder") return "MF";
  if (apiPos === "Attacker") return "FW";
  return null;
}

/**
 * Search for a player by name.
 * Returns { full_name, nationality, flag_colors, current_club, position, photo_url } or null.
 */
async function searchPlayer(name) {
  const data = await apiFetch(`/players?search=${encodeURIComponent(name)}&season=${SEASON}`);
  if (!data.response || data.response.length === 0) return null;

  // Pick the first result with a nationality we recognise
  const hit = data.response.find((r) => COUNTRY_TO_CODE[r.player.nationality]) ?? data.response[0];
  const p = hit.player;
  const stats = hit.statistics?.[0];

  const nationality = p.nationality;
  const flagCode = COUNTRY_TO_CODE[nationality] ?? null;

  return {
    full_name: p.name,
    nationality,
    flag_colors: flagCode ? [flagCode] : [],
    current_club: stats?.team?.name ?? null,
    position: mapPosition(stats?.games?.position),
    photo_url: p.photo ?? null,
  };
}

module.exports = { searchPlayer };
