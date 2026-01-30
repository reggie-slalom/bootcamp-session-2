const request = require('supertest');
const app = require('../src/app');
const { closeDatabase } = require('../src/db/database');

// Close the database connection after all tests
afterAll(() => {
  closeDatabase();
});

// Test helpers
const createTask = async (taskData = {}) => {
  const defaultTask = {
    title: 'Test Task',
    description: 'Test Description',
    priority: 'medium',
    completed: false,
    dueDate: null,
    ...taskData,
  };
  
  const response = await request(app)
    .post('/api/tasks')
    .send(defaultTask)
    .set('Accept', 'application/json');

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('id');
  return response.body;
};

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      await createTask({ title: 'Task 1' });
      await createTask({ title: 'Task 2' });

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);

      const task = response.body[0];
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('completed');
      expect(task).toHaveProperty('priority');
    });

    it('should filter tasks by completion status', async () => {
      await createTask({ title: 'Incomplete Task', completed: false });
      await createTask({ title: 'Complete Task', completed: true });

      const response = await request(app).get('/api/tasks?completed=false');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(task => {
        expect(task.completed).toBe(false);
      });
    });

    it('should filter tasks by priority', async () => {
      await createTask({ title: 'High Priority Task', priority: 'high' });
      await createTask({ title: 'Low Priority Task', priority: 'low' });

      const response = await request(app).get('/api/tasks?priority=high');
      
      expect(response.status).toBe(200);
      response.body.forEach(task => {
        expect(task.priority).toBe('high');
      });
    });
  });

  describe('GET /api/tasks/stats', () => {
    it('should return task statistics', async () => {
      const response = await request(app).get('/api/tasks/stats');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('completed');
      expect(response.body).toHaveProperty('incomplete');
      expect(response.body).toHaveProperty('overdue');
      expect(typeof response.body.total).toBe('number');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a specific task', async () => {
      const createdTask = await createTask({ title: 'Specific Task' });

      const response = await request(app).get(`/api/tasks/${createdTask.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdTask.id);
      expect(response.body.title).toBe('Specific Task');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/999999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Task not found');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task with all fields', async () => {
      const newTask = {
        title: 'New Test Task',
        description: 'This is a test task',
        priority: 'high',
        dueDate: '2026-12-31',
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newTask.title);
      expect(response.body.description).toBe(newTask.description);
      expect(response.body.priority).toBe(newTask.priority);
      expect(response.body.completed).toBe(false);
    });

    it('should create a task with minimal data', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Minimal Task' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Minimal Task');
      expect(response.body.priority).toBe('none');
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ description: 'No title' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if title is too long', async () => {
      const longTitle = 'a'.repeat(201);
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: longTitle })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid priority', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test', priority: 'invalid' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task', async () => {
      const task = await createTask({ title: 'Original Title' });

      const response = await request(app)
        .put(`/api/tasks/${task.id}`)
        .send({ title: 'Updated Title', priority: 'high' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(response.body.priority).toBe('high');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/999999')
        .send({ title: 'Update' });

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/tasks/:id/toggle', () => {
    it('should toggle task completion status', async () => {
      const task = await createTask({ completed: false });

      const response = await request(app)
        .patch(`/api/tasks/${task.id}/toggle`);

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(true);

      const response2 = await request(app)
        .patch(`/api/tasks/${task.id}/toggle`);

      expect(response2.status).toBe(200);
      expect(response2.body.completed).toBe(false);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .patch('/api/tasks/999999/toggle');

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      const task = await createTask({ title: 'Task To Delete' });

      const deleteResponse = await request(app).delete(`/api/tasks/${task.id}`);
      expect(deleteResponse.status).toBe(204);

      const getResponse = await request(app).get(`/api/tasks/${task.id}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 when task does not exist', async () => {
      const response = await request(app).delete('/api/tasks/999999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Task not found');
    });
  });

  describe('Legacy /api/items endpoints', () => {
    it('should redirect GET /api/items to new endpoint', async () => {
      const response = await request(app).get('/api/items');
      expect(response.status).toBe(301);
      expect(response.body.redirectTo).toBe('/api/tasks');
    });

    it('should redirect POST /api/items to new endpoint', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ name: 'Test' });
      expect(response.status).toBe(301);
      expect(response.body.redirectTo).toBe('/api/tasks');
    });

    it('should redirect DELETE /api/items/:id to new endpoint', async () => {
      const response = await request(app).delete('/api/items/1');
      expect(response.status).toBe(301);
      expect(response.body.redirectTo).toBe('/api/tasks');
    });
  });
});
