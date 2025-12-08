
/* eslint-disable @typescript-eslint/no-require-imports */
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const requiredKeys = [
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
        'CLERK_SECRET_KEY',
        'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET',
        'DATABASE_URL'
    ];

    const missing = requiredKeys.filter(key => !process.env[key]);
    if (missing.length > 0) {
        console.error('Missing or empty environment variables:', missing.join(', '));
        process.exit(1);
    }

    // Parse URL to get connection params but remove database
    const dbUrl = new URL(process.env.DATABASE_URL);
    const dbName = dbUrl.pathname.substring(1);
    dbUrl.pathname = '';

    // Connect without database selected
    const connection = await mysql.createConnection(dbUrl.toString());

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database ${dbName} created or already exists`);

    await connection.changeUser({ database: dbName });

    console.log('Connected to database');

    await connection.execute(`
    CREATE TABLE IF NOT EXISTS User(
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
    `);

    console.log('User table created');

    await connection.execute(`
    CREATE TABLE IF NOT EXISTS Image(
        id VARCHAR(255) PRIMARY KEY,
        publicId VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        userId VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE
    )
    `);

    console.log('Image table created');

    await connection.end();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
