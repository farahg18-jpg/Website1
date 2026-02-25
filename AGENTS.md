# Haul

Vite + React + TypeScript SPA for a logistics/hauling platform (early stage).

## Cursor Cloud specific instructions

### Project overview

Single-service client-side SPA — no backend, no database, no Docker. Auth is a localStorage-backed mock (any email + password works).

### Common commands

See `package.json` scripts — standard Vite project:

- **Dev server**: `npm run dev` (port 5173 by default; add `-- --host 0.0.0.0` to expose externally)
- **Lint**: `npm run lint`
- **Type check**: `npx tsc -b`
- **Build**: `npm run build`

### Gotchas

- The `main` branch contains only a `README.md`. Application code lives on feature branches (e.g. `cursor/development-environment-setup-6943`). Make sure your working branch has the app code merged before attempting to run the dev server.
- No test framework is configured yet. There are no automated tests to run.
- The project uses `package-lock.json` (npm). Do not use pnpm or yarn.
