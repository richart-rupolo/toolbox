# Architecture

## Scope

This document describes the target architecture for Toolbox. It should be treated as the repository contract for future refactors and new features.

The current implementation has not fully reached this target yet. When the current code and this document diverge, use this document as the direction for new work unless there is a documented decision that says otherwise.

## Architectural Goals

- Make new tools cheap to add
- Keep UI structure consistent across tools
- Separate view logic, pure logic, browser-only behavior, and content
- Make the front-end easy to test
- Keep navigation, i18n, and styling configuration centralized

## High-Level Layers

### 1. App shell

Own the permanent application frame:

- root layout
- header
- navigation
- language switcher
- top-level routing or page rendering

### 2. Tool registry

Own the metadata that describes available tools:

- tool id
- display title key
- description key
- category
- icon
- route or internal page key
- feature component
- optional status flags

This layer removes the need to manually duplicate tool definitions in multiple screens.

### 3. Shared UI and layout

Own reusable primitives and shells:

- buttons
- inputs
- select wrappers
- panels
- page headers
- status messages
- `AppLayout`
- `PageShell`
- `ToolShell`

### 4. Tool features

Own the tool-specific behavior:

- screen component
- pure logic
- browser integration
- tool-specific styles
- tests
- i18n keys

### 5. Utilities and platform services

Own general reusable helpers:

- clipboard helpers
- file download helpers
- string helpers
- validation helpers
- window or media-query hooks

## Target Directory Shape

```text
src/
|-- app/
|   |-- App.tsx
|   |-- AppLayout.tsx
|   `-- providers/
|-- components/
|   |-- layout/
|   `-- ui/
|-- config/
|   |-- i18n/
|   `-- tools/
|-- hooks/
|-- tools/
|   `-- <tool-id>/
|       |-- ToolView.tsx
|       |-- logic.ts
|       |-- tool.scss
|       |-- meta.ts
|       `-- __tests__/
|-- styles/
|   |-- _tokens.scss
|   |-- _mixins.scss
|   `-- main.scss
`-- utils/
```

This is the recommended target shape. The current repository can migrate toward it incrementally.

## Tool Contract

Every tool should have:

- a stable `toolId`
- registry metadata
- a single top-level view component
- pure logic extracted from the view when possible
- translations in every supported locale
- tests for core logic
- styles that consume shared tokens

## Rendering Flow

The target rendering flow is:

1. app bootstraps providers
2. app shell loads tool registry
3. navigation renders from the registry
4. the selected route or page key resolves the tool view
5. the tool view renders inside shared shells

## State Rules

- Keep state as close as possible to where it is used
- Lift state only when multiple siblings need it
- Derive state instead of duplicating it
- Keep browser-only behavior in hooks or helpers when it becomes reusable
- Do not let page components accumulate unrelated responsibilities

## Styling Rules At The Architecture Level

- Shared tokens live in one place
- Shared primitives consume semantic tokens
- Tool-specific SCSS should not redefine the design system
- Inline styles are reserved for truly dynamic values only
- TSX files should not be the place where theme values are invented

## Testing Boundaries

- Pure logic belongs in unit tests
- Shared UI contracts deserve component tests
- Browser integrations should be tested where they add real confidence
- Tool logic should not depend on fragile UI selectors when a smaller test can cover the behavior

## Migration Strategy

### Phase 1

- stabilize imports and casing
- clean up dead files
- align CI with lint, test, and build

### Phase 2

- create layout shells and UI primitives
- consolidate front-end tokens

### Phase 3

- introduce the tool registry
- migrate existing tools to the registry

### Phase 4

- add new tools only through the documented contract

## Non-Goals

- over-abstracting the app before repeated patterns are real
- introducing libraries just to look more modern
- hiding simple logic behind unnecessary helper layers

This architecture aims for pragmatic reuse, not abstraction for its own sake.
