# Coding Guidelines

## Overview

This document defines the coding standards, style conventions, and quality principles for the TODO app. Following these guidelines ensures code consistency, maintainability, and quality across the entire codebase.

## General Principles

### Code Quality Principles

#### DRY (Don't Repeat Yourself)
- Avoid code duplication by extracting common logic into reusable functions or components
- Create utility functions for repeated operations
- Use component composition to avoid repeating UI patterns
- Extract constants for repeated values

#### KISS (Keep It Simple, Stupid)
- Write straightforward, easy-to-understand code
- Avoid premature optimization
- Choose clarity over cleverness
- Break complex logic into smaller, manageable pieces

#### YAGNI (You Aren't Gonna Need It)
- Don't add functionality until it's actually needed
- Avoid building features for potential future requirements
- Focus on current, concrete requirements
- Refactor when new requirements emerge

#### Single Responsibility Principle
- Each function should do one thing well
- Each component should have a single, clear purpose
- Keep files focused on a specific domain or feature
- Separate concerns (UI, business logic, data access)

## Code Formatting

### JavaScript/JSX Formatting

#### Indentation and Spacing
- Use 2 spaces for indentation (no tabs)
- Add blank lines to separate logical blocks
- One blank line between function declarations
- No trailing whitespace

#### Line Length
- Maximum line length: 100 characters
- Break long lines at logical points
- Use consistent indentation for wrapped lines

#### Semicolons
- Always use semicolons to terminate statements
- Consistent semicolon usage prevents ASI (Automatic Semicolon Insertion) issues

#### Quotes
- Use single quotes for strings: `'hello'`
- Use double quotes in JSX attributes: `<div className="container">`
- Use backticks for template literals: `` `Hello ${name}` ``

#### Braces and Blocks
- Always use braces for control structures, even single-line statements
```javascript
// Good
if (condition) {
  doSomething();
}

// Bad
if (condition) doSomething();
```

#### Whitespace
- Add space after keywords: `if (condition)`, `for (let i = 0)`
- Add space around operators: `a + b`, `x === y`
- No space before function parentheses: `function myFunc()`
- Add space after commas: `[1, 2, 3]`, `{ a: 1, b: 2 }`

### Naming Conventions

#### Variables and Functions
- Use camelCase: `userName`, `fetchUserData`
- Use descriptive, meaningful names
- Boolean variables should start with `is`, `has`, `should`: `isActive`, `hasPermission`
- Event handlers should start with `handle` or `on`: `handleClick`, `onSubmit`

#### Constants
- Use UPPER_SNAKE_CASE for true constants: `MAX_RETRY_COUNT`, `API_BASE_URL`
- Use camelCase for configuration objects that may change

#### Components (React)
- Use PascalCase: `TaskItem`, `TaskList`, `AddTaskForm`
- Component file names match component names: `TaskItem.js`

#### CSS Classes
- Use kebab-case: `task-item`, `button-primary`
- Follow BEM naming for complex components: `task-item__title`, `task-item--completed`

#### Files and Directories
- Use camelCase for utility files: `dateHelper.js`, `taskService.js`
- Use PascalCase for component files: `TaskItem.js`, `TaskForm.js`
- Use kebab-case for directories: `task-components`, `date-utils`

## Code Organization

### Import Organization

Import statements should be organized in the following order:
1. External dependencies (from node_modules)
2. Internal absolute imports (project modules)
3. Relative imports (local files)
4. CSS/styles

Separate each group with a blank line:

```javascript
// External dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Internal modules
import { formatDate } from '../../utils/dateHelper';
import { TaskService } from '../../services/taskService';

// Local components
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

// Styles
import './TaskList.css';
```

### File Structure

#### Frontend Component Files
```javascript
// 1. Imports
import React from 'react';
import './Component.css';

// 2. Constants (if any)
const MAX_ITEMS = 10;

// 3. Helper functions (if component-specific)
const formatData = (data) => { /* ... */ };

// 4. Component definition
const MyComponent = ({ prop1, prop2 }) => {
  // State declarations
  // Effect hooks
  // Event handlers
  // Render logic
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 5. PropTypes
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// 6. Default props (if needed)
MyComponent.defaultProps = {
  prop2: 0,
};

// 7. Export
export default MyComponent;
```

