# ByteGeist OS 2000

An original Windows 98/2000-inspired technical portfolio. Sprint 0 foundation, built October 29, 2026.

## Run locally

Requires Node.js 22.12 or newer (verified with 22.23.2), npm and Git.

```powershell
cd D:\Repos\bytegeist-os-2000
npm ci
npm run dev -- --host 127.0.0.1
```

Open the localhost URL Vite prints. No AWS account or environment secrets required.

## What works

- Desktop application launchers, Start navigation, taskbar and local clock.
- Singleton windows with stacking/focus, pointer and touch dragging, minimize/restore, maximize/restore and close.
- Keyboard: Tab through controls, Enter/Space activate, Start arrows navigate, Escape dismisses Start. Focus a window title's Move button and use arrows to move by 16 pixels (Shift: 64). Double-click title to maximize.
- Welcome, Projects, About and System Properties; typed portfolio content.
- ByteWire preview. P2P interactions and the optional fake malware game are NOT implemented yet.
- Compact viewport windows fill the workspace; larger windows are bounded after viewport resize.

## Verification

```powershell
npm run check
npx playwright install chromium
npm run test:e2e
```

`check` runs lint, strict TypeScript checking, 9 Vitest unit/component tests and a production build. 10 Playwright browser tests exercise window lifecycle and screen widths 320, 375, 390, 768 and 1440. CI repeats these on Linux; the remote workflow has not run yet.

## Structure

- src/core/desktop: shell, Start and taskbar
- src/core/windows: pure state reducer and window frame
- src/core/system: typed application registry and original CSS icons
- src/apps: portfolio views and ByteWire preview
- src/content: typed project and skills data
- src/styles: original retro theme
- tests: reducer, component and Chromium browser tests
- docs: brief, architecture, backlog, implementation plan and evidence

Window state is intentionally separate from future game state. No persistent state or real downloads exist in this foundation. Refresh opens a clean Welcome window.

## Scope and release

This is a new local Git repository on branch sprint-0. No GitHub remote or public deployment has been created. casko.dev and bytespace.casko.dev are unchanged. amplify.yml prepares static build settings only; AWS hosting, Node version, challenge rules and submission requirements must be verified before release. Public deployment requires Keith's confirmation.

Next: finish portfolio evidence/content, implement ByteWire inspection/prevention, then the separate deterministic recovery engine. See docs/BACKLOG.md.

