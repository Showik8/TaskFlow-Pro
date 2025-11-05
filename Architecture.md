### TaskFlow Pro Architecture

This document covers diagrams, data models, API endpoints, state management rationale, and error-handling.

## System Diagram (high-level)
```
React (Vite) SPA ── axios ──► REST API (Backend) ──► Database
                         ▲
                         │
                 Interceptors
```

## Component/State Diagram (frontend)
```
App
├─ contexts
│  ├─ UserContext (auth, token, profile)
│  └─ ProjectContext (projects, selected project)
├─ pages
│  ├─ Auth/Login, Auth/SignUp
│  └─ User/UserDashboard
├─ components
│  ├─ ui (DashboardHeader, Input, etc.)
│  └─ dragebleComps (Drag, Column, TaskCard, TaskDialog)
└─ utils
   ├─ axiosInstance (baseURL, auth header, 401 redirect)
   └─ apiPaths (BASE_URL, endpoints)
```

## Data Models (from `src/shared/Types.ts`)
```typescript
export type Task = {
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

export type Project = {
  _id: string;
  title: string;
  description?: string;
  members?: string[];
  createdAt?: Date;
  tasks?: Task[];
  updatedAt?: Date;
};

export type User = {
  createdAt: string;
  email: string;
  name: string;
  profileImageUrl: string;
  role: "admin" | "member";
  updatedAt: string;
  __v: number;
  _id: string;
  token: string;
};
```

## API Endpoints (from `src/utils/apiPaths.ts`)
Base URL: configured in code as `BASE_URL`.

- Auth
  - POST `/api/auth/register`
  - POST `/api/auth/login`
  - GET `/api/auth/profile`

- Project
  - GET `/api/project`
  - POST `/api/project`
  - GET `/api/project/users-projects/{userId}`
  - DELETE `/api/project/{projectId}`

- Task
  - POST `/api/task`
  - GET `/api/task/`
  - GET `/api/task?title=...` (search by title)
  - PUT `/api/task/{taskId}`
  - DELETE `/api/task/{taskId}`
  - PUT `/api/task/status/{taskId}` (status update)

See `openapi.yaml` for a formal contract.

## State Management Rationale
- Lightweight React Context is used for global state that truly needs to be shared:
  - `UserContext` handles token presence, profile fetch (`/api/auth/profile`), and updates on login.
  - `ProjectContext` loads the current user's projects, tracks selection, and supports deletion.
- Local component state (via `useState`) manages form fields and transient UI state.
- This keeps bundle size small and avoids over-engineering with heavier state libraries.

## Error-Handling Approach
- Request-level handling via `axios` interceptors:
  - Request: attach `Authorization: Bearer <token>` if present.
  - Response: on 401, redirect to `/login`.
- Form validation via `zod` schemas (e.g., `LoginShema`) with field-level messages rendered in the UI.
- Toast notifications (where applicable) for user-visible outcomes (`react-hot-toast`).
- AbortController used in `ProjectContext` to cancel inflight requests on unmount.
