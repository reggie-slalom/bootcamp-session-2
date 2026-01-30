# Testing Guidelines

## Overview

This document defines the testing principles and requirements for the TODO app. All code must meet these testing standards to ensure reliability, maintainability, and quality.

## Testing Principles

### Core Principles
1. **Test Early, Test Often**: Write tests alongside code, not after
2. **Test Coverage**: Aim for meaningful coverage, not just high percentages
3. **Test Maintainability**: Tests should be easy to understand and update
4. **Fast Feedback**: Tests should run quickly to support rapid development
5. **Isolation**: Tests should be independent and not rely on each other
6. **Clarity**: Test names and assertions should clearly describe intent

## Testing Pyramid

Follow a balanced testing approach:
- **50% Unit Tests**: Fast, isolated tests for critical business logic and utilities
- **40% Integration Tests**: Tests of component interactions and API endpoints
- **10% End-to-End Tests**: Full user workflow tests for critical paths

## Test Requirements

### Required for All New Features
- New features SHOULD include appropriate tests before merging
- Bug fixes SHOULD include regression tests when practical
- Refactoring SHOULD maintain existing test coverage
- Breaking changes MUST update affected tests

### Practical Coverage Standards
- Overall test coverage: Target 70% for meaningful code paths
- Critical business logic: 90%+ coverage recommended
- Utility functions and validators: High coverage (80%+)
- UI components: Test user interactions and critical rendering, not implementation details
- Error handling: Test main error scenarios
- Edge cases: Test when they represent realistic user scenarios

## Unit Testing

### What to Test (Priority Order)
1. **Critical business logic** - Validation, calculations, data transformations
2. **Utility functions** - Pure functions that are reused across the app
3. **Complex algorithms** - Sorting, filtering, search logic
4. **Error handling** - Main error scenarios and edge cases

### What NOT to Over-Test
- Simple getters/setters
- Trivial component rendering (test behavior, not structure)
- Third-party library functionality
- Framework boilerplate
- Obvious pass-through functions

### Unit Test Guidelines
- Each test should test one specific behavior
- Use descriptive test names: "should [expected behavior] when [condition]"
- Follow Arrange-Act-Assert (AAA) pattern
- Mock external dependencies
- Test both success and failure cases for critical paths
- Focus on boundary conditions that matter

### Frontend Unit Tests (React)
```javascript
// Example structure
describe('TaskItem Component', () => {
  it('should render task title correctly', () => {
    // Test implementation
  });

  it('should call onComplete when checkbox is clicked', () => {
    // Test implementation
  });

  it('should display overdue warning for past due dates', () => {
    // Test implementation
  });
});
```

### Backend Unit Tests (Node.js/Express)
```javascript
// Example structure
describe('Task Service', () => {
  it('should create a new task with valid data', () => {
    // Test implementation
  });

  it('should throw error when title is missing', () => {
    // Test implementation
  });

  it('should format due date correctly', () => {
    // Test implementation
  });
});
```

## Integration Testing

### What to Test
- API endpoint functionality
- Database operations
- Component interactions
- State management across components
- Form submissions
- Data flow through multiple layers

### Integration Test Guidelines
- Test realistic user scenarios
- Use test databases or in-memory storage
- Clean up test data after each test
- Test error propagation
- Verify side effects (notifications, updates, etc.)

### Frontend Integration Tests
- Test complete user workflows
- Verify component communication
- Test state updates across the application
- Validate form submission and validation

### Backend Integration Tests
- Test API endpoints with real request/response
- Verify middleware functionality
- Test database queries and transactions
- Validate error handling and responses

## End-to-End (E2E) Testing

### What to Test
- Critical user journeys
- Complete workflows from UI to database
- Cross-browser compatibility
- Responsive design functionality
- Accessibility compliance

### E2E Test Guidelines
- Focus on high-value user paths
- Test real user scenarios
- Keep E2E tests minimal but comprehensive
- Use stable selectors (data-testid attributes)
- Handle asynchronous operations properly
- Test across different viewports

### Priority Workflows to Test
1. Create a new task
2. Edit an existing task
3. Mark task as complete/incomplete
4. Delete a task
5. Filter and sort tasks
6. Search functionality

## Test Organization

### File Structure
```
packages/
  frontend/
    src/
      components/
        TaskItem.js
        __tests__/
          TaskItem.test.js
      utils/
        dateHelper.js
        __tests__/
          dateHelper.test.js
  backend/
    src/
      services/
        taskService.js
        __tests__/
          taskService.test.js
      routes/
        tasks.js
        __tests__/
          tasks.test.js
```

