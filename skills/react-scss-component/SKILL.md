---
name: react-scss-component
description: Create or refactor React components in TypeScript with co-located SCSS for the Toolbox repository. Use when Codex needs to build a new UI component, split a large component into smaller pieces, standardize props and naming, or align TSX and SCSS with the repository front-end standards.
---

# React Scss Component

## Overview

Use this skill to build or refactor React + TypeScript components that must follow the Toolbox project standards.

## Workflow

1. Read `../../docs/FRONTEND_STANDARDS.md`.
2. Read `../../docs/ARCHITECTURE.md` if the component touches layout or shared boundaries.
3. Keep the component focused on rendering and orchestration.
4. Extract reusable or browser-specific logic when it makes the file easier to read.
5. Keep styling in SCSS and consume shared tokens instead of inventing new theme values in TSX.

## Component Rules

- Use `PascalCase` for the component and file name.
- Use `camelCase` for props variables, handlers, and internal helpers.
- Use `kebab-case` for CSS classes.
- Prefer semantic class names such as `tool-card`, not visual names such as `green-box`.
- Keep props typed and explicit.
- Avoid avoidable inline styles.

## Output Checklist

- TSX and SCSS file names match the component name exactly.
- The component has a clear root class.
- User-facing strings use i18n if the component owns visible text.
- The implementation follows the naming and token rules from the docs.

## References

- `references/component-checklist.md`
- `references/scss-patterns.md`
