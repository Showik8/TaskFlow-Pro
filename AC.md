# Acceptance Criteria

This document outlines the acceptance criteria for all shipped features in the TaskFlow application.

### User Registration

1. Users can access the registration page from the login screen
2. Users must provide email, password, first name, and last name
3. Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character
4. System validates email format and checks for existing accounts
5. User is redirected to the login page after successful registration

### User Login

1. Users can log in using their email and password
2. System validates credentials against the database
3. Failed login attempts show appropriate error messages
4. Successful login redirects to the dashboard
5. System stores authentication token in local storage

## Task Management

### Task Creation

1. Authenticated users can create new tasks from the dashboard
2. Task creation form includes fields for title, description, due date, priority and status
3. Title field is required with a maximum of 100 characters
4. Description field is optional with a maximum of 1000 characters
5. Due date is optional and must be a future date
6. Priority can be set to low, medium, or high (default: medium)
7. Category is optional and can be selected from existing categories or created new
8. System saves the task and associates it with the current user
9. New task appears in the task list immediately after creation

### Task Viewing

1. Users can view all their tasks on the dashboard
2. Tasks are displayed in a list with key information (title, due date, priority, status)
3. Users can click on a task to view its full details
4. Task detail view shows all task information including description and history of updates

### Task Updating

1. Users can edit any task they created or are assigned to
2. All fields can be updated except for the creation date and creator
3. System validates updated information using the same rules as task creation
4. Task history tracks all changes with timestamps and user information
5. Updated task reflects changes immediately in all views
6. Users receive confirmation after successful updates

### Task Deletion

1. Users can delete tasks they created
2. System prompts for confirmation before deletion
3. Deleted tasks are removed from all views

### Task Status Management

1. Users can change task status between "To Do," "In Progress," and "Completed"
2. Status changes are reflected immediately in the UI
3. System records status change history with timestamps
4. Optional completion notes can be added when marking a task as completed

### Mobile Interface

1. Application is fully functional on mobile devices
2. UI adapts appropriately to different screen sizes
3. Touch interactions work correctly on mobile devices
4. Critical functions are accessible without horizontal scrolling
5. Mobile performance is optimized for speed
6. Offline capabilities work on mobile devices
