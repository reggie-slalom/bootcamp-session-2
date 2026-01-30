/**
 * Date helper functions for the frontend
 */

/**
 * Check if a task is overdue
 * @param {Object} task - Task object
 * @returns {boolean} - True if overdue
 */
export function isTaskOverdue(task) {
  if (!task || !task.dueDate || task.completed) {
    return false;
  }
  
  const dueDate = new Date(task.dueDate);
  const now = new Date();
  
  dueDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  return dueDate < now;
}

/**
 * Format a date for display
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDueDate(date) {
  if (!date) {
    return '';
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date for input field (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDateForInput(date) {
  if (!date) {
    return '';
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return dateObj.toISOString().split('T')[0];
}
