# Contributing to TaskFlow Pro

Thanks for contributing! This guide covers branching, PR workflow, and code style.

## Workflow
1. Fork the repo: `https://github.com/Showik8/TaskFlow-Pro`
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/TaskFlow-Pro.git
   cd TaskFLow_front
   ```
3. Add upstream:
   ```bash
   git remote add upstream https://github.com/Showik8/TaskFlow-Pro.git
   git fetch upstream
   ```
4. Create a branch:
   ```bash
   git checkout -b feat/<short-feature-name>
   ```
5. Install deps and run locally:
   ```bash
   npm install
   npm run dev
   ```

## PR Checklist
- Lint passes: `npm run lint`
- Build passes: `npm run build`
- Update docs if endpoints/flows change
- Keep PRs small and focused; link related issues

## Commit Convention (Conventional Commits)
- `feat: add task filtering`
- `fix: prevent crash on empty project list`
- `docs: update Architecture.md with endpoints`
- `refactor: simplify UserContext initialization`

## Code Style
- TypeScript, React function components, hooks
- Descriptive variable names; avoid abbreviations
- Prefer early returns over deep nesting
- Add comments only for non-obvious decisions/edge cases
- Keep UI responsive and accessible

## Branching
- `master`: stable, deployable
- feature branches: `feat/*`, `fix/*`, `chore/*`, `docs/*`

## Reviews
- Be constructive; explain why, not just what
- Request changes only for correctness, readability, or scope
- Approve when acceptance criteria are met and checks pass