#### Backend Route Files
```javascript
// 1. Imports
const express = require('express');
const router = express.Router();

// 2. Service imports
const taskService = require('../services/taskService');

// 3. Middleware
const validateTask = require('../middleware/validateTask');

// 4. Route definitions
router.get('/tasks', getAllTasks);
router.post('/tasks', validateTask, createTask);

// 5. Route handlers
async function getAllTasks(req, res) {
  // Implementation
}

// 6. Export
module.exports = router;
```

### Directory Structure Conventions
- Keep related files together
- Colocate tests with source files
- Group by feature, not by file type
- Use index.js for clean imports when appropriate

## Linting and Formatting

### ESLint Configuration
- Use ESLint for code quality and style enforcement
- Extend recommended configurations
- Configure rules for React best practices
- Run linter before commits

### Common ESLint Rules
- No unused variables
- No console.log in production code (use proper logging)
- Consistent return statements
- Prefer const over let when variables aren't reassigned
- No var declarations (use let or const)

### Prettier (Optional but Recommended)
- Use Prettier for consistent code formatting
- Configure to match project style guide
- Integrate with editor for format-on-save
- Run before commits

## JavaScript/React Best Practices

### Modern JavaScript (ES6+)

#### Prefer const and let over var
```javascript
// Good
const MAX_COUNT = 100;
let currentCount = 0;

// Bad
var MAX_COUNT = 100;
var currentCount = 0;
```

#### Use Arrow Functions
```javascript
// Good - concise and clear this binding
const double = (x) => x * 2;
const handleClick = () => console.log('clicked');

// Use regular functions for methods that need their own this
```

#### Destructuring
```javascript
// Good - clear and concise
const { name, age } = user;
const [first, second] = items;

// Bad
const name = user.name;
const age = user.age;
```

#### Template Literals
```javascript
// Good
const greeting = `Hello, ${name}!`;

// Bad
const greeting = 'Hello, ' + name + '!';
```

#### Spread Operator
```javascript
// Good - immutable operations
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProp: value };

// Avoid mutations
array.push(newItem); // Only when performance critical
```

### React Best Practices

#### Component Structure
- Prefer functional components with hooks
- Keep components small and focused
- Extract complex logic into custom hooks
- Use composition over inheritance

#### State Management
- Use useState for local component state
- Lift state up when needed by multiple components
- Consider useReducer for complex state logic
- Keep state as local as possible

#### Props
- Destructure props in function parameters
- Use PropTypes for type checking
- Provide default props when appropriate
- Keep prop drilling to a minimum (max 2-3 levels)

#### Event Handlers
```javascript
// Good - defined inside component
const handleSubmit = (event) => {
  event.preventDefault();
  // Handle submission
};

// Good - inline for simple operations
<button onClick={() => setCount(count + 1)}>Increment</button>
```

#### Conditional Rendering
```javascript
// Good - ternary for simple conditions
{isLoading ? <Spinner /> : <Content />}

// Good - && for single condition
{error && <ErrorMessage />}

// Good - early return for complex conditions
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage />;
return <Content />;
```

#### Lists and Keys
```javascript
// Good - unique, stable keys
{tasks.map((task) => (
  <TaskItem key={task.id} task={task} />
))}

// Bad - array index as key
{tasks.map((task, index) => (
  <TaskItem key={index} task={task} />
))}
```

### Node.js/Express Best Practices

#### Error Handling
```javascript
// Good - async/await with try-catch
app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await taskService.getAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});
```

#### Middleware Usage
- Keep middleware focused and composable
- Use middleware for cross-cutting concerns (logging, auth)
- Order middleware appropriately

#### Async Operations
- Always handle promises (use await or .catch())
- Use async/await over raw promises for readability
- Handle errors in async functions

## Comments and Documentation

### When to Comment

