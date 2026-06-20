# Adding A Tool

## Purpose

This guide defines the standard workflow for adding a new tool to Toolbox.

The goal is to make new tools consistent by default and to avoid the current pattern of wiring the same information manually in several places.

## Recommended Codex Path

For agent-assisted tool creation, use `skills/react-tool-builder/SKILL.md`.

That skill is the active execution layer for this guide and should follow the repository contract defined in this document and the other files in `docs/`.

## Target Tool Contract

Every new tool should provide:

- registry metadata
- one top-level view component
- extracted pure logic when appropriate
- translations for every supported locale
- tests for the core logic
- SCSS that consumes shared tokens

## Recommended Structure

```text
src/tools/<tool-id>/
|-- ToolView.tsx
|-- tool.scss
|-- logic.ts
|-- meta.ts
`-- __tests__/
```

If the repository is still mid-migration, place the tool in the closest equivalent existing location and keep the same internal contract.

## Step-By-Step

### 1. Choose a stable tool id

Use `kebab-case` for folder and registry ids.

Examples:

- `json-formatter`
- `text-editor`
- `hash-generator`

## 2. Define tool metadata

Create metadata that contains:

- `id`
- `titleKey`
- `descriptionKey`
- `category`
- `component`
- `icon` if available

The tool registry must be the source of truth for this data.

## 3. Create the view

Create a single top-level React component for the tool view.

Guidelines:

- use `PascalCase` for the component name
- keep the view focused on rendering and orchestration
- move reusable or pure logic into helpers
- use shared shells and shared UI primitives

## 4. Add logic

Create `logic.ts` when the tool contains transformations, validation, parsing, or reusable behavior.

Good candidates for extracted logic:

- formatting
- data transformation
- validation rules
- normalization
- parsing
- export or serialization rules

## 5. Add styles

Create `tool.scss` and consume shared tokens.

Do:

- use semantic tokens
- use `kebab-case` class names
- keep styles local to the tool

Do not:

- hardcode theme colors in TSX
- rely on inline styles for normal layout or theme values
- recreate generic button or input styling inside the tool

## 6. Add translations

Add translations in every supported locale for:

- tool title
- tool description
- action labels
- placeholders
- success and error messages
- helper text

Follow `docs/I18N_GUIDE.md`.

## 7. Add tests

At minimum:

- unit tests for the core logic

Add component tests when:

- the interaction is non-trivial
- the component is shared
- the UI contract is important

Follow `docs/TESTING_STRATEGY.md`.

## 8. Register navigation and rendering through the registry

Do not duplicate tool metadata in:

- app shell
- sidebar
- home page
- any other list of available tools

All those places should read from the same registry.

## 9. Verify before opening a PR

- run lint
- run tests
- run build
- verify every locale
- verify keyboard navigation and focus states

## Done Checklist

- [ ] Stable tool id chosen
- [ ] Tool metadata added to the registry
- [ ] Tool view created
- [ ] Core logic extracted and tested
- [ ] Styles follow token rules
- [ ] i18n complete for all locales
- [ ] Navigation renders from the registry
- [ ] Lint, test, and build pass
