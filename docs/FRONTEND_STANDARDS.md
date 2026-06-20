# Frontend Standards

## Scope

This document defines the target front-end standard for Toolbox across React, TypeScript, naming, SCSS, state, and accessibility.

The current codebase is still migrating toward this standard. New code should follow this document even if older files do not yet fully match it.

## Naming Conventions

### `PascalCase`

Use `PascalCase` when the thing represents a type or a React component.

Use it for:

- React component names: `LanguageSelector`
- component files: `LanguageSelector.tsx`
- component stylesheets: `LanguageSelector.scss`
- types and interfaces: `ToolDefinition`
- enums: `ToolCategory`

### `camelCase`

Use `camelCase` when the thing is a variable, function, object property, hook, or handler.

This is what you described as "first letter lowercase and the rest camel case."

Use it for:

- variables: `currentPage`
- functions: `formatJsonString`
- hooks: `useResponsiveSidebar`
- handlers: `handleCopy`, `handleSubmit`
- configuration objects: `toolRegistry`
- helper files: `textUtils.ts`

### `kebab-case`

Use `kebab-case` for names that are part of the filesystem or CSS surface.

Use it for:

- feature folders: `json-formatter`
- route-like ids: `text-editor`
- CSS classes: `tool-card`, `page-title`
- asset folders when they are feature-oriented

### `UPPER_SNAKE_CASE`

Use `UPPER_SNAKE_CASE` sparingly for real constants that never change and are not simple local variables.

Examples:

- `MAX_TOOL_NAME_LENGTH`
- `DEFAULT_DEBOUNCE_MS`

Do not use this style for regular objects, props, or normal local variables.

## React File Naming

Use these defaults:

- React components: `PascalCase.tsx`
- component styles: `PascalCase.scss`
- hooks: `useSomething.ts`
- utility files: `somethingUtils.ts`
- type files: `Something.ts` or `something.types.ts`
- feature folders: `kebab-case`

Examples:

- `Sidebar.tsx`
- `Sidebar.scss`
- `useClipboard.ts`
- `textUtils.ts`
- `toolRegistry.ts`
- `json-formatter/`

## React Component Standards

### Component shape

- Keep one primary component per file
- Export the main component as the default only when that is the repository norm for that area
- Keep the public props type explicit
- Prefer small components with a single reason to change

### Component responsibilities

Good component responsibilities:

- render UI
- orchestrate local state
- call helpers or hooks
- map props to presentation

Bad component responsibilities:

- owning unrelated browser APIs and business logic in the same file
- defining large config objects inline when they can be extracted
- mixing layout, data transformation, and side effects into one giant component

### Props

- Keep props explicit and typed
- Prefer descriptive names over short names
- Use boolean names like `isOpen`, `hasError`, `canSave`, `shouldFocus`
- Avoid ambiguous props like `data`, `item`, `value2`

### Event handlers

Use `handleX` for local handlers:

- `handleFormat`
- `handleLanguageChange`
- `handleToggleSidebar`

Use `onX` for callback props passed to children:

- `onClick`
- `onChange`
- `onPageChange`

## Hooks Standards

- Hooks must start with `use`
- Hook file names must match the exported hook name
- Hooks should encapsulate browser or stateful behavior that is reused or hard to read inline
- Do not create a hook just to wrap one `useState` call without adding clarity

Examples:

- `useResponsiveSidebar`
- `useClipboard`
- `useToolSearch`

## Utility Standards

- Keep pure utilities free of React imports
- Keep pure utilities free of DOM access when possible
- If DOM access is required, isolate it and document why
- Group utilities by domain, not by arbitrary size

Good examples:

- `jsonFormatterUtils.ts`
- `textUtils.ts`
- `clipboard.ts`
- `fileDownload.ts`

## Import Standards

Recommended order:

1. external libraries
2. absolute internal imports
3. relative internal imports
4. styles

Keep casing exact and consistent with the filesystem.

## SCSS Standards

### Source of truth

Use one semantic token layer as the design source of truth.

Preferred token categories:

- `color-bg-canvas`
- `color-bg-surface`
- `color-bg-elevated`
- `color-text-primary`
- `color-text-secondary`
- `color-border-default`
- `color-accent-primary`
- `color-accent-primary-hover`
- `color-success`
- `color-danger`
- `space-xs` through `space-xl`
- `radius-sm` through `radius-lg`

### SCSS file rules

- global partials use underscore prefixes: `_tokens.scss`, `_mixins.scss`
- component stylesheets are co-located when the component is feature-specific
- shared styles live in a central styles folder
- do not create a second token system in plain CSS variables unless it is intentionally bridged from the same source

### Class naming

- use `kebab-case`
- name the root class after the component or feature
- keep class names semantic, not visual

Good:

- `sidebar`
- `tool-card`
- `page-header`
- `status-message`

Bad:

- `green-box`
- `left-panel-2`
- `bac`

### Hardcoded values

Do not hardcode:

- theme colors
- border colors
- typography values
- spacing values that already exist in the token scale

Use inline styles only when the value is truly dynamic and cannot be expressed cleanly through class names or CSS variables.

## Layout Standards

- shared page spacing belongs in layout shells
- tool pages should not reinvent page containers
- use grid or flex intentionally, not both by habit
- do not hide structural layout rules inside deeply nested page styles

## Accessibility Standards

- every interactive element must be keyboard reachable
- focus states must be visible
- icon-only controls need accessible names
- color cannot be the only status signal
- disabled states must remain understandable
- form controls need labels or equivalent accessible naming

## Testing Expectations For Front-End Code

- pure logic gets unit tests
- shared interactive UI gets component tests
- browser helpers get targeted tests where they provide confidence
- avoid testing implementation details when behavior can be tested directly

## Anti-Patterns To Avoid

- giant page components that contain view, logic, styles, and browser integration all together
- duplicated tool metadata in several files
- flat translation keys that grow without namespaces forever
- TSX files with hardcoded theme values
- creating abstractions before repeated patterns are proven

## Migration Notes

Current legacy patterns may still exist, including:

- flat `i18n_` keys
- page-level styling duplication
- inline styles in TSX
- mixed path casing

New work should move the repository toward this document instead of preserving those patterns.
