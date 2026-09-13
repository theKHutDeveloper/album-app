import { getDbConnection } from "../db/connection.js"

export async function getAlbums(req, res) {
    try {
        const db = await getDbConnection()

        const { genre, physical, streaming, search } = req.query

        let query = "SELECT * FROM albums"
        let params = []
        let conditions = []

        if (genre) {
            query += `
                JOIN album_genres ON album_genres.album_id = albums.id
                JOIN genres ON genres.id = album_genres.genre_id
            `
            conditions.push("genres.name = ?")
            params.push(genre)
        }

        if (physical) { 
            conditions.push("physical = 1") 
        }

        if (streaming) { 
            conditions.push("streaming = 1") 
        }

        if (search) {
            conditions.push("(albums.title LIKE ? OR albums.artist LIKE ?)")
            const searchTerm = `%${search}%`
            params.push(searchTerm, searchTerm)
        } 

        if (conditions.length) {
            query += " WHERE " + conditions.join(" AND ")
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
// http://localhost:8000/api/albums?physical=true
// http://localhost:8000/api/albums?streaming=true
// http://localhost:8000/api/albums?search=kendrick
// http://localhost:8000/api/albums?search=kendrick&streaming=1
