# AGENTS.md
Logging vehicle mileage to resell it with clear history. AI can see strange mileage change.

## Stec
- TypeScript (`strict`), Next.js (App Router), Vitest.
- DB (Supabase (Postgres)).
- Separate CSS files only.

## Commands
- `npm test` — tests (Vitest), no network calls.
- `npm run typecheck` — type checking, no emit.
- `npm run lint` — linter.
- `npm run dev -- -H 0.0.0.0` — dev server accessible from local network.

## Before reporting "done"
- `npm run typecheck`, `npm test`, `npm run lint`, `npm run build` must all pass — show output.

## Межі
- Never read or edit `.env` / `.env.local` — secrets are managed by a human.
- Tests must not hit the network or call paid APIs.
- Never edit package-lock.json manually.
- Never edit existing files in supabase/migrations/, only add new files, if a allow
- dont remove enithing from .gitignore
- dont fix failing test to make it pass, first explain to me what was the problem.

## Requires human approval
- git push
- Adding or removing npm dependencies
- Editing any data in DB

## Домовленості
- Model selected by role from `src/models.ts` (`MODELS.cheap`), not a raw string ID.
- Prices and model deprecation dates are checked against the vendor page, not memory.
- Commit format: `type: description` (feat, fix, docs, test, refactor).
