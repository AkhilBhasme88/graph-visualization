# Graph Visualization — Frontend

Frontend for the Graph Visualization / Vue assignment. Built with Vue 3, Vite, TypeScript and Vitest for unit tests.

## Prerequisites

- Node 18 or newer
- npm (or yarn/pnpm)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build locally

```bash
npm run preview
```

## Testing

- Run tests once: `npm run test`
- Watch tests: `npm run test:watch`
- Coverage: `npm run test:coverage`

This project uses Vitest (see `vitest.config.ts`).

## Linting

Run the linter:

```bash
npm run lint
```

## Project structure

- `src/` — application source
  - `components/` — Vue components (e.g. `node-details.vue`, `tree-graph.vue`)
  - `services/` — API and helpers
- `tests/` / `*.spec.ts` — unit tests (Vitest + Vue Test Utils)
- `package.json` — scripts & deps

## Useful scripts

- `dev` — start Vite dev server
- `build` — build for production
- `preview` — preview production build
- `lint` — run ESLint
- `test` / `test:watch` / `test:coverage` — run Vitest

## Contributing

1. Create an issue describing the change.
2. Open a pull request with a clear description and tests for new behavior.

## Troubleshooting

- If you see engine compatibility errors, ensure you are running Node >=18.
- If tests fail locally, run `npm run test:watch` to iterate quickly.

## License

No license specified in this repository. See `package.json` for project metadata.
