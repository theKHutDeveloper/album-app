import path from "path"
import { albums } from "../data/albums.js"
import { getDbConnection } from "./connection.js"
import { insertAlbums } from "./insertAlbums.js"
import { readFile } from "fs/promises"

async function seed() {
    const db = await getDbConnection()

    try {
        // create the database tables
        const schema = await readFile(path.resolve("./db/schema.sql"), "utf-8")
        await db.exec(schema)

        await db.exec("BEGIN")

        // insert the albums into the database
        for (const album of albums) {
            await insertAlbums(db, album)
        }

        console.log("Seeded", albums.length, "albums")
        await db.exec("COMMIT")

    } catch (err) { 
        console.error("Seed failed:", err)
        try {
            await db.exec("ROLLBACK")
        } catch {
            console.warn("no active transaction to roll back")
        }
    }
    finally {
        await db.close()    
    }
}

seed()