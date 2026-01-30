/**
 * Task routes - RESTful API endpoints
 */

const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');
const { validateTask, validatePartialTask } = require('../middleware/validateTask');

/**
 * GET /api/tasks - Get all tasks with optional filtering
 */
router.get('/', async (req, res, next) => {
  try {
    const filters = {
      completed: req.query.completed !== undefined 
        ? req.query.completed === 'true' 
        : undefined,
      priority: req.query.priority,
      search: req.query.search,
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder || 'DESC',
    };
    
    const tasks = taskService.getAllTasks(filters);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tasks/stats - Get task statistics
 */
router.get('/stats', async (req, res, next) => {
  try {
    const stats = taskService.getTaskStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tasks/:id - Get a single task
 */
router.get('/:id', async (req, res, next) => {
  try {
    const task = taskService.getTaskById(parseInt(req.params.id));
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/tasks - Create a new task
 */
router.post('/', validateTask, async (req, res, next) => {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/tasks/:id - Update a task
 */
router.put('/:id', validatePartialTask, async (req, res, next) => {
  try {
    const task = taskService.updateTask(parseInt(req.params.id), req.body);
    res.json(task);
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * PATCH /api/tasks/:id/toggle - Toggle task completion
 */
router.patch('/:id/toggle', async (req, res, next) => {
  try {
    const task = taskService.toggleTaskCompletion(parseInt(req.params.id));
    res.json(task);
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * DELETE /api/tasks/:id - Delete a task
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = taskService.deleteTask(parseInt(req.params.id));
    
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
