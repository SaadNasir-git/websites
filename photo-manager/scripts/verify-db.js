/* eslint-disable @typescript-eslint/no-require-imports */
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const dbUrl = new URL(process.env.DATABASE_URL);
    const dbName = dbUrl.pathname.substring(1);

    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    console.log(`Connected to database: ${dbName}`);

    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables:', tables.map(t => Object.values(t)[0]));

    const [users] = await connection.query('SELECT COUNT(*) as count FROM User');
    console.log('User count:', users[0].count);

    const [images] = await connection.query('SELECT COUNT(*) as count FROM Image');
    console.log('Image count:', images[0].count);

    await connection.end();
}

main().catch(console.error);
