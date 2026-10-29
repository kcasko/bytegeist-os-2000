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
2. Search, select a fictional file and watch its transfer progress to Complete.
3. Choose Open file, or Open Downloads and open the completed file there. Properties is optional; it can reveal the disguise and earn **Not Today, LimeWire.**
4. Opening the disguised executable shows Open File - Security Warning. Run (simulated) starts the incident; Cancel backs out. Try the infected route remains available after prevention.
5. Task Manager: inspect and end songhelper.exe.
6. Startup Manager: inspect and disable ByteWire Helper.
7. ByteDefender: inspect/quarantine the file, run a clean verification scan, then simulate reboot.
8. The incident report opens with **I Survived ByteWire.**, evidence, timeline and a link to real troubleshooting work.

During infection, up to three fictional warning windows return on a bounded timer. The wallpaper is hijacked, a rogue shortcut appears, and the tray/Task Manager show simulated high CPU. Small screens use a reserved activity strip instead of covering recovery controls. Hide pop-ups is available without pretending to remove the process.

Ending the process alone does not remove persistence. Rebooting with an enabled startup entry and available executable causes reinfection. Global reset/exit controls remain available when game windows are closed. Portfolio windows stay open. Transfers progress on a shared session timer, even with ByteWire closed; incomplete transfers can be cancelled and retried. Session progress is in memory only; refresh starts clean.

All files, peers, scans, processes, reboots and warnings are synthetic. There are no actual downloads or execution, browser pop-ups, network searches, localStorage, credentials, analytics or device access.

## Verify

```powershell
npm run check
npx playwright install chromium firefox webkit
npm run test:e2e
```

`check` runs lint, strict application TypeScript checking, 29 unit/component tests and production build. The browser suite defines 34 scenarios across Chromium, Firefox and WebKit: 101 passed, one unsupported Firefox mobile-emulation test skipped. Automated accessibility samples cover desktop, Start, skills, client, infection and recovery report. Touch emulation and reduced motion are exercised. Physical devices and screen-reader sessions remain manual checks.

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

The full 101-check cross-browser suite passed against the local production preview. Remote Linux CI is configured but has not run.

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

Local only. No GitHub remote, public deployment, AWS resources or submission have been created. Both casko.dev and bytespace.casko.dev remain untouched. amplify.yml selects Node 22 and static dist output. Public deployment and submission require Keith's confirmation. See docs/CHALLENGE_FIT.md, docs/RELEASE_CHECKLIST.md and docs/SUBMISSION_DRAFT.md.

Optional sound, storage across page refreshes and a terminal are deferred. The P0 portfolio and one complete incident scenario work locally.

## Desktop controls

Single-click selects a desktop shortcut; double-click opens it. Touch uses one tap, and Enter opens a focused shortcut. Drag shortcuts to arrange them; right-click the desktop to refresh, arrange, launch utilities or change the background.

Drag window titles and any edge/corner to move and resize. Double-click a title to maximize/restore. The upper-left icon and title right-click open the system menu. A focused title moves with arrow keys; the southeast resize handle resizes with arrow keys. Shift increases the step. Alt+Space opens the window menu; Ctrl+F6 cycles open windows. Taskbar buttons retain launch order, support right-click actions, and Show Desktop hides/restores visible windows.

Start includes Run, Notepad, Display Properties and Shut Down. Run recognizes the programs listed in its help. Notepad saves within the current tab session; saved text survives a virtual restart. Unsaved text is discarded on shutdown/restart after the visible warning. Refresh clears session storage. Clock opens a working month calendar.

Restart performs shutdown, black screen, BIOS-style checks, branded loading and sign-in before opening the desktop. Skip startup finishes the same boot immediately. ByteDefender uses this same sequence. Downloads, saved notes and startup configuration survive; unfinished transfers cancel, windows close, and enabled malware startup reinfects at sign-in. No sound or long first-visit boot blocks portfolio navigation.

## QA follow-up behavior

Transfers now last approximately five seconds and retain separate Cancel/Properties controls. Search rows select across their full width. New transfers scroll into view, and repeat downloads explain their current state. Reset asks before clearing progress.

The initial HTML contains a readable portfolio fallback for JavaScript-disabled visitors. Skills is explicitly named. Run focuses its input and closes after launching a known program; unknown names, including inherited object keys, stay errors. Display Properties supports OK, Apply and Cancel. Notepad prompts before discarding unsaved edits.

Windows remember preferred dimensions when the viewport temporarily shrinks. Start keeps Run and Shut Down in its pinned footer. Scanner feedback appears beside its actions and scanning has a brief visible phase. See docs/RC6_QA_FOLLOWUP.md for verification and remaining limits.

## Interactive fun fact

Choose Welcome → Interactive fun fact → Connect, or open WebTV Memories from the desktop/Start. Power on a TV-style connection screen to discover that Keith built his first HTML websites on WebTV. Change the homemade page's colors and use the remote to explore Talk City, mIRC and his career change. This optional feature has Skip, power-off and normal window controls; it never blocks portfolio navigation. See docs/INTERACTIVE_FUN_FACT.md.
