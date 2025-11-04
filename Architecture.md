# TaskFlow Architecture

This document outlines the architecture of the TaskFlow application, including system diagrams, data models, API endpoints, state management approach, and error handling strategy.

## System Architecture Diagram

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React Frontend │◄────►│   API Gateway   │◄────►│  Backend Server │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                                          │
                                                          │
                                                          ▼
                                               ┌─────────────────────┐
                                               │                     │
                                               │      Database       │
                                               │                     │
                                               └─────────────────────┘
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        React App                            │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │             │  │             │  │                     │  │
│  │    Auth     │  │ Task Module │  │ Project Module.     │  │
│  │   Module    │  │             │  │                     │  │
│  │             │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │             │  │             │                           │
│  │    User     │  │  Dashboard  │                           │
│  │   Module    │  │   Module    │                           │
│  │             │  │             │                           │
│  └─────────────┘  └─────────────┘                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### User Model

```typescript
 interface type Task = {
  _id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  priority?: "Low" | "Medium" | "High";
  projectId: string;
  assignedTo: string[];
  createdAt?: string;
  updatedAt?: string;
};
```

### Task Model

```typescript
interface  Project = {
  _id: string;
  title: string;
  description?: string;
  members?: string[];
  createdAt?: Date;
  tasks?: Task[];
  updatedAt?: Date;
};
```

### Comment Model

```typescript
interface  type User = {
  createdAt: string;
  email: string;
  name: string;
  profileImageUrl: string;
  role: "member";
  updatedAt: string;
  __v: number;
  _id: string;
  token: string;
};

```

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Task Endpoints

- `GET /api/task` - Get all tasks for current user
- `POST /api/task` - Create a new task
- `GET /api/task/{title}` - Get task by Title
- `PUT /api/task/:id` - Update task
- `DELETE /api/task/:id` - Delete task
- `PUT /api/tasks/status` - Update task status

## Project Endpoints

-`GET /api/project` - Get all projects for current user -`POST /api/project/` - Create new project -`POST /api/project/:id` - Remove project
