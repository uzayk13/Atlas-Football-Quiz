# Atlas Futbol Oyunu

A football player quiz game. Each round shows a player's photo and first name — guess their nationality, current club, full name, and position, then color in their national flag by hand. 150 players are loaded from PostgreSQL, shuffled into a queue, and cycled infinitely.

## Stack

| Layer    | Tech                                              |
|----------|----------------------------------------------------|
| Frontend | React (Vite) — `localhost:5173`                    |
| Backend  | Node.js + Express — `localhost:3001`                |
| Database | PostgreSQL 18 (Postgres.app, port 5432, db `atlas_futbol`) |
| Player data | [TheSportsDB](https://www.thesportsdb.com/) free API |
| Auth     | None |

## Prerequisites

- Node.js
- PostgreSQL 18 running locally (e.g. via [Postgres.app](https://postgresapp.com/)) with a database named `atlas_futbol`

## Setup

### 1. Database

Create the `players` table:

```bash
psql -U uzaykayabali -d atlas_futbol -f server/db/schema.sql
```

### 2. Backend

```bash
cd server
npm install
cp .env.example .env   # fill in DATABASE_URL, PORT, etc.
npm run seed            # fetch all 150 players from TheSportsDB and populate the DB
npm run dev              # start the API with auto-restart (or `node index.js`)
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to the backend, so both servers must be running.

## Commands

### Backend (`/server`)
```bash
npm install          # install dependencies
node index.js        # start Express server
npm run dev           # start with nodemon (auto-restart)
npm run seed          # fetch all 150 players from TheSportsDB and upsert into DB
npm run refresh       # re-fetch current club/position for all players
```

### Frontend (`/client`)
```bash
npm install          # install dependencies
npm run dev           # start Vite dev server
npm run build         # production build
npm run preview       # preview the production build
```

### Database
```bash
# Connect via Postgres.app → double-click atlas_futbol
psql -U uzaykayabali -d atlas_futbol -f server/db/schema.sql
```

## Project structure

```
client/                 React (Vite) frontend
  src/
    App.jsx             State machine + player queue logic
    screens/            HomeScreen, FieldsScreen, FlagScreen, ResultsScreen
    components/
      core/              Button, Badge, Card, ProgressBar
      quiz/              PlayerCard, ScoreBadge, TextAnswerField,
                          FlagColorCanvas, FlagCrop
    data/players.js      FLAG_GEOMETRY (35 nationalities), buildPlayer(), shuffle()
    styles/               CSS design tokens (colors, typography, spacing)
    utils/answer.js       normalizeAnswer(), isAnswerCorrect()
  public/
    flags/                35 SVG flag files (e.g. gb-eng.svg for England)
    fonts/                 Boogaloo-Regular.woff2, Inter-Regular.woff2

server/
  index.js               Express entry point
  routes/game.js          REST endpoints
  db/
    pool.js               pg connection pool
    schema.sql             players table definition
  scripts/
    players.json           150 player names (source of truth for the pool)
    seed.js                 fetch from TheSportsDB → upsert all 150 players
    refresh.js              update current_club / position for all players
  services/
    sportsdb.js             TheSportsDB API wrapper (searchPlayer)
```

## Game loop

1. App loads → `GET /api/players` → shuffle into queue.
2. **Fields round**: show photo + first name → user types nationality, club, full name, position → submit → show correct/wrong per field.
3. **Flag round**: color the SVG flag by tapping palette swatches onto regions; drag emblems into place → check flag → show score.
4. Advance to the next player in the queue; when exhausted → Results screen → "Play Again" reshuffles.

## API endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET`  | `/api/players` | Returns all 150 players: `id, full_name, nationality, flag_colors, current_club, position, photo_url` |
| `POST` | `/api/guess` | Server-side grading: `{ playerId, answers }` → `{ results, score, correct }` |
| `GET`  | `/api/player/random` | Legacy — returns a single random player |

## Database schema

```sql
players (
  id            SERIAL PRIMARY KEY,
  full_name     TEXT NOT NULL UNIQUE,
  nationality   TEXT NOT NULL,
  flag_colors   TEXT[],
  current_club  TEXT,
  position      TEXT CHECK (position IN ('GK', 'DF', 'MF', 'FW')),
  photo_url     TEXT,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
)
```

## Design system

Based on `Atlas FC Quiz Design System.zip` (project root). Design tokens live in `client/src/styles/`. Key brand colors: pitch green `#1c7a44` (primary), trophy gold `#e0a812` (accent), navy `#0a1626` (dark surfaces). Fonts: Boogaloo (display/headings), Inter (body).

## Notes

- 7 players have no photo URL (manually inserted, TheSportsDB missed them): Benjamin White, Gavi, João Pedro, Pedri, Pierre-Emile Højbjerg, Rodri, Theo Hernández. Add photo URLs directly in the DB when available.
- England uses `gb-eng.svg` (St George's Cross), not `gb.svg`.
- TheSportsDB occasionally returns stale club data — run `npm run refresh` after major transfer windows.
- Answer matching is case/accent/punctuation-insensitive (`client/src/utils/answer.js`).

See `CLAUDE.md` for more implementation detail (flag emblem crop geometry, etc.).
