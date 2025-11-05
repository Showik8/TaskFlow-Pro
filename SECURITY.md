## Auth Flow (frontend)

- Login sends credentials to `POST /api/auth/login`.
- On success, server returns a JWT token; frontend stores it in `localStorage` and sets `Authorization: Bearer <token>` via axios interceptor.
- 401 responses trigger redirect to `/login`.
- Profile is fetched from `GET /api/auth/profile` on app load when a token is present.

Notes:
- This repository is the frontend only. Token issuance/validation occurs on the backend.
- Storing tokens in `localStorage` is simple but vulnerable to XSS. See recommendations below.

## Input Validation (frontend)
- Zod schemas validate forms (e.g., login) before submission; field errors are shown inline.
- Avoids submitting malformed data and provides immediate user feedback.

## Sensitive Data Handling (guidance)
- Do not log tokens, passwords, or PII to the console.
- Never include tokens in URLs or query strings.
- Prefer short-lived access tokens; refresh flow should be handled by the backend.
- Use HTTPS everywhere in production.

## Recommendations (hardening)
- Prefer HttpOnly, Secure refresh tokens (server-managed) over long-lived access tokens stored in `localStorage`.
- Enforce a strict Content Security Policy (CSP) at the hosting layer to reduce XSS risk.
- Sanitize any user-generated content before rendering; avoid using `dangerouslySetInnerHTML`.
- Implement server-side rate limiting and brute-force protection on auth endpoints.
- Use SameSite cookies for any session/recovery flows implemented server-side.
