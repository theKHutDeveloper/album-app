export default function groupAlbums(albums) {
    const albumsById = new Map()

    for (const album of albums) {
        const { genre_name, streaming_sites, ...rest } = album
        if (!albumsById.has(album.id)) {
            albumsById.set(album.id, { ...rest, genres: [], streamingSites: [] })
        }
        const existingAlbum = albumsById.get(album.id)
        if (album.genre_name && !existingAlbum.genres.includes(album.genre_name)) {
            existingAlbum.genres.push(album.genre_name)
        }
        if (album.streaming_sites && !existingAlbum.streamingSites.includes(album.streaming_sites)) {
            existingAlbum.streamingSites.push(album.streaming_sites)
        }
    }

    const groupedAlbums = Array.from(albumsById.values())
    return groupedAlbums
}