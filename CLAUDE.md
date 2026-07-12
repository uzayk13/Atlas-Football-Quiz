# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atlas Futbol Oyunu is a football player quiz game. Each round shows a player's photo and first name. The user guesses their nationality, current club, full name, and position (text round), then colors in the player's national flag by hand (flag round). 150 players are loaded from PostgreSQL, shuffled into a queue, and cycled infinitely — when the queue ends it reshuffles and starts again.

## Stack

- **Frontend**: React (Vite) — port 5173
- **Backend**: Node.js + Express — port 3001
- **Database**: PostgreSQL 18 (Postgres.app, port 5432, db: `atlas_futbol`)
- **Player data**: TheSportsDB free API (no key required)
- **Auth**: None

## Commands

### Backend (`/server`)
```bash
npm install          # install dependencies
node index.js        # start Express server
npm run dev          # start with nodemon (auto-restart)
npm run seed         # fetch all 150 players from TheSportsDB and upsert into DB
npm run refresh      # re-fetch current club/position for all players
```

### Frontend (`/client`)
```bash
npm install          # install dependencies (run approve-scripts if prompted)
npm run dev          # start Vite dev server
npm run build        # production build
```

### Database
```bash
# Connect via Postgres.app → double-click atlas_futbol
psql -U uzaykayabali -d atlas_futbol -f server/db/schema.sql   # create tables
```

## Architecture

```
client/                 React (Vite) frontend
  src/
    App.jsx             State machine + player queue logic
    screens/            HomeScreen, FieldsScreen, FlagScreen, ResultsScreen
    components/
      core/             Button, Badge, Card, ProgressBar, LanguageToggle
      quiz/             PlayerCard, ScoreBadge, TextAnswerField,
                        FlagColorCanvas, FlagCrop
    data/players.js     FLAG_GEOMETRY (35 nationalities), buildPlayer(), shuffle()
    i18n/
      translations.js   EN/TR UI strings + NATIONALITY_TR (English→Turkish nationality map)
      LanguageContext.jsx  LanguageProvider, useLanguage() — persists choice to localStorage
    styles/             CSS design tokens (colors, typography, spacing)
    utils/answer.js     normalizeAnswer(), isAnswerCorrect()
  public/
    flags/              35 SVG flag files (gb-eng.svg for England)
    fonts/              Boogaloo-Regular.woff2, Inter-Regular.woff2

server/
  index.js              Express entry point
  routes/game.js        REST endpoints
  db/
    pool.js             pg connection pool
    schema.sql          players table definition
  scripts/
    players.json        150 player names (source of truth for the pool)
    seed.js             fetch from TheSportsDB → upsert all 150 players
    refresh.js          update current_club / position for all players
  services/
    sportsdb.js         TheSportsDB API wrapper (searchPlayer)
```

## Data flow

1. `scripts/seed.js` reads `players.json`, calls `sportsdb.searchPlayer()` for each name, upserts into PostgreSQL. Rate-limited to ~1 request/3.5s.
2. `scripts/refresh.js` re-fetches club/position for all players (run monthly or after transfer windows).
3. `GET /api/players` returns all 150 players with full data to the frontend on startup.
4. Frontend shuffles all players into a queue, cycles through them infinitely (reshuffle on completion).
5. Answer matching is case/accent/punctuation-insensitive (`utils/answer.js`).

## API endpoints

- `GET /api/players` — returns all players: `id, full_name, nationality, flag_colors, current_club, position, photo_url`
- `POST /api/guess` — server-side grading: `{ playerId, answers }` → `{ results, score, correct }`
- `GET /api/player/random` — legacy, returns a single random player

## Players table

```sql
id, full_name (UNIQUE), nationality, flag_colors (TEXT[]),
current_club, position (GK|DF|MF|FW), photo_url, updated_at
```

## Game loop (frontend)

1. App loads → `GET /api/players` → shuffle into queue
2. Fields round: show photo + first name → user types nationality, club, full name, position → submit → show correct/wrong per field
3. Flag round: color the SVG flag by tapping palette swatches onto regions; drag emblems into place → check flag → show score
4. Advance to next player in queue; when queue exhausted → Results screen → "Play Again" reshuffles

## Localization

