const { Client } = require('pg');
require('dotenv').config();

async function testDatabaseConnection() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres', 
    password: process.env.DB_PASSWORD,
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully');

    // Check databases
    const res = await client.query("SELECT datname FROM pg_database");
    console.log('Existing databases:', res.rows.map(row => row.datname));

    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testDatabaseConnection();