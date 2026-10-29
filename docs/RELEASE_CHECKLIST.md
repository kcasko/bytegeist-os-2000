# Release checklist: 0.1.0 local candidate

Keith authorized public GitHub publication and a separate Amplify deployment on October 29, 2026. Contest submission is not authorized. The application is a static React build with no backend, analytics, tracking, persistent browser storage, real downloads, or executable execution.

## Verified sources, October 29, 2026

[Official challenge](https://builder.aws.com/build/hackathons/3bff5627-ef21-3bfc-acfc-fce21d39a4f6/aws-student-builder-challenge-build-your-tech-superpower), including its Rules tab: submissions close November 6, 2026 at 11:59 PM Pacific, which is November 7 at 2:59 AM Eastern. The entry needs an original AWS-hosted portfolio, About/Skills/Projects, a discoverable interactive feature, GitHub link, project write-up and portfolio/AWS screenshots. Student verification and the remaining eligibility conditions must be confirmed in Keith's account before submission. No claim of entry or eligibility is made here.

[Amplify runtime documentation](https://docs.aws.amazon.com/amplify/latest/userguide/troubleshooting-general.html) supports selecting Node through nvm in preBuild. amplify.yml selects Node 22, npm ci, npm run build and dist artifacts. [Vite deployment documentation](https://vite.dev/guide/static-deploy) describes dist and local preview. No SPA router is used, so there are no app deep-link routes to rewrite.

## Ready locally

- [x] Original retro portfolio with directly accessible About, Skills and Projects.
- [x] Discover my first internet entry and hover/focus hint; interactive WebTV connection, homepage palette, story remote, reduced-motion bypass and focus retention.
- [x] Visible ByteWire launch hint; explicit consent before simulation and a second confirmation before infection.
- [x] Prevention route and full containment/remediation/verification route.
- [x] Task Manager, Startup Manager, ByteDefender, Event Viewer and automatic incident report.
- [x] Permanent reset/exit outside app windows. Portfolio remains available during infection.
- [x] Independent reducers, typed content, tests, quality workflow, build configuration.
- [x] Cross-browser desktop/mobile-width tests, automated accessibility samples, touch emulation and reduced motion.
- [x] External project and credential URLs returned HTTP 200; see LINK_AUDIT.md. This checks reachability, not all behavior behind those links.

## Approval and external evidence still required

- [x] Public repository created: https://github.com/kcasko/bytegeist-os-2000; main branch published; source link added to the site.
- [x] Separate Amplify app created in us-east-1: d17okimdsll7tw, main branch, default domain only. Existing sites and DNS were not altered.
- [x] Existing authenticated AWS account verified; static WEB hosting in us-east-1; no backend or custom-domain purchase. Hosting storage/traffic follows AWS pricing. Build ran locally before manual upload.
- [x] Source published from release/0.1.0 to GitHub main; GitHub Actions passed. Amplify uses a manual verified static upload, not automatic repository deployment. Remote CI/live test results are in LIVE_DEPLOYMENT.md.
- [x] Live HTTPS HTML and assets verified; complete browser suite passed against the live URL, covering navigation, game routes and mobile layouts. Outbound link reachability is recorded in LINK_AUDIT.md.
- [x] Save real Amplify job 2 deployment evidence/log and a live-site screenshot. Build ran locally; no Amplify build is claimed.
- [x] Capture an authenticated Amplify console screenshot and add it to the existing Builder Center draft.
- [ ] Confirm Builder Center student verification and eligibility, add URLs and AWS evidence to submission draft.
- [ ] Keith approves final submission, then submit and record confirmation.

## Manual verification limits

No physical touch device or screen-reader session has been tested. Automation is not a complete accessibility certification. The game is one deterministic scenario. Optional sound, localStorage preferences/progress, terminal are deferred; they are not needed for the P0 experience.
