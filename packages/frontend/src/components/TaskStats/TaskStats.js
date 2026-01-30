import React from 'react';
import { useTaskStats } from '../../hooks/useTaskStats';
import './TaskStats.css';

function TaskStats() {
  const { stats, loading } = useTaskStats();

  if (loading) {
    return null;
  }

  return (
    <div className="task-stats">
      <div className="stat-card">
        <div className="stat-value">{stats.total}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      <div className="stat-card stat-incomplete">
        <div className="stat-value">{stats.incomplete}</div>
        <div className="stat-label">Incomplete</div>
      </div>
      <div className="stat-card stat-completed">
        <div className="stat-value">{stats.completed}</div>
        <div className="stat-label">Completed</div>
      </div>
      {stats.overdue > 0 && (
        <div className="stat-card stat-overdue">
          <div className="stat-value">{stats.overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
      )}
    </div>
  );
}

export default TaskStats;
