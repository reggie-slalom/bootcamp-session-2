/**
 * API service for task management
 */

const API_BASE_URL = '/api/tasks';

/**
 * Fetch all tasks with optional filters
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} - Array of tasks
 */
export async function fetchTasks(filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.completed !== undefined) {
    params.append('completed', filters.completed);
  }
  if (filters.priority) {
    params.append('priority', filters.priority);
  }
  if (filters.search) {
    params.append('search', filters.search);
  }
  if (filters.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  if (filters.sortOrder) {
    params.append('sortOrder', filters.sortOrder);
  }
  
  const url = `${API_BASE_URL}${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  
  return response.json();
}

/**
 * Create a new task
 * @param {Object} taskData - Task data
 * @returns {Promise<Object>} - Created task
 */
export async function createTask(taskData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create task');
  }
  
  return response.json();
}

/**
 * Update a task
 * @param {number} id - Task ID
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} - Updated task
 */
export async function updateTask(id, taskData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update task');
  }
  
  return response.json();
}

/**
 * Delete a task
 * @param {number} id - Task ID
 * @returns {Promise<void>}
 */
export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete task');
  }
}

/**
 * Toggle task completion status
 * @param {number} id - Task ID
 * @returns {Promise<Object>} - Updated task
 */
export async function toggleTaskComplete(id) {
  const response = await fetch(`${API_BASE_URL}/${id}/toggle`, {
    method: 'PATCH',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to toggle task');
  }
  
  return response.json();
}

/**
 * Get task statistics
 * @returns {Promise<Object>} - Task statistics
 */
export async function getTaskStats() {
  const response = await fetch(`${API_BASE_URL}/stats`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch task statistics');
  }
  
  return response.json();
}
