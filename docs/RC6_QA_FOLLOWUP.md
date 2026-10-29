# QA follow-up: RC6

This pass responds to the external browser QA report supplied by Keith. No public deployment, publishing, account changes or edits to the existing portfolio sites.

| Finding | Resolution |
| --- | --- |
| Cancel too fast; changes into Properties | Transfers take approximately five seconds. Cancel, Properties and Open retain separate fixed slots; Cancel disables when complete. |
| Tiny viewport and rotation | Preserve requested window dimensions across clamping; constrain actual windows to desktop size. Tiny-to-desktop and portrait-to-landscape browser checks added. |
| Unsaved Notepad edits | Save / Don't save / Cancel prompt on close, New and Open saved. Save then Open saved preserves current edits. |
| Duplicate download is silent | Explicit already-downloaded/downloading status; no duplicate transfer. |
| Title bar dead zone | Title fills the bar height; remaining title-bar background supports double-click maximize/restore. Resize borders remain draggable. |
| Reset loses incident immediately | Reset confirmation with Cancel, for both global and ByteWire resets. |
| Recovery failures hidden | Scanner status sits alongside controls and scrolls into view when actions produce feedback. |
| Inaccurate startup instructions | Message reflects whether songhelper.exe is still running; event/report text uses the same accurate outcome. |
| Small result click targets | Whole result rows select the file. Keyboard filename buttons retain selection semantics. |
| Transfers initially off-screen | Newly queued transfer list scrolls into view. |
| Stale search status | Search reports the result count. |
| Instant scan | Visible 1.2-second scan phase; completion updates status. Timers cancel on close/reset; reboot waits for completion. |
| Sticky End process covers evidence | Removed sticky overlay; details have scroll spacing and focus highlight. |
| Restart logged as power-off | Separate restart action and event text; scan verification survives. |
| Start too tall | Denser rows and separately pinned Run/Shut Down footer; program list scrolls on short screens. |
| Caption contrast | Explicit dark glyphs on a light gray button. |
| Skills naming | Skills · System Properties on shortcuts and window title. |
| Non-JavaScript readers | Real About Me, Skills, Projects and links in the initial HTML, replaced by React after loading. No hidden crawler-only content. |
| Mobile shortcuts | Added true touch-event single-tap regression with mobile emulation. Physical phone testing remains pending. |
| Run behavior | Smaller window, focused input, close on successful launch; own-key command validation fixes inherited-property crash. |
| Display controls | OK applies and closes; Cancel closes without applying; Apply remains available. |
| Decorative Downloads menu | Removed inert File/Edit/View/Tools text; working toolbar retains Open, Properties, back navigation and extension settings. |
| Notepad icon | Original document icon replaces folder. |

## Deliberate limits and remaining work

Selection remains one file at a time; Ctrl-click multi-selection is not implemented. Recovery utilities remain separate desktop windows, rather than tabs in one shared window. File security confirmation remains an in-app panel. explorer intentionally opens the simulated Downloads folder. Before the opt-in game, recovery utilities show their offline explanation and an entry route. No real OS data is read. Physical touch and screen-reader testing remain pending. No claim is made that a particular judging crawler will render or score the page in a specific way.

AWS deployment, GitHub publication, screenshots of real AWS resources, eligibility checks and final challenge submission remain pending. ByteGeist must be released as its own new Amplify app after confirmation; existing casko.dev and bytespace.casko.dev stay untouched.

## Verification

Fresh lint, strict types, 37 unit/component tests and production build pass. Six initial QA scenarios passed in Chromium; full expanded Chromium/Firefox/WebKit results will be recorded after completion. Independent source review caught and verified the Notepad save/reopen fix and identified the Run inherited-key bug, now fixed with a browser regression.

Final production verification: **145 browser tests passed, 2 skipped, 0 failed** across Chromium, Firefox and WebKit (4.2 minutes). Both skips are Firefox's unsupported mobile emulation. All 37 unit/component tests, strict type checking, lint and the production build passed. Upper title-bar double-click was also checked directly in Chromium. Screenshots show the full Start menu and visible blocked scanner feedback.
