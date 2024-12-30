# setup_database.py
import sqlite3

# Connect to SQLite database (or create if it doesn't exist)
conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Create the users table
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    staff_id TEXT NOT NULL,
    password TEXT NOT NULL
)
''')

conn.commit()
conn.close()

print("Database setup complete.")