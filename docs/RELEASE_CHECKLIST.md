# Release checklist: 0.1.0 local candidate

No public deployment or submission has been authorized. The application is a static React build with no backend, analytics, tracking, storage, real downloads, or executable execution.

## Verified sources, October 29, 2026

[Official challenge](https://builder.aws.com/build/hackathons/3bff5627-ef21-3bfc-acfc-fce21d39a4f6/aws-student-builder-challenge-build-your-tech-superpower), including its Rules tab: submissions close November 6, 2026 at 11:59 PM Pacific, which is November 7 at 2:59 AM Eastern. The entry needs an original AWS-hosted portfolio, About/Skills/Projects, a discoverable interactive feature, GitHub link, project write-up and portfolio/AWS screenshots. Student verification and the remaining eligibility conditions must be confirmed in Keith's account before submission. No claim of entry or eligibility is made here.

[Amplify runtime documentation](https://docs.aws.amazon.com/amplify/latest/userguide/troubleshooting-general.html) supports selecting Node through nvm in preBuild. amplify.yml selects Node 22, npm ci, npm run build and dist artifacts. [Vite deployment documentation](https://vite.dev/guide/static-deploy) describes dist and local preview. No SPA router is used, so there are no app deep-link routes to rewrite.

## Ready locally

- [x] Original retro portfolio with directly accessible About, Skills and Projects.
- [x] Visible ByteWire launch hint; explicit consent before simulation and a second confirmation before infection.
- [x] Prevention route and full containment/remediation/verification route.
- [x] Task Manager, Startup Manager, ByteDefender, Event Viewer and automatic incident report.
- [x] Permanent reset/exit outside app windows. Portfolio remains available during infection.
- [x] Independent reducers, typed content, tests, quality workflow, build configuration.
- [x] Cross-browser desktop/mobile-width tests, automated accessibility samples, touch emulation and reduced motion.
- [x] External project and credential URLs returned HTTP 200; see LINK_AUDIT.md. This checks reachability, not all behavior behind those links.

## Approval and external evidence still required

- [ ] Confirm repository publication/visibility and GitHub URL. No remote has been created.
- [ ] Confirm public deployment to a NEW Amplify app, using the default Amplify URL initially. Do not alter casko.dev or bytespace.casko.dev or their DNS.
- [ ] Verify connected AWS account, region, build settings and any costs before publishing.
- [ ] Push/review the candidate, run remote CI, and connect the approved release branch to the new Amplify app.
- [ ] Validate live HTTPS URL, navigation, both game routes, mobile layout and outbound links.
- [ ] Capture real Amplify successful deployment/build evidence. Local screenshots are not AWS evidence.
- [ ] Confirm Builder Center student verification and eligibility, add URLs and AWS evidence to submission draft.
- [ ] Keith approves final submission, then submit and record confirmation.

## Manual verification limits

No physical touch device or screen-reader session has been tested. Automation is not a complete accessibility certification. The game is one deterministic scenario. Optional sound, localStorage preferences/progress, terminal are deferred; they are not needed for the P0 experience.
