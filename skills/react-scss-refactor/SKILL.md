---
name: react-scss-refactor
description: Review and refactor existing React + TypeScript + SCSS code in Toolbox toward cleaner component boundaries, clearer naming, lower duplication, and stronger adherence to the repository standards. Use when Codex needs to clean up an existing screen, extract shared pieces, reduce inline styling, or align legacy code with the documented front-end rules.
---

# React Scss Refactor

## Overview

Use this skill when the code already exists but needs to be cleaned up and brought closer to the documented standard.

## Workflow

1. Read `../../docs/FRONTEND_STANDARDS.md`.
2. Read `../../docs/ARCHITECTURE.md` if the refactor affects repository boundaries.
3. Preserve behavior first.
4. Extract duplication second.
5. Improve naming, component boundaries, and styling consistency.
6. Update tests when the refactor touches behavior or reusable contracts.

## Refactor Priorities

- remove duplicated structure
- shrink mixed-responsibility components
- move repeated logic into helpers or hooks
- remove hardcoded theme values
- replace unclear naming
- align casing with the filesystem

## Output Checklist

- Behavior remains intact.
- Naming follows repository rules.
- The code is smaller or clearer in responsibility.
- Styling moved toward SCSS and tokens.
- Tests and i18n remain correct.

## References

- `references/refactor-checklist.md`
