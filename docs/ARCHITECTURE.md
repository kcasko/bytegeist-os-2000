# Architecture

Desktop owns transient window state via React useReducer. A typed application registry supplies IDs, names, descriptions and original CSS icon kinds. AppContent renders bounded portfolio views. Window is responsible for the frame and pointer/keyboard interactions; StartMenu owns keyboard navigation; Taskbar owns the local clock and launch/restore controls.

The pure reducer returns new arrays/objects and never mutates input. Array order determines stacking. Open restores and raises a singleton instance. Focus raises a visible window. Close/minimize chooses the highest remaining visible window when active state needs replacement. Move and viewport resize clamp positions; compact layouts use full workspace windows. Maximizing preserves the stored restore coordinates.

CSS variables define shared gray/blue controls; Window.module.css encapsulates frame styling. Icons are original CSS shapes. The blue title-bar gradient follows the period reference. No external fonts, image requests or runtime services.

Future game state belongs in src/game/engine, separate from Desktop state. Only typed user-triggered actions should transition incident stages. ByteWire is currently a static preview. No persistence, actual file downloads, real scanner or external system access.

Decisions: single-click desktop launch for mouse/touch/keyboard consistency; one instance per app; native buttons and navigation rather than pretending to implement a complete operating system accessibility model. Dialogs are non-modal. Narrow viewports fill the available workspace. No window resizing handles in Sprint 0; maximize/restore are supported.

Release is a static dist build. amplify.yml is preparatory and has not been used against AWS. No router or server rewrite is needed yet. CI configuration exists, but remote CI execution awaits a repository remote/push.
