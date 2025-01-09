import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync(':memory')

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREAMENT,
        username TEXT UNIQUE
        password TEXT
    )
`)

db.exec(`
    CREATE TABLE todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(use_id) REFRENCES users(id)
    )    
`)

export default db