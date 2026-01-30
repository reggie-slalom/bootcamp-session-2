/**
 * Local storage utility for persisting tasks
 */

const STORAGE_KEY = 'todo_tasks';

/**
 * Save tasks to local storage
 * @param {Array} tasks - Tasks to save
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}

/**
 * Load tasks from local storage
 * @returns {Array|null} - Saved tasks or null
 */
export function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return null;
  }
}

/**
 * Clear tasks from local storage
 */
export function clearTasks() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear tasks from localStorage:', error);
  }
}
