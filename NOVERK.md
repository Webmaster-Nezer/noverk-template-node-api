# Notes for Noverk Web Code

A JSON API on Node 22: Hono for routes, Zod for input checks, TypeScript, tested with Vitest through app.request (no server needed). The routes are in src/app.ts; src/server.ts starts it.

## Commands
- `npm install` once, then `npm run dev` (http://localhost:3000, reloads on save)
- `npm test` runs the tests, `npm run lint` and `npm run typecheck` the checks
- `npm run build` compiles to dist/, `npm start` runs it

## Conventions
- Keep changes small and tested: add or update a test with every change.
- Secrets never go in the code: read them from environment variables and list their names in .env.example.
- CI runs the same commands on every pull request; keep it green.
