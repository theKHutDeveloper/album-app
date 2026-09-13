CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  physical INTEGER NOT NULL DEFAULT 0, 
  streaming INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  year INTEGER
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS album_genres (
  album_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (album_id, genre_id),
  FOREIGN KEY (album_id) REFERENCES albums(id),
  FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS streaming_sites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS album_streaming_sites (
  album_id INTEGER NOT NULL,
  site_id INTEGER NOT NULL,
  PRIMARY KEY (album_id, site_id),
  FOREIGN KEY (album_id) REFERENCES albums(id),
  FOREIGN KEY (site_id) REFERENCES streaming_sites(id)
);