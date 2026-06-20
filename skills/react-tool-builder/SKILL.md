---
name: react-tool-builder
description: Build or refactor a Toolbox tool page using the repository's target architecture, i18n rules, testing rules, and React + SCSS standards. Use when Codex needs to add a new tool, migrate an existing tool toward the registry-driven model, or create the files and metadata that define a tool feature.
---

# React Tool Builder

## Overview

Use this skill to add or refactor a tool feature in Toolbox with the documented repository contract.

## Workflow

1. Read `../../docs/ADDING_A_TOOL.md`.
2. Read `../../docs/ARCHITECTURE.md`.
3. Read `../../docs/I18N_GUIDE.md` for visible text.
4. Read `../../docs/TESTING_STRATEGY.md` for test expectations.
5. Read `../../docs/FRONTEND_STANDARDS.md` for naming and styling rules.
6. Implement the tool as a single feature with clear metadata, view, logic, styles, and tests.

## Tool Rules

- Treat tool metadata as configuration, not duplicated UI content.
- Keep tool logic separate from the view when it is reusable or testable.
- Add user-facing copy in every supported locale.
- Use shared layout and UI primitives when they exist.
- Do not bypass the registry with one-off navigation wiring.

## Output Checklist

- Tool id uses `kebab-case`.
- View component uses `PascalCase`.
- SCSS consumes shared tokens.
- Tests cover the core logic.
- i18n keys are added for every locale.

## References

- `references/tool-checklist.md`
