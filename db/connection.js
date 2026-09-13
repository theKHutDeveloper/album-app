import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"

export async function getDbConnection() {

    const dbPath = path.resolve("./db/albums.db")
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })
    
    await db.run("PRAGMA foreign_keys = ON")
    return db
}