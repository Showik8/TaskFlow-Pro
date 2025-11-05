# Contributing to TaskFlow

Thank you for your interest in contributing to TaskFlow! This document outlines the process for contributing to the project, including branching strategy, pull request workflow, and code style guidelines.

## Contribution Workflow

### Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/Showik8/TaskFLow_front.git
   cd TaskFLow_front
   ```
3. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/Showik8/TaskFLow_front.git
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

#### Commits Format

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

Thank you for contributing to TaskFlow!
