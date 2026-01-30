/**
 * Database schema definition for the TODO application
 */

const TASK_SCHEMA = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL CHECK(length(title) >= 1 AND length(title) <= 200),
    description TEXT CHECK(length(description) <= 1000),
    completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0, 1)),
    priority TEXT NOT NULL DEFAULT 'none' CHECK(priority IN ('high', 'medium', 'low', 'none')),
    dueDate TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
`;

const INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
  CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
  CREATE INDEX IF NOT EXISTS idx_tasks_dueDate ON tasks(dueDate);
  CREATE INDEX IF NOT EXISTS idx_tasks_createdAt ON tasks(createdAt);
`;

module.exports = {
  TASK_SCHEMA,
  INDEXES,
};