The UI has an EN/TR language toggle (`LanguageToggle`, fixed top-right, rendered once in `App.jsx` so it's visible on every screen). `LanguageProvider` (`client/src/i18n/LanguageContext.jsx`) holds the current language in state, persisted to `localStorage` (`atlas-lang`), and exposes it via `useLanguage()` as `{ lang, toggleLang, t }` where `t` is the string dictionary for the active language (`client/src/i18n/translations.js`).

Nationality answers are graded against **either** English (the DB value) **or** Turkish, using `NATIONALITY_TR` in `translations.js` — a hand-maintained map from each of the 34 DB nationality strings (e.g. `"France"`) to its Turkish name (`"Fransa"`). This check lives in `FieldsScreen.jsx` (`isFieldCorrect`), independent of which UI language is active. When adding a new player with a nationality not yet in the map, add the Turkish translation to `NATIONALITY_TR` too.

`normalizeAnswer()` (`client/src/utils/answer.js`, mirrored in `server/routes/game.js`) folds Turkish dotless `ı` to `i` before stripping non-ASCII characters — `ı` has no diacritic decomposition, so without this it gets treated as a separator and breaks matching (e.g. "Mısır" vs "misir") for users typing on a non-Turkish keyboard.

## Flag geometry

`client/src/data/players.js` exports `FLAG_GEOMETRY` — SVG region definitions for all 35 nationalities on a 300×200 canvas. `buildPlayer()` maps a DB row's `flag_colors[0]` code to the correct geometry.

## Design system

Based on `Atlas FC Quiz Design System.zip` (in project root). Design tokens are in `client/src/styles/`. Key brand colors: pitch green `#1c7a44` (primary), trophy gold `#e0a812` (accent), navy `#0a1626` (dark surfaces). Fonts: Boogaloo (display/headings), Inter (body).

## Key files

- `server/scripts/players.json` — 150 player names, source of truth for the pool
- `server/services/sportsdb.js` — TheSportsDB API wrapper
- `client/src/data/players.js` — FLAG_GEOMETRY + buildPlayer() + shuffle()
- `client/src/i18n/translations.js` — EN/TR UI strings + NATIONALITY_TR
- `client/src/App.jsx` — queue state machine
- `client/src/screens/FlagScreen.jsx` — flag coloring round
- `client/src/screens/FieldsScreen.jsx` — text answer round

## Emblem chips (FlagCrop)

`FlagColorCanvas` renders draggable emblem chips using `FlagCrop`. Each chip zooms into the real flag SVG at the emblem's location.

`FlagCrop` uses CSS `background-image` + `background-size`/`background-position` — this preserves each flag's native SVG aspect ratio automatically. The formula centers the point `(fx, fy)` in the chip:

```
bgX = (fx * zoom - 0.5) / (zoom - 1) * 100%
bgY = (fy * zoom - 0.5) / (zoom - 1) * 100%
```

Each symbol in `FLAG_GEOMETRY` has a `crop: { fx, fy, zoom }` object. `fx`/`fy` are fractional coordinates of the emblem center in the flag SVG (0–1). `zoom` controls how much the flag is magnified (higher = more zoomed in). Current values per flag:

| Flag | Symbol | fx | fy | zoom |
|------|--------|----|----|------|
| ar | Sun of May | 0.5 | 0.5 | 3.5 |
| ca | Maple leaf | 0.5 | 0.5 | 2.5 |
| cm | Star | 0.5 | 0.49 | 5 |
| ec | Coat of arms | 0.5 | 0.5 | 3 |
| es | Coat of arms | 0.332 | 0.5 | 5 |
| gh | Black star | 0.5 | 0.5 | 4 |
| pt | Coat of arms | 0.4 | 0.5 | 4 |
| rs | Coat of arms | 0.27 | 0.5 | 4 |
| uy | Sun of May | 0.185 | 0.278 | 4 |

## Viewing the database

Use **SQLTools** extension in VS Code (+ driver `mtxr.sqltools-driver-pg`). Connection settings: host `localhost`, port `5432`, database `atlas_futbol`, user `uzaykayabali`, no password. Postgres.app must be running.

## Notes

- 7 players have no photo URL (manually inserted, TheSportsDB missed them): Benjamin White, Gavi, João Pedro, Pedri, Pierre-Emile Højbjerg, Rodri, Theo Hernández. Add photo URLs directly in the DB when available.
- England uses `gb-eng.svg` (St George's Cross), not `gb.svg`.
- TheSportsDB occasionally returns stale club data — run `npm run refresh` after major transfer windows.
- Vite proxies `/api` → `http://localhost:3001` in dev. Both servers must be running.
