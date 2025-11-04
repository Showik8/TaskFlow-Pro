# TaskFlow - Task Management Application

TaskFlow is a modern task management application built with React, TypeScript, and Vite.

## Setup Guide

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TaskFlow_front.git
   cd TaskFlow_front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_AUTH_TOKEN_KEY=taskflow_auth_token
   ```

## Run Scripts

- **Development server**:
  ```bash
  npm run dev
  ```
  This starts the development server at `http://localhost:5173`.

- **Build for production**:
  ```bash
  npm run build
  ```
  This creates a production-ready build in the `dist` directory.

- **Preview production build**:
  ```bash
  npm run preview
  ```
  This serves the production build locally for preview.

## Test Scripts

- **Run tests**:
  ```bash
  npm run test
  ```

- **Run tests with coverage**:
  ```bash
  npm run test:coverage
  ```

## Demo User Credentials

For testing purposes, you can use the following demo accounts:

- **Admin User**:
  - Email: admin@taskflow.com
  - Password: Admin123!

- **Regular User**:
  - Email: user@taskflow.com
  - Password: User123!

## User Stories

1. **User Authentication**
   - As a user, I can register for a new account
   - As a user, I can log in to my account
   - As a user, I can reset my password

2. **Task Management**
   - As a user, I can create new tasks
   - As a user, I can view all my tasks
   - As a user, I can update task details
   - As a user, I can delete tasks
   - As a user, I can mark tasks as complete

3. **Task Organization**
   - As a user, I can categorize tasks
   - As a user, I can set priorities for tasks
   - As a user, I can set due dates for tasks
   - As a user, I can filter and sort tasks

4. **Collaboration**
   - As a user, I can share tasks with other users
   - As a user, I can assign tasks to team members
   - As a user, I can comment on tasks

5. **Notifications**
   - As a user, I receive notifications for upcoming due dates
   - As a user, I receive notifications for task assignments
   - As a user, I can customize notification preferences
