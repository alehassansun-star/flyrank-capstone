# WORKFLOW.md — Prompting Drill Comparison

## What I built
A settings form for the FlyRank capstone app, built twice: once from a single
vague prompt, once from a precise, constraint-driven prompt with a required
verification step.

## Round 1 (vague prompt)
Prompt used: "Add a settings form to this app."

What it produced: A SettingsForm component with three field groups — Profile
(display name, email), Tracking (website URL, primary keyword, rank check
interval), and Preferences (theme, email alerts) — persisted to localStorage
under `flyrank-settings`, a "Settings saved." message, a Reset to defaults
button, and a new `data-theme` attribute wired into `index.css` to override
the system theme.

Issues found: No validation of any kind — empty or malformed values (blank
display name, invalid email) save silently to localStorage with no guard. No
tests were written. No accessibility attributes (no `aria-invalid`, no
`role="alert"`, no explicit error messaging) were added. The AI also invented
significant scope beyond "a settings form" — tracking fields and a full
theming system — because the vague prompt gave it nothing to constrain
against, so it filled the gap with plausible-sounding guesses.

## Round 2 (precise prompt)
Approach: Fresh chat, explicit file path, exact three fields (display name,
email, notifications), required libraries (react-hook-form + zod),
accessibility requirements, and an explicit instruction to write and run
tests before finishing.

What it produced: The same component built to spec — react-hook-form + zod
validation, `aria-invalid`/`aria-describedby`/`role="alert"` on errors,
`htmlFor`/`id` label associations, submit disabled via `formState.isValid`,
and a Vitest + Testing Library suite (3 tests: valid submission, missing
required field, invalid email) — all reported passing.

Mistake I caught: The test suite never exercises the "notifications enabled"
checkbox field at all — despite the AI's summary implying full coverage
("all three tests pass"), one of the three actual form fields has zero test
assertions on it. I only noticed this by reading the test file directly, not
from the AI's own summary.

## Comparison
- Correctness: Round 1 allows invalid/empty data to persist unnoticed; Round
  2 blocks submission until valid.
- Accessibility: Round 1 has none; Round 2 has proper ARIA wiring and label
  associations.
- Edge cases: Round 1 handles none; Round 2 explicitly tests two failure
  paths, though still misses the checkbox.
- Review effort: Round 1 looked "done" fastest but hides real debt (no
  validation, unreviewed scope creep) a reviewer would have to catch later.
  Round 2 took longer to prompt but front-loaded verification, so review
  time went into confirming coverage rather than hunting for missing checks.

## What I'd change next time
I'd explicitly ask Round 2's prompt to cover every field in its test list,
not just imply "tests" as a general instruction — the AI verifies exactly
what you tell it to, and nothing more.
