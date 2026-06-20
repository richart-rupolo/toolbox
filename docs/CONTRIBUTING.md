# Contributing

## Purpose

This document defines how to contribute code, docs, and front-end structure changes to Toolbox.

## Working Agreements

- Prefer small, reviewable pull requests
- Make behavior safer before making it more abstract
- Follow the documented naming and front-end standards
- Treat tests, i18n, and docs as part of the feature contract
- Do not introduce a new pattern without documenting why it exists

## Branching

- Use feature branches
- Default branch prefix: `codex/`
- Keep branch names descriptive, for example:
  - `codex/add-json-compare-tool`
  - `codex/refactor-sidebar-shell`
  - `codex/standardize-scss-tokens`

## Commit Guidance

Prefer focused commits that explain the reason for the change. Example patterns:

- `feat: add tool registry contract`
- `refactor: extract page shell from tool pages`
- `docs: add frontend standards and i18n guide`
- `test: cover json formatter validation rules`

## Naming Conventions

See `docs/FRONTEND_STANDARDS.md` for the full standard. The short version is:

- React components: `PascalCase`
- Types and interfaces: `PascalCase`
- Hooks: `camelCase` with `use` prefix
- Variables and functions: `camelCase`
- Booleans: `is`, `has`, `can`, or `should` prefix
- Feature folders: `kebab-case`
- CSS classes: `kebab-case`

## Pull Request Checklist

- [ ] The change solves one clear problem
- [ ] New or updated behavior matches the documented architecture direction
- [ ] Naming follows repository standards
- [ ] No avoidable inline style or hardcoded theme value was added
- [ ] User-facing text exists in every supported locale
- [ ] Tests were added or updated where needed
- [ ] Docs were updated if the change introduced a new pattern
- [ ] Lint, test, and build were run locally when the environment supports them

## Definition Of Ready

A task is ready to implement when:

- the goal is clear
- the impacted area is known
- any user-facing text requirements are known
- the desired output is compatible with the documented architecture
- edge cases are understood well enough to avoid rework

## Definition Of Done

A task is done when:

- implementation is complete
- naming and structure follow repository standards
- i18n is complete
- tests are in place for the relevant level
- docs are updated when the contract changed
- lint, test, and build pass

## When To Add Or Update Documentation

Update docs when you:

- introduce a new folder pattern
- introduce a new shared primitive
- change how tools are registered
- change naming rules
- change i18n key strategy
- change testing expectations
- change CI or deployment behavior

## Review Priorities

Code review should prioritize:

1. behavior regressions
2. architectural drift
3. missing tests
4. i18n and accessibility gaps
5. readability and maintainability

Style-only comments matter, but they come after correctness and long-term maintainability.
