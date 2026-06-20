# I18n Guide

## Purpose

This document defines the translation key strategy and i18n workflow for Toolbox.

## Supported Locales

The current repository includes:

- Portuguese
- English
- Spanish

Every new user-facing string must be added to all supported locales.

## Current State And Target State

### Current state

The repository currently uses flat keys such as:

- `i18n_home`
- `i18n_about`
- `i18n_jsonFormatterTitle`

### Target state

The target standard is namespaced dotted keys because they scale better:

- `app.header.title`
- `app.nav.home`
- `tools.jsonFormatter.title`
- `tools.jsonFormatter.actions.format`
- `tools.textEditor.actions.uppercase`

## Key Rules

- Use English for key names
- Use dotted namespaces
- Group by feature or responsibility
- Keep key names semantic, not coupled to HTML structure
- Do not encode styling or layout details in a key name

## Recommended Namespaces

### App chrome

- `app.header.*`
- `app.nav.*`
- `app.language.*`
- `app.status.*`

### Shared UI

- `ui.actions.*`
- `ui.labels.*`
- `ui.placeholders.*`
- `ui.messages.*`

### Tool-specific

- `tools.<toolId>.title`
- `tools.<toolId>.description`
- `tools.<toolId>.actions.*`
- `tools.<toolId>.fields.*`
- `tools.<toolId>.messages.*`
- `tools.<toolId>.tips.*`

## Examples

Good:

- `tools.jsonFormatter.actions.format`
- `tools.textEditor.messages.saved`
- `app.nav.about`

Bad:

- `i18n_button_1`
- `jsonPageTitle`
- `titleForTheJsonFormatterH1`

## Migration Rule

During migration:

- existing `i18n_` keys may remain until the file is touched
- new keys should use the dotted namespace format
- when editing an old area substantially, migrate that area's keys instead of mixing styles forever

## Authoring Rules

- write natural user-facing text
- keep punctuation inside translations when it belongs to the sentence
- avoid building sentences by concatenating several translated fragments
- prefer full messages over stitched strings

## Error And Status Messages

Error, warning, success, and helper messages must also be translated.

Do not leave system feedback hardcoded in component files if users can see it.

## Review Checklist

- [ ] All visible strings use translation keys
- [ ] Every locale contains the new keys
- [ ] Key names follow namespace rules
- [ ] No mixed legacy and target naming in the same newly touched feature without a migration note
