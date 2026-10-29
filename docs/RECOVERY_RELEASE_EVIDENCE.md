# Recovery and release candidate evidence

October 29, 2026. Windows, Node 22.23.2, npm 11.17.0.

## Final verification

- npm run check: lint with no diagnostics, strict application typecheck, 24 Vitest unit/component tests, Vite production build passed.
- Production preview on 127.0.0.1:4180, with BYTEGEIST_TEST_URL set to that address: 77 Playwright checks passed across Chromium, Firefox and WebKit. One Firefox touch-emulation case skipped because the engine does not support that Playwright context option.
- 26 browser scenarios cover window lifecycle, pointer/keyboard movement, Start, viewport changes, prevention, fake execution confirmation, full recovery, reinfection, global exit/reset, mobile widths, automated accessibility samples, touch emulation and reduced motion.
- Full recovery exercised at 320/390/768/1440px; shell also at 375px. No document-level horizontal overflow.
- axe WCAG A/AA samples: desktop, Start, skills, client, infected Task Manager, recovered report. Initial wallpaper contrast failures were reproduced and corrected. Automated scans are samples, not full certification.
- Synthetic transfer tests captured zero real browser downloads. No filesystem/device/network incident operations exist.
- Nine distinct project/evidence/credential links returned HTTP 200. See LINK_AUDIT.md.

## Regression record

- Seven incident-engine assertions observed red against a no-op reducer before implementation. All green after the pure model.
- Prevention badge incorrectly remained after entering the infected route: browser regression failed, then passed after separating current-route display.
- Independent review reproduced global toolbar covering maximized Close and stale execution confirmation after global Reset. Both browser regressions observed red, then passed after reserved workspace space and a session revision/remount.
- Independent portfolio review corrected an unsupported stale-DNS-cleanup phrase to DNS configuration correction, verified against the owning homelab source.
- Two portfolio component assertions observed red before adding case-study and credential content, then green.

## Remaining limits

Physical touch hardware, NVDA/other screen readers, real AWS deployment, remote Linux CI and account eligibility have not been verified. The production test suite passed before a final factual wording correction in the homelab case study; final check/build reran after that text-only correction. There are no remaining known important application defects from the scoped reviews. Optional extras are deferred in BACKLOG.md.

## Release boundary

No public repository, AWS resources, DNS changes or submission. Existing portfolio checkout remained clean. Static build, source archive, screenshots, draft and checklist are prepared for approval; local screenshots do not establish AWS deployment.
