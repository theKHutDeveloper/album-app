import { getDbConnection } from "./connection.js"

async function viewTable(tableName) {
    const db = await getDbConnection()

    try {
        const rows = await db.all(`SELECT * FROM ${tableName}`)
        console.log(`\n${tableName}:`)
        console.table(rows)
    } catch (err) {
        console.error(`View ${tableName} failed:`, err)
    }
    finally {
        await db.close()
    }
}

await viewTable("albums")
await viewTable("genres")
await viewTable("album_genres")
await viewTable("streaming_sites")
await viewTable("album_streaming_sites")