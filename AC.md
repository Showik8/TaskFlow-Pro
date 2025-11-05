# Acceptance Criteria (Shipped Features)

## 1) Authentication
- Login validates inputs with Zod, shows field-level errors.
- Successful login stores JWT token in `localStorage` and updates `UserContext`.
- Role-based redirect after login: `admin → /admin/dashboard`, otherwise `/user/dashboard`.
- When unauthenticated (401), user is redirected to `/login`.

## 2) Profile Auto-Load
- When token exists, app fetches `/api/auth/profile` on load and populates `UserContext`.
- On failure, token is cleared and loading is stopped.

## 3) Projects
- After login, user’s projects are fetched from `/api/project/users-projects/{userId}`.
- First project is auto-selected if present.
- Deleting selected project calls `DELETE /api/project/{id}`, removes it from state, and shows success toast.

## 4) Tasks
- Creating a task calls `POST /api/task` with required fields (`title`, `projectId`, `status`).
- Listing tasks calls `GET /api/task/` and renders tasks grouped by status in the board.
- Updating a task calls `PUT /api/task/{id}` and updates UI state without full reload.
- Deleting a task calls `DELETE /api/task/{id}` and removes it from UI.
- Updating status calls `PUT /api/task/status/{id}`.
- Searching by title uses `GET /api/task?title=...`.

## 5) Forms and Validation
- All forms show inline field errors for invalid input before submission.
- Submit buttons show a loading state and are disabled while request is in-flight.

## 6) UX Responsiveness
- Layout renders correctly on small screens; core actions are accessible without horizontal scroll.
