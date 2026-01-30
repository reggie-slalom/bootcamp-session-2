import React, { useState } from 'react';
import { isTaskOverdue } from '../../utils/dateHelpers';
import { formatDueDate } from '../../utils/dateHelpers';
import './TaskItem.css';

function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const isOverdue = isTaskOverdue(task);
  const priorityClass = `priority-${task.priority}`;

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const handleSave = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  if (isEditing) {
    return (
      <div className="task-item task-item-editing">
        <div className="task-edit-form">
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-input"
              value={editedTask.title}
              onChange={handleChange}
              placeholder="Task title"
              maxLength={200}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              className="form-input form-textarea"
              value={editedTask.description || ''}
              onChange={handleChange}
              placeholder="Description (optional)"
              maxLength={1000}
            />
          </div>
          <div className="form-row">
            <select
              name="priority"
              className="form-select"
              value={editedTask.priority}
              onChange={handleChange}
            >
              <option value="none">No Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              name="dueDate"
              className="form-input"
              value={editedTask.dueDate || ''}
              onChange={handleChange}
            />
          </div>
          <div className="task-edit-actions">
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'task-completed' : ''} ${isOverdue ? 'task-overdue' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={task.completed}
          onChange={handleToggle}
          aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
      </div>
      
      <div className="task-content">
        <h3 className={`task-title ${task.completed ? 'strikethrough' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          {task.priority !== 'none' && (
            <span className={`badge badge-${task.priority}`}>
              {task.priority}
            </span>
          )}
          {task.dueDate && (
            <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
              📅 {formatDueDate(task.dueDate)}
              {isOverdue && ' (Overdue)'}
            </span>
          )}
        </div>
      </div>
      
      <div className="task-actions">
        <button
          className="btn-icon"
          onClick={handleEdit}
          aria-label={`Edit task "${task.title}"`}
          title="Edit task"
        >
          ✏️
        </button>
        <button
          className="btn-icon"
          onClick={handleDelete}
          aria-label={`Delete task "${task.title}"`}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
