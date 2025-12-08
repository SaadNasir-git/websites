/* eslint-disable @typescript-eslint/no-require-imports */
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    console.log('Connected to database');

    // Create Folder table
    await connection.execute(`
    CREATE TABLE IF NOT EXISTS Folder (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      userId VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    )
  `);
    console.log('Folder table created');

    // Add folderId to Image table if it doesn't exist
    try {
        await connection.execute(`
      ALTER TABLE Image ADD COLUMN folderId VARCHAR(255) NULL
    `);
        console.log('Added folderId column to Image table');

        await connection.execute(`
      ALTER TABLE Image ADD FOREIGN KEY (folderId) REFERENCES Folder(id) ON DELETE SET NULL
    `);
        console.log('Added foreign key constraint');
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('folderId column already exists');
        } else {
            throw error;
        }
    }

    await connection.end();
}

main().catch(console.error);
