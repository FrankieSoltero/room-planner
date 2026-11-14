> **This repository is archived.** The Room Planner now lives in the portfolio site at
> [frankiesoltero.com/room-planner](https://frankiesoltero.com/room-planner), in the
> [`room-planner/` folder of FrankieSoltero/portfolio](https://github.com/FrankieSoltero/portfolio/tree/main/room-planner).
> This repo is kept for its commit history only and is no longer updated.

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

## Keyboard

These shortcuts act on the selected piece of furniture. They do nothing when nothing is
selected, and text fields keep their own keys. Arrow keys keep their native behaviour in any
form control, including the segmented controls.

| Key | What it does |
|-----|--------------|
| `R` | Rotates the selected piece 90°. |
| `Delete` / `Backspace` | Removes the selected piece. |
| `Escape` | Clears the selection. |
| Arrow keys | Nudge the selected piece 1 in. |
| `Shift` + arrow keys | Nudge the selected piece 12 in. |

## Notes

- Placing furniture uses `crypto.randomUUID`, which browsers only provide in secure contexts
  (HTTPS or `localhost`). Serving the dev build over plain HTTP on a LAN address will fail at
  "Place in room".

## Docs

- Spec: [`Docs/specs/2026-11-12-room-planner-workspace-design.md`](Docs/specs/2026-11-12-room-planner-workspace-design.md)
- Plan: [`Docs/plans/2026-11-12-room-planner-workspace.md`](Docs/plans/2026-11-12-room-planner-workspace.md)
- Mistakes and fixes log: [`Docs/mistakes-and-fixes.md`](Docs/mistakes-and-fixes.md)

`design_handoff_room_planner/` is the read-only design reference. Never edit it or
import from it.
