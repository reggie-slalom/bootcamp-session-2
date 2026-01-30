/**
 * Task service - Business logic for task management
 */

const { getDatabase } = require('../db/database');
const { validateTaskData } = require('../utils/validators');
const { getCurrentTimestamp } = require('../utils/dateHelpers');

/**
 * Get all tasks with optional filtering
 * @param {Object} filters - Filter options
 * @returns {Array} - Array of tasks
 */
function getAllTasks(filters = {}) {
  const db = getDatabase();
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];
  
  if (filters.completed !== undefined) {
    query += ' AND completed = ?';
    params.push(filters.completed ? 1 : 0);
  }
  
  if (filters.priority) {
    query += ' AND priority = ?';
    params.push(filters.priority);
  }
  
  if (filters.search) {
    query += ' AND (title LIKE ? OR description LIKE ?)';
    const searchParam = `%${filters.search}%`;
    params.push(searchParam, searchParam);
  }
  
  // Sorting
  const sortBy = filters.sortBy || 'createdAt';
  const sortOrder = filters.sortOrder || 'DESC';
  query += ` ORDER BY ${sortBy} ${sortOrder}`;
  
  const stmt = db.prepare(query);
  const tasks = stmt.all(...params);
  
  // Convert completed from 0/1 to boolean
  return tasks.map(task => ({
    ...task,
    completed: task.completed === 1,
  }));
}

/**
 * Get a single task by ID
 * @param {number} id - Task ID
 * @returns {Object|null} - Task object or null
 */
function getTaskById(id) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
  const task = stmt.get(id);
  
  if (!task) {
    return null;
  }
  
  return {
    ...task,
    completed: task.completed === 1,
  };
}

/**
 * Create a new task
 * @param {Object} taskData - Task data
 * @returns {Object} - Created task
 */
function createTask(taskData) {
  // Validate task data
  const validation = validateTaskData(taskData);
  if (!validation.valid) {
    throw new Error(validation.errors.join(', '));
  }
  
  const db = getDatabase();
  const now = getCurrentTimestamp();
  
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, completed, priority, dueDate, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    taskData.title.trim(),
    taskData.description || null,
    taskData.completed ? 1 : 0,
    taskData.priority || 'none',
    taskData.dueDate || null,
    now,
    now
  );
  
  return getTaskById(result.lastInsertRowid);
}

/**
 * Update an existing task
 * @param {number} id - Task ID
 * @param {Object} taskData - Updated task data
 * @returns {Object} - Updated task
 */
function updateTask(id, taskData) {
  // Check if task exists
  const existingTask = getTaskById(id);
  if (!existingTask) {
    throw new Error('Task not found');
  }
  
  // Validate task data
  const validation = validateTaskData({ ...existingTask, ...taskData });
  if (!validation.valid) {
    throw new Error(validation.errors.join(', '));
  }
  
  const db = getDatabase();
  const now = getCurrentTimestamp();
  
  const updates = [];
  const params = [];
  
  if (taskData.title !== undefined) {
    updates.push('title = ?');
    params.push(taskData.title.trim());
  }
  
  if (taskData.description !== undefined) {
    updates.push('description = ?');
    params.push(taskData.description || null);
  }
  
  if (taskData.completed !== undefined) {
    updates.push('completed = ?');
    params.push(taskData.completed ? 1 : 0);
  }
  
  if (taskData.priority !== undefined) {
    updates.push('priority = ?');
    params.push(taskData.priority);
  }
  
  if (taskData.dueDate !== undefined) {
    updates.push('dueDate = ?');
    params.push(taskData.dueDate || null);
  }
  
  updates.push('updatedAt = ?');
  params.push(now);
  
  params.push(id);
  
  const stmt = db.prepare(`
    UPDATE tasks SET ${updates.join(', ')} WHERE id = ?
  `);
  
  stmt.run(...params);
  
  return getTaskById(id);
}

/**
 * Delete a task
 * @param {number} id - Task ID
 * @returns {boolean} - True if deleted
 */
function deleteTask(id) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  const result = stmt.run(id);
  
  return result.changes > 0;
}

/**
 * Toggle task completion status
 * @param {number} id - Task ID
 * @returns {Object} - Updated task
 */
function toggleTaskCompletion(id) {
  const task = getTaskById(id);
  if (!task) {
    throw new Error('Task not found');
  }
  
  return updateTask(id, { completed: !task.completed });
}

/**
 * Get task statistics
 * @returns {Object} - Task statistics
 */
function getTaskStats() {
  const db = getDatabase();
  
  const totalStmt = db.prepare('SELECT COUNT(*) as count FROM tasks');
  const completedStmt = db.prepare('SELECT COUNT(*) as count FROM tasks WHERE completed = 1');
  const incompleteStmt = db.prepare('SELECT COUNT(*) as count FROM tasks WHERE completed = 0');
  const overdueStmt = db.prepare(`
    SELECT COUNT(*) as count FROM tasks 
    WHERE completed = 0 
    AND dueDate IS NOT NULL 
    AND date(dueDate) < date('now')
  `);
  
  return {
    total: totalStmt.get().count,
    completed: completedStmt.get().count,
    incomplete: incompleteStmt.get().count,
    overdue: overdueStmt.get().count,
  };
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  getTaskStats,
};
