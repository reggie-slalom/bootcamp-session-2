# Functional Requirements

## Core Task Management

### FR-1: Create Task
- Users can create a new task with a title (required)
- Title must be between 1-200 characters
- Task is automatically assigned a unique identifier
- Task is created with "incomplete" status by default

### FR-2: Edit Task
- Users can edit any task property after creation
- Changes are saved immediately
- Users can modify:
  - Task title
  - Task description
  - Due date
  - Priority level
  - Status

### FR-3: Delete Task
- Users can delete any task
- Deleted tasks are permanently removed
- System prompts for confirmation before deletion

### FR-4: Mark Task Complete/Incomplete
- Users can toggle task completion status
- Completed tasks are visually distinguished from incomplete tasks
- Users can mark a completed task as incomplete

## Task Properties

### FR-5: Task Description
- Users can add an optional detailed description to any task
- Description supports up to 1000 characters
- Description can be edited or removed at any time

### FR-6: Due Date
- Users can assign a due date to any task
- Due dates can be set to any future date
- Tasks without due dates are allowed
- Due dates can be modified or removed

### FR-7: Priority Levels
- Users can assign priority levels to tasks:
  - High
  - Medium
  - Low
  - None (default)
- Priority can be changed at any time

## Task Organization

### FR-8: Sort Tasks
- Users can sort tasks by:
  - Due date (ascending/descending)
  - Priority (high to low, low to high)
  - Creation date (newest/oldest first)
  - Completion status
  - Alphabetically by title
- Default sort order: incomplete tasks first, then by due date

### FR-9: Filter Tasks
- Users can filter tasks by:
  - Completion status (all, complete, incomplete)
  - Priority level
  - Due date range
  - Overdue tasks
- Multiple filters can be applied simultaneously

### FR-10: Search Tasks
- Users can search tasks by title and description
- Search is case-insensitive
- Search returns results in real-time
- Search results respect current filter and sort settings

## Data Persistence

### FR-11: Save Tasks
- All task data is automatically saved
- Changes persist across browser sessions
- Data is stored in browser local storage

### FR-12: Task Counter
- System displays count of:
  - Total tasks
  - Incomplete tasks
  - Completed tasks
  - Overdue tasks

## User Interface

### FR-13: Responsive Design
- Application is fully functional on desktop browsers
- Application is fully functional on mobile browsers
- Layout adapts to different screen sizes

### FR-14: Visual Feedback
- System provides visual confirmation for:
  - Task creation
  - Task updates
  - Task deletion
  - Task completion
- Overdue tasks are visually highlighted
- High priority tasks are visually emphasized

