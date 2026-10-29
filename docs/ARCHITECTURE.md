# Architecture

App owns three independent state domains: window state inside Desktop, ByteWire session above the window lifecycle, and incident state in a separate pure reducer/context. No backend or persistent storage is needed.

Window array order is stacking order. Open restores and raises one instance per app; focus raises visible windows; close/minimize chooses a visible fallback. Movement and viewport changes clamp positions. Maximize preserves restore coordinates. Compact screens fill the workspace. An active simulation reserves its own control strip above the taskbar so global reset/exit never cover title controls.

ByteWire uses typed fictional files and local filtering. The reducer gates operations on consent and inspection/download prerequisites. A session revision remounts transient client UI after reset/exit, clearing stale confirmation forms and drafts without changing desktop windows.

The independent incident reducer models clean, downloaded, infected, contained, remediating and recovered stages. Execution requires explicit UI confirmation and a consent-enabled downloaded file. Ending the process stops symptoms; disabling startup prevents persistence; quarantine requires containment. A recovery achievement requires process stopped, startup disabled, executable quarantined, clean scan, then simulated reboot. Reboot with enabled persistence and available source reinfects. The event log is bounded to 60 entries. Evidence is deduplicated.

Task Manager, Startup Manager, ByteDefender, Event Viewer and Incident Report are views over this shared state. InfectionEffects exists only while the fake process runs. A cleaned-up four-second timer escalates to at most three recurring in-page warnings. Warning dismissal preserves keyboard focus; Hide pop-ups suppresses distractions until restored. A reboot key remounts the effect cycle. Wallpaper, rogue shortcut and simulated CPU/tray reflect the same process flag. Compact screens reserve a 44px strip; floating warnings suppress when they would cover the active window. No flashing, browser dialogs or real side effects. Global exit clears both simulation domains and opens ByteWire's consent screen; it does not close portfolio windows. Recovery automatically opens the report.

Portfolio content is typed and sourced from Keith's existing portfolio and stated background. CSS variables and Window.module.css implement original period-inspired controls; icons are original CSS. The browser runtime makes no external requests beyond static assets, unless the visitor follows an outbound portfolio link.

The release artifact is static dist. amplify.yml selects Node 22, installs the lockfile and builds dist. No routes or SPA rewrite are needed. GitHub Actions runs quality checks and three browser engines; it has not run remotely. Public AWS hosting and submission remain approval-gated.
