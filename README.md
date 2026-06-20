# Toolbox

Toolbox is a React + TypeScript + Vite application for developer-oriented tools. The repository currently contains a small set of tools and a documentation-first roadmap to turn the codebase into a scalable front-end platform that can grow without accumulating avoidable duplication.

This repository is in a transition phase:

- the current code works as a small tool collection
- the documentation in `docs/` defines the target standards and architecture
- the next implementation steps are focused on componentization, registry-driven tools, and front-end consistency

## Goals

- Build a reusable shell for internal tools
- Add new tools with low friction
- Standardize React, TypeScript, SCSS, i18n, and testing conventions
- Reduce duplication in navigation, layouts, and styling
- Make the repository safer for CI, deployment, and future contributors

## Tech Stack

- React 18
- TypeScript
- Vite
- SCSS
- i18next / react-i18next
- Jest
- ESLint

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
npm run test
```

## Getting Started

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Install

```bash
npm install
```

### Start the app

```bash
npm run dev
```

### Run checks

```bash
npm run lint
npm run test
npm run build
```

## Repository Structure

```text
.
|-- docs/                 # Project standards, architecture, roadmap, and guides
|-- prompts/              # Archived prompt notes from v0.0.1 kept as historical reference
|-- skills/               # Active repo-local Codex skills built on top of docs/
|-- src/
|   |-- assets/           # Global SCSS tokens, mixins, and shared style primitives
|   |-- components/       # Shared UI and layout components
|   |-- locales/          # Translation files
|   |-- pages/            # Current page-level screens and tools
|   `-- types/            # Shared TypeScript types
|-- test/                 # Jest tests
`-- .github/workflows/    # CI / deployment workflows
```

## Documentation Map

- `docs/CODEBASE_EVOLUTION_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTRIBUTING.md`
- `docs/ADDING_A_TOOL.md`
- `docs/FRONTEND_STANDARDS.md`
- `docs/I18N_GUIDE.md`
- `docs/TESTING_STRATEGY.md`
- `docs/DECISIONS.md`

## Current Architectural Direction

The current implementation is page-driven, but the target direction is registry-driven:

- a shared app shell
- a central tool registry
- reusable page and tool shells
- semantic design tokens
- predictable naming and file structure
- tests and i18n defined as part of the tool contract

See `docs/ARCHITECTURE.md` and `docs/CODEBASE_EVOLUTION_PLAN.md` for the detailed target state.

## Adding a New Tool

Use the full process in `docs/ADDING_A_TOOL.md`. The short version is:

1. create the tool folder in the target feature structure
2. define tool metadata in the registry
3. build the screen with shared shells and UI primitives
4. add translations in every supported locale
5. add logic tests and any required component tests
6. run lint, test, and build before opening a PR

## Project Standards

The repository standard is:

- components and types in `PascalCase`
- hooks, functions, variables, and handler names in `camelCase`
- feature and route folders in `kebab-case`
- SCSS class names in `kebab-case`
- semantic design tokens instead of hardcoded colors
- no avoidable inline styles

The full standard lives in `docs/FRONTEND_STANDARDS.md`.

## Repo-Local Skills

This repository includes project-specific skills in `skills/`:

- `react-scss-component`
- `react-tool-builder`
- `react-scss-refactor`

These skills are the active agent workflow for the repository and are intended to help future Codex sessions follow the project standards consistently.

The old files in `prompts/` are no longer the active path for new work. They are preserved as historical documentation from version `0.0.1`.
