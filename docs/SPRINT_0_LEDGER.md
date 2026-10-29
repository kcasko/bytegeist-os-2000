# Sprint 0 execution ledger

- BG-001: isolated D:/Repos/bytegeist-os-2000; React/TS/Vite scaffold, strict application types, lockfile, quality commands, local branch sprint-0, CI config.
- BG-002: reducer lifecycle assertions observed red against no-op stub; pure reducer implemented, suite green.
- BG-003: Start and window interaction assertions observed red against generated scaffold; working shell and keyboard/pointer controls implemented, suite green.
- BG-004: typed portfolio views, original custom CSS/icons, ByteWire preview, architecture/backlog/test docs and preparatory Amplify config. Chromium suite initially 8/8 green.
- Ruling: keep Git local without a remote for this sprint because no remote visibility was specified; cost is that GitHub Actions has not executed remotely. Public deployment still requires confirmation.
- Final review: independent read-only reviewer. Two P2 findings reproduced: short-screen bottom clipping and keyboard focus loss on relaunch. Added two browser regressions, observed both fail; fixed vertical bounds and launch focus signal.
- No deferred minor findings reported. Existing portfolio checkout remained clean; no commands wrote to existing sites or deployment services.

Final verification: npm run check exit 0 (9/9 Vitest); npm run test:e2e exit 0 (10/10 Chromium). Both final regression tests green.
