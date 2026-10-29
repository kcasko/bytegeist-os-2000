# ByteGeist OS 2000

An original Windows 98/2000-inspired technical portfolio with a fictional file-sharing client and a playable cybersecurity recovery scenario. Version 0.1.0 local release candidate, October 29, 2026.

## Run locally

Requires Node.js 22.12 or newer (verified with 22.23.2), npm and Git.

```powershell
cd D:\Repos\bytegeist-os-2000
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Open the URL Vite prints. No AWS account, credentials or environment secrets are required locally.

## Explore

Welcome, My Projects, About Keith and System Properties are always available from the desktop and Start. Project case studies describe the problem, approach and outcome, with evidence links. About includes contact; System Properties includes education, practical skills and public credential records.

Windows support pointer dragging, stacking, minimize/restore, maximize/restore and close. On narrow screens, windows fill the workspace. Keyboard: Tab through controls, Enter/Space activate, Start arrows navigate and Escape dismisses Start. Focus a Move title button and use arrows to move by 16px, or Shift+arrows for 64px. Double-click a title to maximize.

## ByteWire incident BG-2000

1. Open ByteWire and explicitly enter the simulation.
2. Search, select a fictional file and simulate its download.
3. Inspect Properties. Catch the disguised .exe and flag it to earn **Not Today, LimeWire.**
4. Alternatively, choose Run simulated executable (or Try the infected route after prevention), then confirm the fictional infection.
5. Task Manager: inspect and end songhelper.exe.
6. Startup Manager: inspect and disable ByteWire Helper.
7. ByteDefender: inspect/quarantine the file, run a clean verification scan, then simulate reboot.
8. The incident report opens with **I Survived LimeWire.**, evidence, timeline and a link to real troubleshooting work.

Ending the process alone does not remove persistence. Rebooting with an enabled startup entry and available executable causes reinfection. Global reset/exit controls remain available when game windows are closed. Portfolio windows stay open. Session progress is in memory only; refresh starts clean.

All files, peers, scans, processes, reboots and warnings are synthetic. There are no actual downloads or execution, browser pop-ups, network searches, localStorage, credentials, analytics or device access.

## Verify

```powershell
npm run check
npx playwright install chromium firefox webkit
npm run test:e2e
```

`check` runs lint, strict application TypeScript checking, 24 unit/component tests and production build. The browser suite defines 26 scenarios across Chromium, Firefox and WebKit: 77 passed, one unsupported Firefox mobile-emulation test skipped. Automated accessibility samples cover desktop, Start, skills, client, infection and recovery report. Touch emulation and reduced motion are exercised. Physical devices and screen-reader sessions remain manual checks.

To test the production bundle:

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4180
```

In another terminal:

```powershell
$env:BYTEGEIST_TEST_URL='http://127.0.0.1:4180'
npm run test:e2e
```

The full 77-check cross-browser suite passed against the local production preview. Remote Linux CI is configured but has not run.

## Structure

- src/core/desktop: desktop, Start and taskbar
- src/core/windows: pure window reducer and accessible frames
- src/core/system: typed registry and original CSS icons
- src/apps/Portfolio: About, Projects and Skills views
- src/apps/ByteWire: local search, simulated transfer queue and consent/prevention
- src/apps/Recovery: Task Manager, Startup Manager, ByteDefender, Event Viewer and report
- src/game/engine: independent deterministic incident reducer
- src/content: sourced typed portfolio content
- tests: reducer/component and browser/accessibility checks
- docs: brief, backlog, architecture, evidence, release checklist and submission draft

## Release status

Local only. No GitHub remote, public deployment, AWS resources or submission have been created. Both casko.dev and bytespace.casko.dev remain untouched. amplify.yml selects Node 22 and static dist output. Public deployment and submission require Keith's confirmation. See docs/RELEASE_CHECKLIST.md and docs/SUBMISSION_DRAFT.md.

Optional sound, preference/progress storage, a terminal and window resize handles are deferred. The P0 portfolio and one complete incident scenario work locally.
