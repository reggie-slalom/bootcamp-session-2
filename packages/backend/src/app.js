const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { initializeDatabase } = require('./db/database');
const taskRoutes = require('./routes/tasks');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize database
initializeDatabase();

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TODO API is running' });
});

app.use('/api/tasks', taskRoutes);

// Legacy routes for backward compatibility
app.get('/api/items', (req, res) => {
  res.status(301).json({ 
    message: 'This endpoint has been moved. Please use /api/tasks',
    redirectTo: '/api/tasks' 
  });
});

app.post('/api/items', (req, res) => {
  res.status(301).json({ 
    message: 'This endpoint has been moved. Please use /api/tasks',
    redirectTo: '/api/tasks' 
  });
});

app.delete('/api/items/:id', (req, res) => {
  res.status(301).json({ 
    message: 'This endpoint has been moved. Please use /api/tasks',
    redirectTo: '/api/tasks' 
  });
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
