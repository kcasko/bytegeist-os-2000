# Download/open workflow: RC4

October 29, 2026. User requested a natural download → Downloads folder → Open flow instead of mandatory inspection.

## Behavior

- Download queues a typed transfer at 0%. A shared App-level 500ms timer advances four 25% steps to Complete. Opening and inspecting incomplete transfers are blocked by both UI and reducer/helpers.
- Cancel removes a pending transfer, and retry starts it again. The timer is above window lifecycle, so transfers continue with ByteWire minimized or closed. Completion/cancel/reset/exit stop it when no pending transfers remain.
- Completed transfers offer Open file and Open Downloads. The new desktop/Start Downloads app shows completed files at C:\Downloads with name/type/size, optional filename extensions, toolbar/row Open, double-click, and optional Properties.
- Opening the disguised executable directly displays an Open File - Security Warning with full filename, unknown publisher, source and Run (simulated)/Cancel. Properties is not required to enter the infected route.
- Properties still supports identifying/flagging the disguised executable and prevention. Cross-window prevention changes invalidate existing warnings; only the explicit Try infected route action carries an override for intentional replay.
- Ordinary MP3/text files use synthetic BytePlayer/Notepad views, never actual audio/file execution. Closing the media preview resets it to Stopped.
- Stable event-source controls and connected window fallbacks preserve keyboard focus across Properties → Open → Cancel and WebKit's different clicked-button focus behavior.

## Verification history

- New progress/cancel unit assertions and new Downloads browser assertions observed red before implementation.
- Initial post-implementation run: 29 unit/component tests and build passed. Four old browser scenarios failed because /ByteWire/ also matched the new Downloads description; anchored selectors fixed that ambiguity. All 32 then-current Chromium scenarios passed.
- Independent review reproduced stale security-warning prevention bypass and disconnected focus return. Added browser regressions, observed both red, then green after execution-time revalidation and stable opener handling. A safe preview reopening assertion also failed before the stopped-state fix.
- First full three-engine run: 99 passed, one unsupported Firefox mobile-emulation case skipped, two WebKit focus assertions failed. The fix records event.currentTarget explicitly rather than relying on document.activeElement. All six focused WebKit Downloads scenarios then passed.
- Final full-suite result is appended after completion. No known game-rule changes are intended; recovery/containment effects remain covered by the regression suite.

No actual browser downloads, network transfers, filesystem writes, audio playback, executable execution or public deployment. Existing sites are untouched. Earlier RC1–RC3 source/static files remain preserved as historical artifacts.

Final result: npm run check passed lint, strict application types, all 29 unit/component tests and production build. Full production suite: 101 passed across Chromium/Firefox/WebKit, one documented unsupported Firefox mobile-emulation case skipped. Both WebKit focus regressions passed in the full run.
