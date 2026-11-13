# New API (Node + Hono)

Started from a Noverk Web Code template. A JSON API on Node 22: Hono for routes, Zod for input checks, TypeScript, tested with Vitest through app.request (no server needed). The routes are in src/app.ts; src/server.ts starts it.

## Run it
- `npm install` once, then `npm run dev` (http://localhost:3000, reloads on save)
- `npm test` runs the tests, `npm run lint` and `npm run typecheck` the checks
- `npm run build` compiles to dist/, `npm start` runs it

Environment variables go in `.env` (see `.env.example`); never commit real values.
