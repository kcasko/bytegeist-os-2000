# Sprint 0 test evidence

October 29, 2026, Windows / Node 22.23.2 / npm 11.17.0.

- Initial red run: 8 assertions failed, 1 passed against the no-op reducer and generated Vite view. Missing lifecycle/UI behavior caused failures.
- Implementation green: 9/9 Vitest tests passed. Real reducer transitions and Testing Library user interactions.
- npm run check passed: lint, strict application TypeScript check, full unit/component suite, Vite production build.
- Playwright Chromium: 10/10 passed. Pointer drag, keyboard movement, maximize/restore, stacking, minimize/restore/close, active focus fallback, Start arrows/Escape/outside dismissal, viewport shrink.
- Viewport widths: 320, 375, 390, 768, 1440. Tests assert window/control reachability and no document horizontal overflow; ByteWire preview is reachable at each width.
- Local-only preview screenshots captured for desktop, Start and mobile.

Not yet verified: physical touch hardware, screen-reader pass, Firefox/Safari, remote Linux CI, AWS deployment and challenge eligibility. Tests run against Vite's local server; production bundle compilation is checked separately. Portfolio external links were copied from the local existing portfolio and have not been independently link-audited.


Independent review reproduced two issues. Both regression tests failed before fixes: short-screen initial clipping, and keyboard focus loss when relaunching an active app. Fixed vertical clamping and explicit launch focus requests; full suite rerun passed: 9/9 Vitest and 10/10 Chromium, lint, strict typecheck and production build.

