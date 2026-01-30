import React from 'react';
import './TaskFilter.css';

function TaskFilter({ filters, onFilterChange }) {
  const handleFilterChange = (filterType, value) => {
    onFilterChange({ [filterType]: value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      completed: undefined,
      priority: undefined,
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    });
  };

  const hasActiveFilters = 
    filters.completed !== undefined || 
    filters.priority || 
    filters.search ||
    filters.sortBy !== 'createdAt';

  return (
    <div className="task-filter">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">
            Status
          </label>
          <select
            id="status-filter"
            className="form-select filter-select"
            value={filters.completed === undefined ? 'all' : filters.completed ? 'completed' : 'incomplete'}
            onChange={(e) => {
              const value = e.target.value;
              handleFilterChange('completed', 
                value === 'all' ? undefined : value === 'completed'
              );
            }}
          >
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter" className="filter-label">
            Priority
          </label>
          <select
            id="priority-filter"
            className="form-select filter-select"
            value={filters.priority || 'all'}
            onChange={(e) => {
              const value = e.target.value;
              handleFilterChange('priority', value === 'all' ? undefined : value);
            }}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="none">None</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter" className="filter-label">
            Sort By
          </label>
          <select
            id="sort-filter"
            className="form-select filter-select"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="order-filter" className="filter-label">
            Order
          </label>
          <select
            id="order-filter"
            className="form-select filter-select"
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          >
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </div>
      </div>

      <div className="filter-search">
        <input
          type="text"
          className="form-input"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          aria-label="Search tasks"
        />
        {hasActiveFilters && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleClearFilters}
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskFilter;
