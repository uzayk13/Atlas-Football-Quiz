-- Atlas FC Quiz — database schema
-- Run: psql -U postgres -d atlas_futbol -f server/db/schema.sql

CREATE TABLE IF NOT EXISTS players (
  id            SERIAL PRIMARY KEY,
  full_name     TEXT NOT NULL UNIQUE,
  nationality   TEXT NOT NULL,
  flag_colors   TEXT[],
  current_club  TEXT,
  position      TEXT CHECK (position IN ('GK', 'DF', 'MF', 'FW')),
  photo_url     TEXT,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_players_nationality ON players (nationality);
