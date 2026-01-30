# UI Guidelines

## Overview

This document defines the visual design system and user interface guidelines for the TODO app. All UI components should follow these guidelines to ensure consistency, accessibility, and a polished user experience.

## Design System

### Component Library
- Use native HTML5 elements with custom CSS styling
- Maintain semantic HTML structure
- Ensure all components are keyboard accessible
- Follow progressive enhancement principles

## Color Palette

### Primary Colors
- **Primary Blue**: `#2196F3` - Main interactive elements, buttons, links
- **Primary Blue Dark**: `#1976D2` - Hover states, active states
- **Primary Blue Light**: `#BBDEFB` - Backgrounds, highlights

### Status Colors
- **Success Green**: `#4CAF50` - Completed tasks, success messages
- **Warning Orange**: `#FF9800` - Overdue tasks, warnings
- **Error Red**: `#F44336` - Delete actions, error messages
- **Info Blue**: `#2196F3` - Information, default states

### Priority Colors
- **High Priority**: `#F44336` (Red)
- **Medium Priority**: `#FF9800` (Orange)
- **Low Priority**: `#4CAF50` (Green)
- **No Priority**: `#9E9E9E` (Gray)

### Neutral Colors
- **Background**: `#FAFAFA` - Page background
- **Surface**: `#FFFFFF` - Card backgrounds, input fields
- **Border**: `#E0E0E0` - Dividers, borders
- **Text Primary**: `#212121` - Main text
- **Text Secondary**: `#757575` - Supporting text, labels
- **Text Disabled**: `#BDBDBD` - Disabled text

## Typography

### Font Family
- Primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
- Monospace: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`

### Font Sizes
- **Heading 1**: 32px / 2rem - Page titles
- **Heading 2**: 24px / 1.5rem - Section headers
- **Heading 3**: 20px / 1.25rem - Subsection headers
- **Body**: 16px / 1rem - Default text
- **Small**: 14px / 0.875rem - Supporting text, labels
- **Caption**: 12px / 0.75rem - Timestamps, counters

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasized text
- **Bold**: 700 - Headings, important labels

## Spacing System

Use a consistent 8px spacing scale:
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

## Components

### Buttons

#### Primary Button
- Background: Primary Blue (`#2196F3`)
- Text: White (`#FFFFFF`)
- Padding: 10px 24px
- Border radius: 4px
- Font size: 16px
- Font weight: 500
- Hover: Primary Blue Dark (`#1976D2`)
- Active: Scale 0.98
- Disabled: Gray background, reduced opacity

#### Secondary Button
- Background: Transparent
- Border: 1px solid Primary Blue
- Text: Primary Blue
- Padding: 10px 24px
- Border radius: 4px
- Hover: Light blue background

#### Icon Button
- Size: 40px × 40px
- Border radius: 50%
- Padding: 8px
- Hover: Light gray background

### Input Fields

#### Text Input
- Border: 1px solid `#E0E0E0`
- Border radius: 4px
- Padding: 12px 16px
- Font size: 16px
- Focus: 2px border Primary Blue
- Error: 2px border Error Red

#### Textarea
- Same as text input
- Minimum height: 100px
- Resize: vertical only

#### Select/Dropdown
- Same as text input styling
- Arrow icon on right side
- Options list with hover states

### Cards

#### Task Card
- Background: White
- Border: 1px solid `#E0E0E0`
- Border radius: 8px
- Padding: 16px
- Box shadow: `0 2px 4px rgba(0, 0, 0, 0.1)`
- Hover: Elevated shadow `0 4px 8px rgba(0, 0, 0, 0.15)`

### Checkboxes
- Size: 20px × 20px
- Border: 2px solid `#9E9E9E`
- Border radius: 4px
- Checked: Background Primary Blue, white checkmark
- Focus: Blue outline

### Badges/Labels
- Border radius: 12px
- Padding: 4px 12px
- Font size: 12px
- Font weight: 500
- Use status/priority colors for background

## Layout

### Container
- Max width: 1200px
- Margin: 0 auto
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)

### Grid
- Use CSS Grid or Flexbox
- Gap: 16px between items
- Responsive breakpoints:
  - Mobile: < 768px (single column)
  - Tablet: 768px - 1024px (2 columns)
  - Desktop: > 1024px (3+ columns)

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- Text contrast ratio: Minimum 4.5:1 for normal text
- Large text contrast ratio: Minimum 3:1 (18px+ or 14px+ bold)
- UI component contrast: Minimum 3:1

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators on all focusable elements
- Logical tab order following visual layout
- Shortcuts: Enter to submit, Escape to cancel/close

#### Screen Readers
- Semantic HTML elements (button, nav, main, etc.)
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic updates
- Alt text for all images

#### Focus Management
- Focus indicator: 2px solid outline in Primary Blue
- Focus visible on tab navigation only (not mouse clicks)
- Trap focus in modal dialogs
- Return focus after modal closes

### Forms
- Clear labels for all input fields
- Error messages associated with inputs
- Required fields marked with asterisk and label
- Form validation with clear error messaging

## Interactions

### Hover States
- Interactive elements: Color change or background change
- Transition: 200ms ease-in-out
- Cursor: pointer for clickable elements

### Active States
- Slight scale reduction (0.98)
- Darker shade of element color

### Loading States
- Spinner/loader for async operations
- Skeleton screens for initial page load
- Disabled state for buttons during processing

### Animations
- Duration: 200-300ms for micro-interactions
- Easing: ease-in-out
- Avoid animations that cause motion sickness
- Respect prefers-reduced-motion setting

## Responsive Design

### Breakpoints
- **Mobile**: 0 - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Mobile-First Approach
- Design for mobile first, enhance for larger screens
- Touch targets: Minimum 44px × 44px
- Larger padding on mobile for easier touch
- Stack elements vertically on small screens

### Responsive Patterns
- Task list: Single column on mobile, grid on desktop
- Filters: Collapsible menu on mobile, sidebar on desktop
- Actions: Icon buttons on mobile, labeled buttons on desktop

## Visual Feedback

### Success Messages
- Green background with white text
- Auto-dismiss after 3 seconds
- Positioned at top of screen

### Error Messages
- Red background with white text
- Remain visible until dismissed
- Include actionable guidance

### Confirmation Dialogs
- Modal overlay with centered dialog
- Clear question and action buttons
- Destructive actions require confirmation

## Icons

### Icon System
- Use consistent icon library (e.g., Feather, Heroicons, or Material Icons)
- Size: 20px or 24px
- Color: Match surrounding text or use Primary Blue
- Ensure 1:1 aspect ratio

### Common Icons
- Add: Plus icon
- Delete: Trash/bin icon
- Edit: Pencil icon
- Complete: Checkmark icon
- Calendar: Calendar icon
- Priority: Flag icon
- Search: Magnifying glass icon
- Filter: Funnel icon
- Sort: Arrows icon

## Dark Mode (Future Enhancement)
- Consider dark mode color palette
- Use CSS custom properties for easy theme switching
- Maintain accessibility contrast ratios in dark mode
