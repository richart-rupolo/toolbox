# Refactor Checklist

- Confirm the existing behavior before changing structure.
- Identify duplicated layout or styling patterns.
- Write tests to ensure the behavior and execute
- Extract shared pieces only when the repeated pattern is real the rewrite the tests and execute.
- Rename ambiguous variables and handlers.
- Replace inline styles with SCSS unless the value is truly dynamic.
- Keep import casing exact.
- Update tests when the refactor changes the contract.
