# Contributing to TaskFlow

Thank you for your interest in contributing to TaskFlow! This document outlines the process for contributing to the project, including branching strategy, pull request workflow, and code style guidelines.

## Contribution Workflow

### Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/TaskFLow_front.git
   cd TaskFLow_front
   ```
3. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/original-owner/TaskFLow_front.git
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

### Branching Strategy

We follow a simplified Git Flow branching model:

- `main` - Production-ready code. Protected branch that only accepts PRs from `develop` or hotfix branches.
- `develop` - Main development branch. Features and bug fixes are merged here.
- `feature/*` - Feature branches for new functionality (e.g., `feature/task-filtering`)
- `bugfix/*` - Bug fix branches (e.g., `bugfix/login-validation`)
- `hotfix/*` - Critical fixes for production (e.g., `hotfix/security-vulnerability`)

#### Branch Naming Convention

- Use lowercase letters and hyphens
- Start with the branch type prefix
- Include a brief description of the work
- Include the issue number if applicable

Examples:
- `feature/add-task-sorting-#123`
- `bugfix/fix-date-picker-#456`
- `hotfix/auth-token-expiry-#789`

### Development Workflow

1. Sync your local repository with the upstream:
   ```bash
   git checkout develop
   git pull upstream develop
   ```

2. Create a new branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes, following the code style guidelines

4. Commit your changes with meaningful commit messages:
   ```bash
   git commit -m "feat: add task sorting functionality"
   ```
   
   We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

5. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a pull request to the `develop` branch of the main repository

### Pull Request Process

1. Fill out the PR template completely
2. Link any related issues using GitHub keywords (e.g., "Fixes #123")
3. Ensure all automated tests pass
4. Request review from at least one maintainer
5. Address any feedback from code reviews
6. Once approved, a maintainer will merge your PR

#### PR Title Format

Follow the Conventional Commits format for PR titles:
- `feat: add task filtering functionality`
- `fix: resolve date picker validation issue`
- `docs: update API documentation`
- `refactor: improve task list performance`

### Code Review Guidelines

- Be respectful and constructive in reviews
- Focus on code quality, not personal preferences
- Explain the reasoning behind your suggestions
- Approve only when all issues have been addressed

## Code Style Guidelines

### General Guidelines

- Follow the DRY (Don't Repeat Yourself) principle
- Write self-documenting code with clear variable and function names
- Keep functions small and focused on a single responsibility
- Add comments for complex logic, but prefer readable code over excessive comments
- Use TypeScript for type safety

### TypeScript/JavaScript Style

We follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with some modifications:

- Use TypeScript for all new code
- Use functional components with hooks for React components
- Use arrow functions for callbacks
- Use async/await instead of Promise chains when possible
- Use destructuring for props and state
- Use optional chaining and nullish coalescing when appropriate

### CSS/Styling Guidelines

- Use CSS modules or styled-components for component styling
- Follow BEM naming convention when using CSS modules
- Use variables for colors, spacing, and other design tokens
- Ensure responsive design for all components
- Minimize the use of !important

### Testing Guidelines

- Write unit tests for all new functionality
- Aim for high test coverage, especially for critical paths
- Use meaningful test descriptions that explain the expected behavior
- Follow the Arrange-Act-Assert pattern for test structure
- Mock external dependencies appropriately

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or correcting tests
- `chore:` - Changes to the build process, tools, etc.

Example commit messages:
- `feat: implement task filtering by priority`
- `fix: resolve issue with date picker in Safari`
- `docs: update API documentation for task endpoints`
- `refactor: improve performance of task list rendering`

## Questions and Support

If you have questions about contributing, please:

1. Check existing issues and discussions
2. Open a new discussion if your question hasn't been addressed
3. Reach out to the maintainers via the project's communication channels

Thank you for contributing to TaskFlow!