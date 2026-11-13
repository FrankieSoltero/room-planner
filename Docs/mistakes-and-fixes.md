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

## three 0.187 removed PCFSoftShadowMap
- **Date:** 2026-11-12
- **What happened:** The plan told Task 16 to set `renderer.shadowMap.type = PCFSoftShadowMap`,
  copied from the prototype (three r128). In three 0.187 that constant has been deprecated since
  r186. `WebGLShadowMap.js` warns "PCFSoftShadowMap has been removed. Using PCFShadowMap instead."
  and falls back to `PCFShadowMap`, so the app would have printed a console warning on every load.
- **Root cause:** The plan's three.js API was written from memory of an older release, not checked
  against the installed package.
- **Fix:** Caught in the Task 16 review. The renderer uses `PCFShadowMap` (commit 3cb0b1d) and the
  plan was amended to match (commit 6bbaecd).
- **How to avoid:** Before putting any three.js constant or API in a plan, check the installed
  package's type definitions and source (`node_modules/three/src/...`).

## Light intensities are not comparable across three.js versions
- **Date:** 2026-11-12
- **What happened:** The handoff gives a hemisphere light of 0.78 and a sun of 0.62 (three r128).
  The app started from those values × π: hemisphere 2.45, sun 1.95. In the live comparison
  (Task 20) the floor matched the prototype, but the walls were about 15 levels darker (back wall
  220 vs 236 mean luma) and shadows were stronger (shadow/lit 0.828 vs 0.876).
- **Root cause:** Two changes between r128 and 0.187. (1) Lights became physically based: r128
  multiplied light intensity by π inside the shader, 0.187 does not, so ×π is only the starting
  point. (2) r128 had no colour management. It fed material hex colours (walls, furniture) to the
  shader as if they were already linear and then sRGB-encoded the result, which brightens them.
  0.187 converts those colours from sRGB to linear first. The floor texture is tagged sRGB in both
  versions, so it already matched. The walls did not, and a plain ×π could not fix both.
- **Fix:** Tuned the two values against the prototype capture by measuring screen regions:
  hemisphere **3.0**, sun **1.7** (RMS error over walls, floor and shadow 12.3 → 3.3; shadow/lit
  0.875 vs 0.876). Recorded in `src/config.ts` and `Docs/verification/2026-11-12-live-check.md`;
  owner approval pending. Furniture is still darker and more saturated than in the prototype
  because of point (2). Lighting cannot fix that; it needs an owner decision on colour handling.
- **How to avoid:** When porting a three.js scene across versions, compare captures side by side
  in the browser and measure them. Do not convert intensities with a formula alone. Check
  `ColorManagement` and the colour space of every texture and material colour as well.

## Room handles snap to 3 in
- **Date:** 2026-11-12
- **What happened:** A Task 14 test first expected a dragged room length of 148 in. The code
  returned 147 and the test failed.
- **Root cause:** Room edge handles snap with `snapRoomDim` to `CONFIG.roomHandleSnap` (3 in), so
  the right value was 147. The test was wrong, not the code.
- **Fix:** The test now gets its expected value from `snapRoomDim(148)`, which is 147
  (`src/components/Stage/PlanView.test.tsx`).
- **How to avoid:** Work out expected values with the same snap function the code uses
  (`snapRoomDim`, `CONFIG.furnitureSnap`), not by hand.
