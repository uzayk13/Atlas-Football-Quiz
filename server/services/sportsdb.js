// TheSportsDB free API — covers all top leagues, no key required for basic search
const BASE = "https://www.thesportsdb.com/api/v1/json/3";

const COUNTRY_TO_CODE = {
  Argentina: "ar", Portugal: "pt", France: "fr", Norway: "no", Spain: "es",
  England: "gb-eng", Brazil: "br", Egypt: "eg", Poland: "pl", Belgium: "be",
  "South Korea": "kr", "Korea Republic": "kr", Netherlands: "nl", "The Netherlands": "nl",
  Uruguay: "uy", Morocco: "ma", Georgia: "ge", Sweden: "se", Nigeria: "ng",
  Turkey: "tr", Croatia: "hr", Canada: "ca", Italy: "it", Slovenia: "si",
  Germany: "de", Colombia: "co", Serbia: "rs", USA: "us", "United States": "us",
  Japan: "jp", Ghana: "gh", Cameroon: "cm", Ecuador: "ec", Switzerland: "ch",
  Kosovo: "xk", Hungary: "hu", Denmark: "dk",
};

function mapPosition(str) {
  if (!str) return null;
  const s = str.toLowerCase();
  if (s.includes("goalkeeper") || s === "gk") return "GK";
  if (s.includes("back") || s.includes("defender") || s.includes("centre-back") || s.includes("sweeper")) return "DF";
  if (s.includes("midfield") || s.includes("midfielder")) return "MF";
  if (s.includes("forward") || s.includes("striker") || s.includes("winger") || s.includes("attacker")) return "FW";
  return null;
}

async function apiFetch(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`TheSportsDB ${res.status}: ${path}`);
  return res.json();
}

/**
 * Search for a player by name.
 * Returns { full_name, nationality, flag_colors, current_club, position, photo_url } or null.
 */
async function searchPlayer(name) {
  const data = await apiFetch(`/searchplayers.php?p=${encodeURIComponent(name)}`);
  if (!data.player || data.player.length === 0) return null;

  // Pick the most relevant result — first active soccer player
  const hit =
    data.player.find((p) => p.strSport === "Soccer" && p.strStatus === "Active") ??
    data.player.find((p) => p.strSport === "Soccer") ??
    data.player[0];

  const nationality = hit.strNationality ?? null;

  return {
    full_name:    hit.strPlayer,
    nationality,
    flag_colors:  nationality && COUNTRY_TO_CODE[nationality] ? [COUNTRY_TO_CODE[nationality]] : [],
    current_club: hit.strTeam ?? null,
    position:     mapPosition(hit.strPosition),
    photo_url:    hit.strThumb ?? hit.strCutout ?? null,
  };
}

module.exports = { searchPlayer };
