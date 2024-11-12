const { Client } = require('pg');
require('dotenv').config();

async function initializeDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres', // Connect to default database
    password: process.env.DB_PASSWORD,
    port: 5432,
  });

  try {
    await client.connect();
    
    // Check if database exists
    const res = await client.query(`
      SELECT 1 FROM pg_catalog.pg_database 
      WHERE datname = 'pill_remainder_db'
    `);

    if (res.rowCount === 0) {
      // Create database if it doesn't exist
      await client.query('CREATE DATABASE pill_remainder_db');
      console.log('Database created successfully');
    } else {
      console.log('Database already exists');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

module.exports = initializeDatabase;