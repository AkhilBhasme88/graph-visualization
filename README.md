# Graph Visualization VUE 3 

This repository contains a small Vue 3 frontend and a minimal TypeScript backend. The project lives in two folders at the repository root:

- `frontend/` — Vue 3 + Vite + TypeScript app
- `backend/` — TypeScript Express service

**Prerequisites**
- Node.js: recommended LTS (Node 18+ suggested)
- npm (or yarn/pnpm) on your PATH

**Frontend — Develop and Build**
- Install deps:

```bash
cd frontend
npm install
```

- Dev server:

```bash
npm run dev
```

- Run tests:

```bash
npm run test         # run tests once (Vitest)
npm run test:watch   # watch mode
```

- Build for production and preview:

```bash
npm run build
npm run preview
```

**Backend — Develop and Run**
- Install deps:

```bash
cd backend
npm install
```

- Dev script (present in `backend/package.json`):

```json
"dev": "cross-env NODE_ENV=development tsx watch src/server.ts"
```

- Run server during development (use the `dev` script or `npx`):

```bash
npm run dev
# or (if you prefer to call the tool directly)
npx tsx watch src/server.ts
```

**Run Frontend + Backend Together**
- The root `package.json` already includes convenience scripts. From the repository root you can:

```bash
# install dev deps for both projects
npm run install:all

# start backend and frontend concurrently (requires dev deps installed)
npm run dev

# build both projects
npm run build

# start the backend (production start runs the built server)
npm run start
```

- If you prefer to install dependencies individually, run `npm install` inside `frontend/` and `backend/`.

**Testing**
- Frontend: run from `frontend/` (`npm run test` or `npm run test:watch`).
- Backend: run from `backend/` (`npm run test` or `npm run test:watch`).

**Useful files**
- Frontend entry: [frontend/src/main.ts](frontend/src/main.ts)
- Backend server: [backend/src/server.ts](backend/src/server.ts)

**Troubleshooting**
- Missing script? Check the `scripts` section in `frontend/package.json`, `backend/package.json`, or the root `package.json`.
- If you see Node version errors, ensure your local Node matches the recommended version.

**Next steps / Improvements**
- Consider adding CI to run `npm run test` at the root (it already aggregates frontend + backend tests).
- Add a `README` in each subproject (`frontend/` and `backend/`) with project-specific notes and env vars.
- Add a `LICENSE` if you plan to publish or share this repository.

**License**
Add a license file if you plan to publish or share this repository.
