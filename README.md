# Room planner

A browser room-planning workspace built with Vite, React and TypeScript. It is styled
with the Industry design system.

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Starts the Vite dev server. |
| `npm run build` | Type-checks the project, then builds it for production into `dist/`. |
| `npm run test` | Runs the Vitest suite once (`vitest run`). |
| `npm run typecheck` | Type-checks every project reference without emitting files (`tsc -b --noEmit`). |
| `npm run lint` | Lints the repo with ESLint (`eslint .`). |
| `npm run check` | Runs `typecheck`, `lint`, `test` and `build` in that order and stops at the first failure. |

## Docs

- Spec: [`Docs/specs/2026-11-12-room-planner-workspace-design.md`](Docs/specs/2026-11-12-room-planner-workspace-design.md)
- Plan: [`Docs/plans/2026-11-12-room-planner-workspace.md`](Docs/plans/2026-11-12-room-planner-workspace.md)
- Mistakes and fixes log: [`Docs/mistakes-and-fixes.md`](Docs/mistakes-and-fixes.md)

`design_handoff_room_planner/` is the read-only design reference. Never edit it or
import from it.
