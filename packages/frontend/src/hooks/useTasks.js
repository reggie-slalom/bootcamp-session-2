import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import { saveTasks, loadTasks } from '../utils/storage';

/**
 * Custom hook for managing tasks
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    completed: undefined,
    priority: undefined,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });

  // Load tasks from API and localStorage
  const loadTasksData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to load from API first
      const apiTasks = await api.fetchTasks(filters);
      setTasks(apiTasks);
      saveTasks(apiTasks);
    } catch (err) {
      console.error('Failed to load tasks from API:', err);
      
      // Fallback to localStorage
      const cachedTasks = loadTasks();
      if (cachedTasks) {
        setTasks(cachedTasks);
      }
      
      setError('Failed to load tasks. Showing cached data.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTasksData();
  }, [loadTasksData]);

  // Create a new task
  const createTask = async (taskData) => {
    try {
      const newTask = await api.createTask(taskData);
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      return newTask;
    } catch (err) {
      console.error('Failed to create task:', err);
      throw err;
    }
  };

  // Update a task
  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await api.updateTask(id, taskData);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      return updatedTask;
    } catch (err) {
      console.error('Failed to update task:', err);
      throw err;
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    } catch (err) {
      console.error('Failed to delete task:', err);
      throw err;
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    try {
      const updatedTask = await api.toggleTaskComplete(id);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      return updatedTask;
    } catch (err) {
      console.error('Failed to toggle task:', err);
      throw err;
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Refresh tasks
  const refreshTasks = () => {
    loadTasksData();
  };

  return {
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
  };
}
