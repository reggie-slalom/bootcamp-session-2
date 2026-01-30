/**
 * Date helper functions for task management
 */

/**
 * Check if a task is overdue
 * @param {Object} task - Task object with dueDate property
 * @returns {boolean} - True if task is overdue
 */
function isTaskOverdue(task) {
  if (!task || !task.dueDate || task.completed) {
    return false;
  }
  
  const dueDate = new Date(task.dueDate);
  const now = new Date();
  
  // Set both dates to start of day for fair comparison
  dueDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  return dueDate < now;
}

/**
 * Format a date for display
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
function formatDueDate(date) {
  if (!date) {
    return null;
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return null;
  }
  
  return dateObj.toISOString().split('T')[0];
}

/**
 * Parse date string to Date object
 * @param {string} dateString - Date string to parse
 * @returns {Date|null} - Parsed Date object or null
 */
function parseDueDate(dateString) {
  if (!dateString) {
    return null;
  }
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return null;
  }
  
  return date;
}

/**
 * Get current timestamp in ISO format
 * @returns {string} - Current timestamp
 */
function getCurrentTimestamp() {
  return new Date().toISOString();
}

module.exports = {
  isTaskOverdue,
  formatDueDate,
  parseDueDate,
  getCurrentTimestamp,
};
