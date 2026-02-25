# Haulr

Vite + React + TypeScript SPA — a logistics/transport platform for large items, modeled after haulr.nl.

## Cursor Cloud specific instructions

### Project overview

Single-service client-side SPA. No backend, no database, no Docker. Auth and transport data are localStorage-backed (any email + password works). All UI text is in Dutch.

### Common commands

See `package.json` scripts — standard Vite project:

- **Dev server**: `npm run dev` (port 5173; add `-- --host 0.0.0.0` to expose externally)
- **Lint**: `npm run lint`
- **Type check**: `npx tsc -b`
- **Build**: `npm run build`

### Key routes

| Route | Description |
|---|---|
| `/` | Public landing page |
| `/login` | Login page |
| `/registreren` | Registration page |
| `/boeken` | Booking / quote flow |
| `/app` | Dashboard (auth required) |
| `/app/transporten` | Transport list |
| `/app/transporten/:id` | Transport detail + tracking |
| `/app/settings` | Settings |

### Gotchas

- The project uses `package-lock.json` (npm). Do not use pnpm or yarn.
- No test framework is configured yet. There are no automated tests.
- Transport data is stored in `localStorage` under key `haulr.transports`. Clear it to reset demo data.
