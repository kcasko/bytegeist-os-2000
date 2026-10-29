# Infection effects verification

October 29, 2026. User requested a more convincing fictional infection than one small warning.

Implemented: up to three returning nonmodal in-app warnings, fictional rogue scanner/messenger/helper, wallpaper hijack, rogue desktop shortcut, synthetic 96% CPU/tray indicator, and Infection Activity view. No sound, flashing, native/browser dialogs, real processes, actual CPU load generation or device inspection. Warnings never take focus automatically. Dismissing a warning moves focus to the persistent Hide/Show control.

Containment unmounts the effect component and clears its timer; normal wallpaper/CPU/tray return. Startup persistence can remount the effect cycle after simulated reboot. Exit/reset removes all effects. Hide pop-ups suppresses their display without changing incident state. Maximum three warnings exist at once. Below 1280px an extra reserved 44px activity strip replaces floating warnings; active maximized/overlapping windows suppress floating warnings to protect controls.

Evidence:
- Two new component tests observed red against null effects component, then green.
- Warning-dismissal focus assertion observed red, then green after focus restoration.
- npm run check passed lint, strict application types, all 27 unit/component tests and build.
- Full production browser suite: 83 passed across Chromium/Firefox/WebKit, one unsupported Firefox touch-emulation case skipped.
- New scenarios cover escalation, bounded count, returning dismissal, high CPU indicator, containment clearing symptoms/tray, unsafe reboot returning symptoms, exit clearing timers, compact activity and maximized controls.
- Independent review found no actionable defects. Direct review checks covered 1279/1280px switching, later resize, window bounds, hide/exit cleanup and zero automated WCAG A/AA violations with all three warnings visible.
- Virtual-clock test was tightened to advance each four-second interval separately rather than coalescing an eight-second jump. Focused three-engine recheck records the final result below.

No public publication/deployment or existing-site changes. Local source/static archives and new desktop/mobile screenshots are prepared as RC3; prior RC1/RC2 files remain historical candidates.

Final usability fix: a new browser assertion reproduced End songhelper.exe being below the initial scroll viewport after adding CPU telemetry. A sticky Task Manager action strip made that assertion pass. The final complete suite rerun covers this change. The tightened virtual-clock scenario also passed on all three engines.

Final rerun after the sticky action fix: npm run check passed with 27 tests and no lint/type diagnostics; production suite 83 passed, one documented unsupported Firefox touch-emulation case skipped.
