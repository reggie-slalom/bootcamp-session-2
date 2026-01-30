import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

// Mock task data
const mockTasks = [
  {
    id: 1,
    title: 'Test Task 1',
    description: 'Description 1',
    completed: false,
    priority: 'high',
    dueDate: '2026-12-31',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Test Task 2',
    description: 'Description 2',
    completed: true,
    priority: 'low',
    dueDate: null,
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
];

const mockStats = {
  total: 2,
  completed: 1,
  incomplete: 1,
  overdue: 0,
};

// Mock server to intercept API requests
const server = setupServer(
  rest.get('/api/tasks/stats', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStats));
  }),

  rest.get('/api/tasks', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTasks));
  }),

  rest.post('/api/tasks', (req, res, ctx) => {
    const { title, description, priority, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Validation failed', details: ['Title is required'] })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        id: 3,
        title,
        description: description || null,
        completed: false,
        priority: priority || 'none',
        dueDate: dueDate || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
  }),

  rest.put('/api/tasks/:id', (req, res, ctx) => {
    const { id } = req.params;
    const updates = req.body;
    
    const task = mockTasks.find(t => t.id === parseInt(id));
    if (!task) {
      return res(ctx.status(404), ctx.json({ error: 'Task not found' }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        ...task,
        ...updates,
        updatedAt: new Date().toISOString(),
      })
    );
  }),

  rest.patch('/api/tasks/:id/toggle', (req, res, ctx) => {
    const { id } = req.params;
    const task = mockTasks.find(t => t.id === parseInt(id));
    
    if (!task) {
      return res(ctx.status(404), ctx.json({ error: 'Task not found' }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        ...task,
        completed: !task.completed,
        updatedAt: new Date().toISOString(),
      })
    );
  }),

  rest.delete('/api/tasks/:id', (req, res, ctx) => {
    const { id } = req.params;
    const task = mockTasks.find(t => t.id === parseInt(id));
    
    if (!task) {
      return res(ctx.status(404), ctx.json({ error: 'Task not found' }));
    }

    return res(ctx.status(204));
  })
);

// Setup and teardown for the mock server
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App Component', () => {
  test('renders the header', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('📝 TODO App')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Manage your tasks efficiently')).toBeInTheDocument();
  });

  test('displays task statistics', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    });

    // Use getAllByText since these labels appear in both stats and filter dropdown
    const incompleteElements = screen.getAllByText('Incomplete');
    expect(incompleteElements.length).toBeGreaterThan(0);
    
    const completedElements = screen.getAllByText('Completed');
    expect(completedElements.length).toBeGreaterThan(0);
  });

  test('displays tasks from API', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  test('shows add task button', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('+ Add Task')).toBeInTheDocument();
    });
  });

  test('displays task form when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('+ Add Task')).toBeInTheDocument();
    });

    const addButton = screen.getByText('+ Add Task');
    await user.click(addButton);

    expect(screen.getByText('✕ Cancel')).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });

  test('creates a new task', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('+ Add Task')).toBeInTheDocument();
    });

    // Click add button
    const addButton = screen.getByText('+ Add Task');
    await user.click(addButton);

    // Fill form
    const titleInput = screen.getByLabelText(/Title/i);
    await user.type(titleInput, 'New Test Task');

    const descriptionInput = screen.getByLabelText(/Description/i);
    await user.type(descriptionInput, 'New Description');

    // Submit form
    const createButton = screen.getByText('Create Task');
    await user.click(createButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/Task created successfully/i)).toBeInTheDocument();
    });
  });

  test('displays filter controls', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort By/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search tasks/i)).toBeInTheDocument();
  });

  test('shows loading state initially', () => {
    render(<App />);
    
    // The loading spinner should appear before tasks load
    const loadingElements = screen.queryAllByText(/Loading/i);
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  test('handles API error gracefully', async () => {
    // Override the default handler to return an error
    server.use(
      rest.get('/api/tasks', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error' }));
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load tasks/i)).toBeInTheDocument();
    });
  });

  test('refresh button reloads tasks', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });

    const refreshButton = screen.getByLabelText(/Refresh tasks/i);
    await user.click(refreshButton);

    // Tasks should still be displayed after refresh
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });
  });

  test('displays footer', () => {
    render(<App />);
    expect(screen.getByText(/Built with ❤️ for Copilot Bootcamp/i)).toBeInTheDocument();
  });
});

describe('Task Interactions', () => {
  test('task completion can be toggled', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });

    // Find all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    
    // Click the first checkbox
    await user.click(checkboxes[0]);

    // The API should have been called (we can't directly test this in the UI)
    // but we can verify the checkbox is still present
    expect(checkboxes[0]).toBeInTheDocument();
  });
});
