/**
 * Validation helper functions for task data
 */

const PRIORITY_LEVELS = ['high', 'medium', 'low', 'none'];

/**
 * Validate task title
 * @param {string} title - Task title to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
function validateTitle(title) {
  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Title is required and must be a string' };
  }
  
  const trimmedTitle = title.trim();
  
  if (trimmedTitle.length === 0) {
    return { valid: false, error: 'Title cannot be empty' };
  }
  
  if (trimmedTitle.length > 200) {
    return { valid: false, error: 'Title must be 200 characters or less' };
  }
  
  return { valid: true, error: null };
}

/**
 * Validate task description
 * @param {string} description - Task description to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
function validateDescription(description) {
  if (description === null || description === undefined) {
    return { valid: true, error: null };
  }
  
  if (typeof description !== 'string') {
    return { valid: false, error: 'Description must be a string' };
  }
  
  if (description.length > 1000) {
    return { valid: false, error: 'Description must be 1000 characters or less' };
  }
  
  return { valid: true, error: null };
}

/**
 * Validate due date
 * @param {string} dueDate - Due date to validate (ISO 8601 format)
 * @returns {Object} - { valid: boolean, error: string }
 */
function validateDueDate(dueDate) {
  if (dueDate === null || dueDate === undefined) {
    return { valid: true, error: null };
  }
  
  if (typeof dueDate !== 'string') {
    return { valid: false, error: 'Due date must be a string' };
  }
  
  const date = new Date(dueDate);
  
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format. Use ISO 8601 format.' };
  }
  
  return { valid: true, error: null };
}

/**
 * Validate priority level
 * @param {string} priority - Priority level to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
function validatePriority(priority) {
  if (priority === null || priority === undefined) {
    return { valid: true, error: null };
  }
  
  if (typeof priority !== 'string') {
    return { valid: false, error: 'Priority must be a string' };
  }
  
  if (!PRIORITY_LEVELS.includes(priority)) {
    return { 
      valid: false, 
      error: `Priority must be one of: ${PRIORITY_LEVELS.join(', ')}` 
    };
  }
  
  return { valid: true, error: null };
}

/**
 * Validate complete task data
 * @param {Object} taskData - Task data object
 * @returns {Object} - { valid: boolean, errors: Array }
 */
function validateTaskData(taskData) {
  const errors = [];
  
  const titleResult = validateTitle(taskData.title);
  if (!titleResult.valid) {
    errors.push(titleResult.error);
  }
  
  const descResult = validateDescription(taskData.description);
  if (!descResult.valid) {
    errors.push(descResult.error);
  }
  
  const dateResult = validateDueDate(taskData.dueDate);
  if (!dateResult.valid) {
    errors.push(dateResult.error);
  }
  
  const priorityResult = validatePriority(taskData.priority);
  if (!priorityResult.valid) {
    errors.push(priorityResult.error);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateTitle,
  validateDescription,
  validateDueDate,
  validatePriority,
  validateTaskData,
  PRIORITY_LEVELS,
};
