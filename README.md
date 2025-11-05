# TaskFlow Pro – Frontend

React + TypeScript + Vite frontend for TaskFlow Pro. Repository: `https://github.com/Showik8/TaskFlow-Pro`.

## 1) Setup Guide

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install
```bash
git clone https://github.com/Showik8/TaskFlow-Pro.git
cd TaskFLow_front
npm install
```

### Environment variables
- API base URL is currently configured in `src/utils/apiPaths.ts` via `BASE_URL`.
- Optional for tooling/seed script: `TASKFLOW_API_BASE_URL` (defaults to `http://localhost:8000`).

Example `.env` (optional, used by seed script only):
```bash
TASKFLOW_API_BASE_URL=http://localhost:8000
```

## 2) Run Scripts
- Dev: `npm run dev` → http://localhost:5173
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`
- Tests: `npm run test` (placeholder)
- Seed demo data: `npm run seed`

## 3) Demo User Credentials
- Email: `user@taskflow.com`
- Password: `User123!`

## 4) User Stories (shipped scope)
- Authentication: register, login, auto-load profile, role-based redirect (admin/user)
- Project management: list user projects, create project, delete project
- Task management: create, list, update, delete, update status; search by title
- Organization: priority, due date, filter in UI
- Collaboration: add members to project

See `AC.md` for detailed acceptance criteria.

## 5) Developer References
- API endpoints: `src/utils/apiPaths.ts`
- HTTP client and interceptors: `src/utils/axiosInstance.ts`
- Auth state: `src/context/UserContext.tsx`
- Project state: `src/context/ProjectContext.tsx`
- Data models: `src/shared/Types.ts`

For the API contract, see `openapi.yaml`.
