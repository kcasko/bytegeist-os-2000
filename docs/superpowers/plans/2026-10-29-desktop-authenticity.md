# Desktop authenticity pass

User requests desktop behavior as realistic as practical within the fictional browser OS. Preserve portfolio, consent, transfers, infection and recovery. No public release or access to actual OS/files.

## Acceptance

1. Desktop icons single-select, double-click/Enter open, touch tap open. Arrow-key navigation and pointer repositioning are bounded. Right-click supports Open and Display Properties; desktop context supports Refresh, Arrange Icons, Show Desktop and Display Properties.
2. Window model stores restore rectangle and launch order. Eight-edge/corner resize with minimum size, keyboard size alternative, title double-click, active/inactive focus, and native-style system menu. Viewport resizing keeps controls reachable.
3. Taskbar keeps launch order while z-order changes. Right-click task menus Restore/Minimize/Maximize/Close; Show Desktop toggles visible windows. Date/time tray control opens a functional local calendar view.
4. Run accepts known simulated commands only (taskmgr, msconfig, eventvwr, explorer/downloads, bytewire, notepad, control/display); unknown names show an error. Notepad edits/saves/reopens session-only notes. Display Properties changes fictional wallpaper/color and applies/cancels.
5. Start remains discoverable for required portfolio sections, adds working Run and Shut Down. Shut Down/Restart operate on virtual windows/session only, with explicit in-app choices. Restart preserves completed files and startup game behavior; turning off stops active symptoms, and Start Computer reapplies the preserved startup configuration.
6. Keyboard shortcuts delivered to the page: Escape, Shift+F10 context menus, F5 refresh desktop, Alt+Space active window menu, Ctrl+F6 cycle virtual windows. Do not advertise intercepting OS-reserved Alt+Tab/Alt+F4.

## Implementation order

Write failing reducer tests, then geometry/launch-order/reset/minimize-all/cycle transitions. Build reusable ContextMenu and revised Window. Add DesktopIcons and small shell programs with explicit interfaces; integrate Desktop/Taskbar/Start. Update prior single-click icon tests to the new double-click contract. Add browser tests for resize, selection/drag, context menus, task order, Run, notes, settings, calendar, power, and full game regression. Independent review, three-engine production verification, screenshots and local candidate archive.

