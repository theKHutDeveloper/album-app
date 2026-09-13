import { getDbConnection } from "../db/connection.js"

export async function getAlbums(req, res) {
    try {
        const db = await getDbConnection()

        let query = "SELECT * FROM albums"
        let params = []

        const { genre } = req.query

        if (genre) {
            query = `
                SELECT albums.* FROM albums
                JOIN album_genres ON album_genres.album_id = albums.id
                JOIN genres ON genres.id = album_genres.genre_id
                WHERE genres.name = ?
            `
            params.push(genre)
        }

        const albums = await db.all(query, params)
        res.json(albums)

    } catch (err) {
        console.error("Error fetching albums:", err)
        res.status(500).json({ error: "Failed to fetch albums", details: err.message })
    }
}

export async function getGenres(req, res) {
    try {
        const db = await getDbConnection()
        const genres = await db.all("SELECT * FROM genres")
        res.json(genres)
    } catch (err) {
        console.error("Error fetching genres:", err)
        res.status(500).json({ error: "Failed to fetch genres", details: err.message })
    }
}

// http://localhost:8000/api/albums?genre=rap
// http://localhost:8000/api/albums
// http://localhost:8000/api/albums/genres
