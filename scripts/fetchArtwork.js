import { albums } from "../data/albums.js"

async function fetchArtwork() {
    for (const album of albums) {
        const term = encodeURIComponent(`${album.artist} ${album.title}`)
        const url = `https://itunes.apple.com/search?term=${term}&entity=album&limit=5`

        try {
            const res = await fetch(url)
            const data = await res.json()

            if (data.results.length > 0) {
                console.log(`${album.title} — ${album.artist}`)
                data.results.forEach((result, i) => {
                    const artwork = result.artworkUrl100.replace("100x100", "600x600")
                    console.log(`  ${i + 1}. ${result.collectionName} — ${result.artistName}`)
                    console.log(`     ${artwork}`)
                })
                console.log("")
            } else {
                console.log(`${album.title} — ${album.artist}: NO RESULT`)
                console.log("")
            }
        } catch (err) {
            console.log(`${album.title} — ${album.artist}: ERROR — ${err.message}`)
        }

        await new Promise(resolve => setTimeout(resolve, 300))  // small delay between requests
    }
}

fetchArtwork()