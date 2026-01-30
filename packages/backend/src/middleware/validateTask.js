/**
 * Middleware to validate task request data
 */

const { validateTaskData } = require('../utils/validators');

/**
 * Validate task data in request body
 */
function validateTask(req, res, next) {
  const validation = validateTaskData(req.body);
  
  if (!validation.valid) {
    return res.status(400).json({
      error: 'Validation failed',
      details: validation.errors,
    });
  }
  
  next();
}

/**
 * Validate partial task data for updates
 */
function validatePartialTask(req, res, next) {
  // For updates, we allow partial data
  // Only validate the fields that are provided
  const errors = [];
  
  if (req.body.title !== undefined) {
    const { validateTitle } = require('../utils/validators');
    const result = validateTitle(req.body.title);
    if (!result.valid) {
      errors.push(result.error);
    }
  }
  
  if (req.body.description !== undefined) {
    const { validateDescription } = require('../utils/validators');
    const result = validateDescription(req.body.description);
    if (!result.valid) {
      errors.push(result.error);
    }
  }
  
  if (req.body.dueDate !== undefined) {
    const { validateDueDate } = require('../utils/validators');
    const result = validateDueDate(req.body.dueDate);
    if (!result.valid) {
      errors.push(result.error);
    }
  }
  
  if (req.body.priority !== undefined) {
    const { validatePriority } = require('../utils/validators');
    const result = validatePriority(req.body.priority);
    if (!result.valid) {
      errors.push(result.error);
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors,
    });
  }
  
  next();
}

module.exports = {
  validateTask,
  validatePartialTask,
};
