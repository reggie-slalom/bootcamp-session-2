import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import TaskFilter from './components/TaskFilter/TaskFilter';
import TaskStats from './components/TaskStats/TaskStats';
import Toast from './components/Toast/Toast';
import './App.css';

function App() {
  const {
    tasks,
    loading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    updateFilters,
    refreshTasks,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      setShowForm(false);
      showToast('Task created successfully!', 'success');
    } catch (err) {
      showToast('Failed to create task. Please try again.', 'error');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
      showToast('Task updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to update task. Please try again.', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      showToast('Task deleted successfully!', 'success');
    } catch (err) {
      showToast('Failed to delete task. Please try again.', 'error');
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await toggleComplete(id);
    } catch (err) {
      showToast('Failed to update task. Please try again.', 'error');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 TODO App</h1>
        <p className="app-subtitle">Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        <div className="container">
          <TaskStats />

          <div className="app-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
              aria-label={showForm ? 'Hide task form' : 'Show task form'}
            >
              {showForm ? '✕ Cancel' : '+ Add Task'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={refreshTasks}
              aria-label="Refresh tasks"
            >
              🔄 Refresh
            </button>
          </div>

          {showForm && (
            <div className="form-container">
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          <TaskFilter filters={filters} onFilterChange={updateFilters} />

          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onToggle={handleToggleComplete}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ for Copilot Bootcamp</p>
      </footer>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