#### Do Comment
- Complex algorithms or business logic
- Non-obvious decisions or workarounds
- Public API functions and their parameters
- Regular expressions and complex conditions
- TODOs for future improvements

#### Don't Comment
- Obvious code that explains itself
- What the code does (code should be self-documenting)
- Commented-out code (use version control instead)
- Redundant information

### Comment Style

#### Inline Comments
```javascript
// Good - explains why, not what
// Using setTimeout to debounce API calls and reduce server load
const debouncedSearch = debounce(search, 300);

// Bad - explains obvious what
// Set count to zero
const count = 0;
```

#### JSDoc Comments
```javascript
/**
 * Formats a task object for API submission
 * @param {Object} task - The task object to format
 * @param {string} task.title - The task title
 * @param {Date} task.dueDate - The due date
 * @returns {Object} Formatted task object
 */
function formatTaskForAPI(task) {
  // Implementation
}
```

## Error Handling

### Frontend Error Handling
- Display user-friendly error messages
- Log errors for debugging
- Provide fallback UI for error states
- Handle network failures gracefully

### Backend Error Handling
- Use try-catch for async operations
- Create custom error classes
- Use error middleware
- Return appropriate HTTP status codes
- Log errors with sufficient context

### Error Messages
- Be specific and actionable
- Avoid exposing sensitive information
- Provide helpful guidance to users
- Log technical details separately

## Performance Considerations

### General Performance Tips
- Avoid premature optimization
- Profile before optimizing
- Measure impact of changes
- Keep bundle size reasonable

### React Performance
- Avoid unnecessary re-renders (use React.memo when appropriate)
- Use useCallback and useMemo judiciously
- Lazy load components when beneficial
- Optimize list rendering for large datasets

### Backend Performance
- Use appropriate HTTP status codes
- Implement caching where appropriate
- Optimize database queries
- Handle concurrent requests efficiently

## Security Best Practices

### Frontend Security
- Sanitize user input
- Avoid dangerouslySetInnerHTML
- Validate data on both client and server
- Use HTTPS for API calls

### Backend Security
- Validate and sanitize all input
- Use parameterized queries
- Implement rate limiting
- Handle CORS appropriately
- Keep dependencies updated

## Git and Version Control

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb: "Add", "Fix", "Update", "Remove"
- Keep first line under 50 characters
- Add detailed description if needed

### Branch Naming
- Use descriptive branch names
- Prefix with type: `feature/`, `bugfix/`, `hotfix/`
- Example: `feature/add-task-filtering`

### Code Review Guidelines
- Keep pull requests focused and small
- Write clear PR descriptions
- Respond to feedback constructively
- Test changes before requesting review

## Accessibility (a11y)

### Semantic HTML
- Use appropriate HTML elements
- Add ARIA labels when needed
- Ensure logical heading hierarchy

### Keyboard Navigation
- All interactive elements should be keyboard accessible
- Provide visible focus indicators
- Test with keyboard only

### Screen Readers
- Provide alt text for images
- Use ARIA live regions for dynamic updates
- Test with screen reader tools

## Code Review Checklist

Before submitting code for review, verify:
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] No console.log or debug code
- [ ] Error handling is appropriate
- [ ] Comments explain complex logic
- [ ] Variable names are descriptive
- [ ] No commented-out code
- [ ] Imports are organized
- [ ] Code is DRY (no unnecessary duplication)
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met
- [ ] Security best practices followed

## Tools and IDE Configuration

### Recommended VS Code Extensions
- ESLint
- Prettier
- EditorConfig
- Jest Runner
- GitLens

### Editor Configuration
- Enable format on save
- Configure ESLint integration
- Use consistent line endings (LF)
- Trim trailing whitespace

## Continuous Improvement

### Regular Maintenance
- Review and update guidelines as the project evolves
- Share learnings from code reviews
- Stay updated with JavaScript/React best practices
- Refactor legacy code incrementally

### Learning Resources
- Read official React documentation
- Follow JavaScript/Node.js best practices
- Review MDN Web Docs for web standards
- Participate in code reviews to learn from peers
