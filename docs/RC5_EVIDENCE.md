# RC5 desktop authenticity and reboot evidence

Scope: ByteGeist OS 2000 only, on local branch release/0.1.0. Existing published portfolios were not edited. Nothing published, deployed or submitted.

## Delivered

- Select/double-click/Enter/touch shortcuts; bounded drag and Arrange Icons.
- Eight resize edges/corners, stored restore rectangles, keyboard move/resize, title double-click and system menu.
- Taskbar launch order independent of focus order, task context actions, Show Desktop and month calendar.
- Run command whitelist with errors, session Notepad save/reopen, applied/cancelled backgrounds.
- Virtual shutdown and shared staged reboot: shutdown, black screen, BIOS-style check, branded startup, loading settings, desktop. Skip executes the same completion.
- Recovery reboot closes windows and cancels incomplete transfers. Completed files, saved notes and startup settings survive; unsafe startup reinfects at sign-in. Clean recovery still requires its verification scan before reboot.

## Evidence and limits

Fresh lint, strict type checks, 33 unit/component tests and production build passed. Independent read-only source review found no actionable issues. Screenshots capture production preview at 1440 x 900. First full browser run had 115 passes, one unsupported Firefox touch skip and one Firefox 320px timeout under six-worker load. Its complete four-size ByteWire file passed with one worker. A final complete three-worker run is recorded below when complete.

The virtual reboot is about four seconds and skippable. It only restarts the fictional desktop, never the actual computer. Notes/settings last within the current tab session; page refresh clears them. No startup sound. Physical-device and screen-reader sessions remain pending. AWS hosting and submission evidence remain pending confirmation.
Final production run: 119 passed, 1 skipped (unsupported Firefox touch emulation), 0 failed, across Chromium/Firefox/WebKit with three workers. All six desktop-authenticity browser scenarios passed on each engine, including pointer resize/drag and each timed boot stage.
