# Mistakes and fixes

A running log of mistakes made on this project and how they were fixed, so the same
mistake is not repeated. Newest entries go at the bottom.

Entry format:

```
## <short title>
- **Date:** YYYY-MM-DD
- **What happened:**
- **Root cause:**
- **Fix:**
- **How to avoid:**
```

---

## create-vite 9 scaffolds Oxlint, not ESLint, by default
- **Date:** 2026-11-12
- **What happened:** `npm create vite@latest rp-scaffold -- --template react-ts`
  (create-vite 9.3.4) produced no `eslint.config.js` and no `src/vite-env.d.ts`. It wrote
  `.oxlintrc.json`, a `lint` script of `oxlint`, and `typescript@~7.0.2`. The plan expects
  ESLint with typescript-eslint, react-hooks and react-refresh. typescript-eslint 8 does
  not support TypeScript 7, so adding ESLint on top of that output would have mixed
  incompatible versions.
- **Root cause:** create-vite 9 made Oxlint the default linter for React templates. ESLint
  is now opt-in through the `--eslint` flag. That variant pins `typescript@~6.0.3` and
  `typescript-eslint@^8.72.1`, which work together. Since Vite 8, the template also gets
  Vite client types from `"types": ["vite/client"]` in `tsconfig.app.json`, so it no
  longer ships `src/vite-env.d.ts`.
- **Fix:** Re-scaffolded with
  `npm create vite@latest rp-scaffold -- --template react-ts --eslint --no-interactive`
  and copied that output, so every tooling version is still the template's tested set.
  Nothing was hand-pinned. Created `src/vite-env.d.ts` by hand with
  `/// <reference types="vite/client" />`, because the plan lists it. It repeats the
  tsconfig `types` entry and does no harm.
- **How to avoid:** Run `npm create vite@latest -- --help` before scaffolding and check
  the linter flag. Do not assume a template still ships a file just because older versions
  did.

## Triple-slash `vitest/config` reference fails lint
- **Date:** 2026-11-12
- **What happened:** `vite.config.ts` began with `/// <reference types="vitest/config" />`
  so it could type the `test` block. `eslint .` failed with
  `@typescript-eslint/triple-slash-reference`.
- **Root cause:** typescript-eslint's recommended config bans triple-slash type
  references when an `import` can do the same job.
- **Fix:** Import `defineConfig` (and `configDefaults`) from `vitest/config` instead of
  `vite`. That gives the same typing without the reference.
- **How to avoid:** In config files, get Vitest types from the `vitest/config` import,
  not from a triple-slash reference.
