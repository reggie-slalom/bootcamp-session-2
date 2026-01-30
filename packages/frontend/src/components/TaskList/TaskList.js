import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

function TaskList({ tasks, loading, error, onToggle, onUpdate, onDelete }) {
  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="spinner" role="status">
          <span className="sr-only">Loading tasks...</span>
        </div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-error">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
