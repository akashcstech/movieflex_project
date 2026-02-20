const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
} = process.env;

// SSL is required by Aiven MySQL
const sslConfig = {
  rejectUnauthorized: false, // Aiven uses self-signed CA; set to true + ca cert for production hardening
};

let pool;

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
    ssl: sslConfig,
    connectTimeout: 20000,
    multipleStatements: true,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.end();
}

async function createUsersTableIfNotExists() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone VARCHAR(20),
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  const connection = await pool.getConnection();
  try {
    await connection.query(createTableSQL);
  } finally {
    connection.release();
  }
}

async function initDb() {
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_PORT || !DB_NAME) {
    throw new Error('Database environment variables are not properly set');
  }

  await createDatabaseIfNotExists();

  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
    database: DB_NAME,
    ssl: sslConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000,
  });

  await createUsersTableIfNotExists();
  console.log('✅ Database and users table are ready');
}

function getPool() {
  if (!pool) {
    throw new Error('Database pool not initialized. Call initDb() first.');
  }
  return pool;
}

module.exports = { initDb, getPool };
