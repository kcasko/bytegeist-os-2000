# Product backlog

Workflow: Ready → In progress → Verified. Each ticket requires acceptance evidence before Verified.

| ID | Priority | Sprint | Deliverable / acceptance | Status |
| --- | --- | --- | --- | --- |
| BG-001 | P0 | 0 | Isolated repo, React/TS/Vite, lockfile, lint/typecheck/tests/build, CI | Verified |
| BG-002 | P0 | 0 | Pure window reducer; singleton launch, focus, move, minimize/restore, maximize, close; tests | Verified |
| BG-003 | P0 | 0 | Desktop, taskbar, Start, pointer and keyboard window movement, narrow-screen layout | Verified |
| BG-004 | P0 | 0 | Portfolio app boundaries, typed content, original styling, docs and verified browser tests | Verified |
| BG-101 | P0 | 1 | Finish project case studies, credentials and contact; verify claims and links | Verified |
| BG-102 | P0 | 1 | ByteWire simulated search/download list and file Properties, explicit opt-in, prevention outcome | Verified |
| BG-201 | P0 | 2 | Independent incident state machine; process, startup persistence, quarantine, reboot and recovery tests | Verified |
| BG-202 | P0 | 2 | Investigation utilities, bounded effects, Exit Simulation, reset, recovery incident report | Verified |
| BG-203 | P0 | 2 | Expanded bounded infection symptoms, wallpaper/rogue shortcut, simulated CPU/tray, activity view, containment cleanup | Verified |
| BG-204 | P0 | 2 | Progressing transfers, completed Downloads folder, direct Open/security confirmation, optional Properties, safe previews | Verified |
| BG-301 | P0 | 3 | Accessibility and touch audit; 320/375/390/768/1440 widths; refresh and reduced motion | Automated verified; physical/manual checks pending |
| BG-302 | P0 | 3 | Verify official challenge rules; review Amplify build, confirm public deployment, capture AWS evidence | Local config verified; public deployment approval pending |
| BG-303 | P0 | 3 | README, screenshots, walkthrough and submission package; separate submission confirmation | Draft and local screenshots ready; AWS evidence/submission pending |
| BG-401 | P1 | Later | Optional preferences/progress persistence, sound opt-in and small Easter eggs | Ready |

Definition of done: acceptance met, relevant automated checks green, limitations documented, no regression to existing sites. Local P0 portfolio and incident are complete. Public AWS release, account eligibility and submission evidence remain pending; no claim of a complete contest entry.

## Desktop authenticity follow-up

| ID | Priority | Acceptance | Status |
| --- | --- | --- | --- |
| BG-205 | P1 | Select/double-click/drag shortcuts; desktop/window/taskbar menus; 8-edge resizing; stable task order and Show Desktop | Verified locally: RC5 |
| BG-206 | P1 | Run whitelist, session Notepad, applied display preferences, calendar, virtual shutdown/restart | Verified locally: RC5 |
| BG-207 | P1 | Shared staged reboot for Start and recovery; skip; preserved startup/files/notes; reinfection only after sign-in | Verified locally: RC5 |

## QA follow-up

| ID | Priority | Acceptance | Status |
| --- | --- | --- | --- |
| BG-208 | P0 | Recovery feedback beside controls, visible scan phase, accurate state/event text, uncovered process details | Verified locally: RC6 |
| BG-209 | P0 | Human-paced transfers, stable Cancel, whole-row selection, duplicate feedback, visible new transfers | Verified locally: RC6 |
| BG-210 | P0 | Recover preferred window sizing after rotation/tiny startup; usable Start footer; dark caption glyphs | Verified locally: RC6 |
| BG-211 | P0 | Explicit Skills and readable initial HTML; mobile tap regression | Verified locally: RC6 |
| BG-212 | P1 | Confirmation before reset/unsaved edits, Run input/launch behavior, Display OK/Cancel | Verified locally: RC6 |

See RC6_QA_FOLLOWUP.md for finding-by-finding outcomes and deliberate limits.

## Interactive fun fact

| ID | Priority | Acceptance | Status |
| --- | --- | --- | --- |
| BG-213 | P0 | Interactive personal fun fact: visible WebTV entry, connect/loading, reveal, palette controls, story remote, reduced motion, navigation preservation | Verified locally |

## Final local candidate RC7

All implemented local foundation, portfolio, desktop, ByteWire, recovery, QA-fix and interactive-fun-fact work is verified. Fresh final checks: 37 unit/component tests and 163 browser tests passed, two unsupported touch cases skipped. The remaining P0 release gates are public GitHub/Amplify publication, live and physical-device testing, AWS evidence, account eligibility and approved submission. See FINAL_LOCAL_RELEASE.md.
