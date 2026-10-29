# Final local release: ByteGeist OS 2000 RC7

October 29, 2026. Local release candidate only. Nothing has been published, deployed or submitted.

## Completed

- Original React/TypeScript/Vite portfolio with About, Skills, three project case studies, credentials, contact and a readable initial HTML fallback.
- Windows 98/2000-inspired desktop: selectable/movable shortcuts, movable/resizable windows, focus and system menus, stable taskbar, Start, calendar, Show Desktop, Run, Notepad and display settings.
- Interactive personal fun fact: Discover my first internet, hover/keyboard tooltip, optional WebTV-style loading screen, homemade homepage color controls, TV remote and the WebTV/Talk City/mIRC/bakery-to-software-engineering story.
- ByteWire opt-in P2P simulation, five-second transfers, stable cancel controls, completed Downloads folder, file Properties, security confirmation and safe previews.
- Simulated infection, three separate warnings, visible investigate feedback, process containment, startup persistence/reinfection, quarantine, visible verification scan, staged virtual reboot and I Survived ByteWire report.
- Viewport/container growth, preferred window size/position, keyboard focus, reduced motion for the fun fact, confirmations before reset/unsaved edits, and bounded cleanup for timers.

## Verification

Fresh lint, strict TypeScript checks, all 37 unit/component tests and the production build passed. Full three-engine browser results are recorded below after completion. Screenshots cover desktop/hint, WebTV loading/reveal, infection tools, verified recovery and 390px mobile layout.

Read-only link checks returned HTTP 200 for project, credential, GitHub-profile and resume links. LinkedIn returned 999 to the automated request and remains a manual browser check. Physical-device touch and screen-reader sessions remain pending. Automated checks are not a complete accessibility certification.

## Handoff files

- ByteGeist-OS-2000-source-RC7.zip: source, lockfile, tests, documentation, CI and Amplify build configuration.
- ByteGeist-OS-2000-static-RC7.zip: built site contents with index.html at the archive root; ready as a static hosting artifact.
- ByteGeist-OS-2000-screenshots-RC7.zip: local screenshots, not AWS evidence.
- RC7-SHA256.txt: archive checksums.

To run the source, install Node.js 22.12 or newer, extract the source, run npm ci, then npm run dev. For a production preview run npm run build followed by npm run preview. The built site needs an HTTP server; do not expect opening the ZIP's index.html directly from disk to behave like hosting.

## Remaining public release steps

1. Obtain Keith's confirmation for public GitHub publication and a separate new Amplify app.
2. Publish this repository, add its verified URL to the portfolio and submission draft, and run the hosted CI checks.
3. Confirm AWS account/region/build settings and costs, then connect the approved repository/branch using amplify.yml (Node 22, npm ci, npm run build, dist).
4. Test the live HTTPS URL, refresh behavior, both interactive experiences, links and an actual phone.
5. Capture real AWS setup/build/deployment evidence; add actual service details, URLs and deployment lessons to the draft.
6. Confirm student/account eligibility and obtain final submission approval before submitting.

Keep casko.dev, bytespace.casko.dev, their repositories, AWS apps and DNS untouched. GitHub publication, Amplify hosting, remote CI and contest submission are not claimed complete. The latest source is on local branch release/0.1.0.

Final complete browser run: **163 passed, 2 skipped, 0 failed**, across Chromium, Firefox and WebKit in 4.8 minutes. Both skips are Firefox's unsupported touch/mobile emulation. All 37 unit/component tests, lint, strict types and build passed. Full screenshot walkthrough also completed the connection/reveal and infection/recovery flows.