### Naming Conventions
- Test files: `[ComponentName].test.js` or `[fileName].test.js`
- Test suites: Use `describe()` blocks for logical grouping
- Test cases: Use `it()` or `test()` with clear descriptions
- Setup/teardown: Use `beforeEach()`, `afterEach()`, `beforeAll()`, `afterAll()`

## Testing Tools and Frameworks

### Frontend
- **Jest**: Primary testing framework
- **React Testing Library**: Component testing
- **MSW (Mock Service Worker)**: API mocking
- **Jest DOM**: Custom DOM matchers

### Backend
- **Jest**: Primary testing framework
- **Supertest**: HTTP assertion library
- **Node Test Mocks**: Mocking utilities

### E2E (Future Enhancement)
- **Playwright** or **Cypress**: E2E testing framework
- **Axe**: Accessibility testing

## Test Data Management

### Test Data Guidelines
- Use factory functions for creating test data
- Keep test data minimal and relevant
- Use realistic but not sensitive data
- Create reusable fixtures for common scenarios
- Clean up test data after tests complete

### Example Test Data Factory
```javascript
const createTestTask = (overrides = {}) => ({
  id: 'test-1',
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
  priority: 'medium',
  dueDate: null,
  createdAt: new Date().toISOString(),
  ...overrides
});
```

## Mocking Guidelines

### When to Mock
- External API calls
- Database operations in unit tests
- Time-dependent functions (Date.now(), setTimeout)
- Browser APIs (localStorage, geolocation)
- Third-party libraries

### When NOT to Mock
- Simple utilities that don't have side effects
- The code you're actually testing
- React Testing Library discourages mocking implementation details

### Mock Best Practices
- Keep mocks simple and focused
- Reset mocks between tests
- Verify mock calls when testing interactions
- Document why something is mocked

## Continuous Integration

### CI/CD Requirements
- All tests must pass before merging
- Tests run automatically on pull requests
- Test failures block deployment
- Coverage reports generated on each run

### Pre-commit Checks
- Run unit tests before commit
- Lint test files
- Verify test file naming conventions

## Accessibility Testing

### Required Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Color contrast requirements
- Focus management
- ARIA attributes

### Tools
- Jest-axe for automated accessibility testing
- Manual testing with screen readers
- Keyboard-only navigation testing

## Performance Testing

### Performance Considerations
- Test rendering performance for large lists
- Verify no memory leaks
- Test load times for critical operations
- Monitor test suite execution time

## Debugging Tests

### Common Issues
- Tests passing locally but failing in CI
- Flaky tests due to timing issues
- Test pollution (tests affecting each other)
- Overly complex mocks

### Debugging Strategies
- Use `test.only()` to isolate failing tests
- Add descriptive console logs
- Use debugger statements
- Check for cleanup issues
- Verify mock reset between tests

## Test Maintenance

### Regular Maintenance Tasks
- Remove obsolete tests when features are removed
- Update tests when requirements change
- Refactor tests to improve clarity
- Review and optimize slow tests
- Update snapshots when intentional changes occur

### Code Review Checklist
- Tests cover new functionality
- Tests are clear and well-named
- No unnecessary mocking
- Tests are independent
- Edge cases are covered
- Tests run quickly
- No skipped or commented tests without explanation

## Anti-Patterns to Avoid

### Don't
- Test implementation details
- Write tests that are tightly coupled to component structure
- Create tests that depend on execution order
- Mock everything
- Write tests just to increase coverage numbers
- Leave failing tests in the codebase
- Skip writing tests for "simple" code

### Do
- Test user-facing behavior
- Write tests that focus on what users experience
- Make tests independent and isolated
- Mock external dependencies only
- Write meaningful tests that catch real bugs
- Fix or remove failing tests immediately
- Test edge cases and error conditions

## Documentation in Tests

### Test Documentation Requirements
- Complex test scenarios should include comments explaining the setup
- Use descriptive variable names in tests
- Group related tests with `describe()` blocks
- Document any non-obvious mocking or setup

### Example
```javascript
describe('Task Due Date Validation', () => {
  // This test verifies that tasks with due dates in the past
  // are correctly identified as overdue
  it('should mark task as overdue when due date is in the past', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const task = createTestTask({ dueDate: yesterday.toISOString() });
    
    expect(isTaskOverdue(task)).toBe(true);
  });
});
```

## Future Enhancements

### Planned Improvements
- Visual regression testing
- Performance benchmarking
- Contract testing for API endpoints
- Mutation testing
- Property-based testing for complex logic
