import { getDbConnection } from "../db/connection.js"
import groupAlbums from "../utils/groupAlbums.js"

export async function getAlbums(req, res) {
    try {
        const db = await getDbConnection()

        const { genre, physical, streaming, search } = req.query

        let params = []
        let conditions = []
        let query = `SELECT albums.*, genres.name as genre_name, streaming_sites.name as streaming_sites 
                    FROM albums
                    LEFT JOIN album_genres ON album_genres.album_id = albums.id
                    LEFT JOIN genres ON genres.id = album_genres.genre_id
                    LEFT JOIN album_streaming_sites ON album_streaming_sites.album_id = albums.id
                    LEFT JOIN streaming_sites ON streaming_sites.id = album_streaming_sites.site_id`

        if (genre) {
            conditions.push("genres.name = ?")
            params.push(genre)
        }

        if (physical) { 
            conditions.push("physical = ?") 
            params.push(physical)
        }

        if (streaming) { 
            conditions.push("streaming = ?") 
            params.push(streaming)
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
        const groupedAlbums = groupAlbums(albums)

        res.json(groupedAlbums)

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
