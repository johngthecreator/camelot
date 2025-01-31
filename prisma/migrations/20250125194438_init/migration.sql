-- CreateTable
CREATE TABLE IF NOT EXISTS "Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spotify_id" TEXT NOT NULL,
    "song" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "spotify_preview" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "duration_ms" INTEGER NOT NULL,
    "bpm" INTEGER NOT NULL,
    "camelot" TEXT NOT NULL,
    "song_key" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Song_artist_song_idx" ON "Song"("artist", "song");

-- CreateIndex
CREATE INDEX "Song_year_idx" ON "Song"("year");

-- CreateIndex
CREATE INDEX "Song_song_key_idx" ON "Song"("song_key");

-- CreateIndex
CREATE INDEX "Song_camelot_idx" ON "Song"("camelot");
