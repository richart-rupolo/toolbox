# Testing Strategy

## Purpose

This document defines what to test in Toolbox and how to think about test coverage pragmatically.

## Principles

- Test behavior, not trivia
- Prefer small tests for pure logic
- Add UI tests when the interaction contract matters
- Avoid over-testing implementation details
- Treat tests as part of the feature contract

## Testing Layers

### 1. Unit tests for pure logic

Use unit tests for:

- formatters
- parsers
- validators
- transformations
- helpers

Examples:

- JSON formatting rules
- string normalization
- line sorting
- duplicate removal

### 2. Component tests for reusable UI

Add component tests for:

- shared buttons
- shared inputs
- select wrappers
- status messages
- layout shells when their contract matters

Good focus areas:

- rendered states
- disabled states
- callbacks
- accessibility labels
- keyboard behavior

### 3. Feature or tool tests

Add feature-level tests when a tool has:

- complex interaction flows
- non-trivial state transitions
- browser integrations that deserve confidence

## Environment Guidance

- use `node` for pure utility tests
- use `jsdom` when the code under test touches DOM APIs
- keep browser mocks targeted and understandable

## Minimum Expectations Per New Tool

At minimum, a new tool should include:

- unit tests for its core logic

Add more when:

- the UI behavior is complex
- the tool uses browser APIs
- a shared component contract is involved

## What Not To Test

- exact markup structure without behavioral value
- private implementation details that users cannot observe
- library internals

## Recommended Test Cases By Area

### Utilities

- valid input
- invalid input
- empty input
- boundary cases

### Components

- default render
- variant render
- interaction callbacks
- disabled behavior
- accessibility hooks

### Tools

- happy path
- invalid input path
- reset or clear behavior
- copy, download, or export behavior if relevant

## Review Checklist

- [ ] Tests cover the core behavior
- [ ] Test names describe business intent clearly
- [ ] DOM APIs are only used in tests that need them
- [ ] The test import paths match filesystem casing exactly
