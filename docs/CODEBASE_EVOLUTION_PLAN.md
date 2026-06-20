# Codebase Evolution Plan

## Purpose

This document records what must happen to make the Toolbox codebase easier to extend, easier to reason about, and safer to scale with additional tools.

It is intentionally forward-looking. It does not describe the idealized current state. It describes the target state, the gaps, and the work required to get there.

## Current Snapshot

The repository already has useful building blocks:

- React + TypeScript + Vite
- a small set of tools
- global SCSS foundations
- i18n support
- tests for some utility functions

The main issue is not lack of features. The main issue is that growth currently happens through manual edits in multiple places.

## Main Problems To Solve

### 1. Adding a new tool requires touching too many files

Today a new tool tends to require updates in:

- `src/App.tsx`
- `src/components/Sidebar/Sidebar.tsx`
- `src/pages/Home.tsx`
- translation files in `src/locales`
- local styles and local tests

That is a sign that the tool metadata is not centralized.

### 2. Visual structure is repeated instead of reused

Page-level screens repeat similar concepts:

- page titles
- descriptions
- tool containers
- action areas
- card layouts
- status and helper messaging

The codebase needs shared shells instead of repeated page structures.

### 3. Styling is split across multiple styling approaches

The repository currently mixes:

- global SCSS partials
- page-specific SCSS
- component-specific SCSS
- hardcoded colors inside component code
- inline styles in TSX
- an unused `src/App.css` token layer

This prevents a reliable design system from forming.

### 4. Repository standards are implicit instead of explicit

Naming, folder structure, and React patterns can be inferred from the code, but they are not enforced by a strong project contract yet.

### 5. CI and portability are weaker than they should be

There are path casing inconsistencies and the current Pages workflow is not yet aligned with a build-first front-end pipeline.

## Target State

The target state is a registry-driven tool platform:

- one source of truth for tool metadata
- one app shell
- one set of reusable page and tool shells
- one semantic token layer for front-end styling
- one documented contract for i18n, tests, and tool structure

## Documentation Foundation

The documentation foundation has been created and should now act as the project contract:

- [x] `README.md`
- [x] `docs/ARCHITECTURE.md`
- [x] `docs/CONTRIBUTING.md`
- [x] `docs/ADDING_A_TOOL.md`
- [x] `docs/FRONTEND_STANDARDS.md`
- [x] `docs/I18N_GUIDE.md`
- [x] `docs/TESTING_STRATEGY.md`
- [x] `docs/DECISIONS.md`

## Active Workflow References

The active implementation workflow now has three layers:

- `docs/` defines the repository contract and target architecture
- `skills/` contains the active repo-local Codex skills that should consume that contract
- `prompts/` is preserved as historical reference material from version `0.0.1`

When adding or refactoring code, prefer the documented skills instead of reviving the old prompt snippets:

- tool creation: `skills/react-tool-builder/SKILL.md`
- component work: `skills/react-scss-component/SKILL.md`
- refactors: `skills/react-scss-refactor/SKILL.md`

The legacy prompts remain useful for historical product intent and early copy, but they should not be treated as the current implementation contract.

## Architecture Work

Completed in the active app path. Legacy shim files still remain in some old locations for compatibility cleanup.

- [x] Create a central tool registry
- [x] Replace manual page switching with registry-driven rendering
- [x] Introduce a real `AppLayout`
- [x] Introduce `PageShell` and `ToolShell`
- [x] Move shared UI primitives into `src/components/ui`
- [x] Move layout components into `src/components/layout`
- [x] Define a stable feature boundary with `src/tools` or `src/features`

## Duplication To Remove

- [x] Duplicate tool metadata spread across App, Sidebar, and Home
- [x] Repeated page title and page description patterns
- [x] Repeated container and card structures
- [x] Repeated button states and styling rules
- [x] Hardcoded design values spread across TSX and SCSS
- [x] Browser API behavior embedded directly in page components when it should live in helpers or hooks

## Front-End System Work

- [ ] Choose one source of truth for design tokens
- [ ] Remove token duplication between SCSS variables and unused CSS variables
- [ ] Replace hardcoded colors in component logic
- [ ] Remove avoidable inline styles
- [ ] Standardize button, input, panel, status, and form patterns
- [ ] Define accessibility requirements for focus, keyboard support, labels, and contrast

## React And TypeScript Work

- [ ] Enforce naming and file conventions from `docs/FRONTEND_STANDARDS.md`
- [ ] Turn large mixed-responsibility components into smaller units
- [ ] Separate pure logic from browser-only logic
- [x] Make feature folders predictable
- [ ] Enable `forceConsistentCasingInFileNames`
- [ ] Keep component props explicit and typed

## I18n Work

- [ ] Migrate from flat legacy keys toward namespaced dotted keys
- [ ] Separate app chrome, tool content, and system messages
- [ ] Keep every locale complete for new user-facing text
- [ ] Move language metadata out of UI components and into shared config

## Testing Work

- [x] Fix path casing mismatches in test imports
- [ ] Use `jsdom` when DOM APIs are part of the behavior under test
- [ ] Define minimum test coverage expectations per tool
- [ ] Add component tests for shared UI primitives when they become reusable contracts

## CI And Delivery Work

- [ ] Make CI run install, lint, test, and build
- [ ] Publish `dist/` instead of the repository root
- [ ] Fail fast on casing problems, lint issues, test failures, and build failures
- [ ] Add dependency caching

## Recommended Execution Order

1. Stabilize the repository: casing, dead files, CI, and build pipeline
2. Consolidate front-end tokens and UI primitives
3. Introduce shared layout shells
4. Introduce the tool registry
5. Migrate existing tools to the new standard
6. Treat every new tool as a contract-driven feature

## Definition Of Success

The codebase is in the desired state when:

- a new tool can be added from a single clear workflow
- layout and styling primitives are reused instead of copied
- naming is predictable across the repository
- i18n and tests are part of the feature contract
- CI can catch the most common regressions automatically
