import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"

let db = null

export async function getDbConnection() {

    if (db) return db   // reuse if already open

    const dbPath = path.resolve("./db/albums.db")
    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })
    
    await db.run("PRAGMA foreign_keys = ON")
    return db
}