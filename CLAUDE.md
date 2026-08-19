# [CLAUDE.md](http://CLAUDE.md)

## Project Stack

- Language: JavaScript

- Framework: Next.js (App Router) + Tailwind CSS

- Package manager: npm

## Conventions

- Commit messages follow Conventional Commits (feat, fix, docs, chore, refactor, test, style)

- Components live in /src/components, one component per file

- Use functional components + hooks, no class components

- Prefer named exports over default exports

- Keep functions small and single-purpose

- Server Components by default; add "use client" only where interactivity is required

## AI Assistant Notes

- Explain reasoning briefly before code changes

- Ask before adding new dependencies

- Follow existing code style rather than introducing new patterns

## Project Rules (learned from Assignment 2 drill)

1. Forms use react-hook-form + zod for validation — never plain useState

   with manual checks. Every required field must show an inline error

   (role="alert") on blur, not just on submit.

2. A component's scope is limited to exactly the fields/sections named in

   the task — no extra fields, sections, or persistence logic (e.g.

   localStorage, new app-wide attributes) added without being asked for.

3. If tests are requested, every field/interactive element in the component

   must have at least one assertion covering it — a summary claiming "all

   tests pass" is not sufficient proof; the test file must be checked

   field-by-field against the component before being accepted.