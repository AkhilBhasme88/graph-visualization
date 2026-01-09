# Backend

Minimal Node + TypeScript backend for the Vue assignment. This service provides simple HTTP endpoints used by the frontend and includes utilities for development and testing.

**Quick links**
- **Source:** `src/` directory
- **Server entry:** `src/server.ts`
- **Data/seeds:** `src/data.ts`
- **Tests:** `tests/`

## Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm or pnpm

## Install
```bash
npm install
```

## Available scripts (add to `package.json`)
```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "vitest"
}
```

## Run (development)
```bash
npm run dev
```
The server runs on the port defined by `PORT` (default: `3000`).

## Build & Run (production)
```bash
npm run build
npm start
```

## API Endpoints
This README describes the common endpoints used during the assignment. Adjust paths in `src/server.ts` if your implementation differs.
- `GET /` — Health check (returns 200 OK)
- `GET /data` — Returns sample dataset from `src/data.ts`

Use a tool like `curl` or Postman to exercise the endpoints:
```bash
curl http://localhost:4000/data
```

## Project structure
- `src/` — TypeScript source files
  - `src/server.ts` — Express app and server bootstrap
  - `src/data.ts` — sample data used in tests and dev
  - `src/model.ts` — domain models and helpers
- `tests/` — unit tests (Vitest)
- `package.json`, `tsconfig.json`, `vitest.config.ts`

## Testing
This project uses Vitest. Run tests with:
```bash
npm test
```

## Development notes
- Use `npx ts-node-dev` (as in the `dev` script) for hot reload during development.
- If you add build output to `dist/`, ensure `.gitignore` excludes it.

## Contributing
- Open an issue or send a PR. Keep changes small and focused.

## License
This project is provided for the assignment; include your preferred license if required.
