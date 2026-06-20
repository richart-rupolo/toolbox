# Decisions

## Purpose

This file records architecture and repository-level decisions that should not live only in chat history or pull request comments.

Use this file for short decisions and use `docs/adr/` when a decision needs more context, tradeoffs, or a migration plan.

## Active Decisions

### D-001: English is the repository documentation language

Status: accepted

Rationale:

- It aligns with the React and front-end ecosystem
- It reduces friction for code, naming, and technical writing
- It keeps project standards easier to reuse in future sessions

### D-002: The target architecture is registry-driven

Status: accepted

Rationale:

- It removes duplicate tool metadata
- It gives navigation and discovery one source of truth
- It lowers the cost of adding new tools

### D-003: React, TypeScript, and SCSS naming follows market-standard casing

Status: accepted

Rules:

- components and types use `PascalCase`
- hooks, functions, variables, and handlers use `camelCase`
- folders, route ids, and CSS classes use `kebab-case`

### D-004: New front-end code must prefer semantic tokens over hardcoded theme values

Status: accepted

Rationale:

- It improves consistency
- It makes redesigns cheaper
- It reduces visual drift across tools

## When To Create An ADR

Create an ADR when a decision:

- changes folder structure
- changes tool registration
- changes the front-end styling model
- changes testing strategy significantly
- introduces or removes a major library

## ADR Template

Use `docs/adr/ADR_TEMPLATE.md` for new architecture decision records.
