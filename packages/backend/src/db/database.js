/**
 * Database initialization and connection management
 */

const Database = require('better-sqlite3');
const { TASK_SCHEMA, INDEXES } = require('./schema');

let db = null;

/**
 * Initialize the database with schema and indexes
 * @param {string} filename - Database file path or ':memory:' for in-memory DB
 * @returns {Database} - Initialized database instance
 */
function initializeDatabase(filename = ':memory:') {
  if (db) {
    return db;
  }

  db = new Database(filename);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
  
  // Create schema
  db.exec(TASK_SCHEMA);
  db.exec(INDEXES);
  
  console.log('Database initialized successfully');
  
  return db;
}

/**
 * Get the database instance
 * @returns {Database} - Database instance
 */
function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

/**
 * Close the database connection
 */
function closeDatabase() {
  if (db) {
    db.close();
    db = null;
    console.log('Database connection closed');
  }
}

module.exports = {
  initializeDatabase,
  getDatabase,
  closeDatabase,
};
