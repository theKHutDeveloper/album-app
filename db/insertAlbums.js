export async function insertAlbums(db, album) {
    const result = await db.run(
        "INSERT INTO albums (title, artist, physical, streaming, image, year) VALUES (?, ?, ?, ?, ?, ?)",
        album.title, album.artist, album.physical, album.streaming, album.image, album.year
    )
    const albumId = result.lastID

    // genres
    for (const genreName of album.genres) {
        await db.run("INSERT OR IGNORE INTO genres (name) VALUES (?)", genreName)
        const genre = await db.get("SELECT id FROM genres WHERE name = ?", genreName)

        await db.run(
            "INSERT INTO album_genres (album_id, genre_id) VALUES (?, ?)",
            albumId, genre.id
        )
    }

    // streaming sites
    for (const siteName of album.streamingSites) {
        await db.run("INSERT OR IGNORE INTO streaming_sites (name) VALUES (?)", siteName)
        const site = await db.get("SELECT id FROM streaming_sites WHERE name = ?", siteName)
        await db.run(
            "INSERT INTO album_streaming_sites (album_id, site_id) VALUES (?, ?)",
            albumId, site.id
        )
    }
}
