# Authentic simulated download/open workflow

User requested a natural download-to-folder/open flow instead of requiring file inspection.

1. Add deterministic queued transfers with four 500ms progress ticks. Session-level timer survives window minimize/close, stops when complete/cancelled/reset/exited. No network or real download APIs.
2. Completed transfers offer primary Open file and Open Downloads. Incomplete files cannot be opened/inspected; cancellation and retry are supported.
3. Add native Downloads shell app for C:\Downloads, with completed files, file type/size, Open actions, optional Properties and Show filename extensions. Double-click and keyboard controls work.
4. Share optional file Properties/security confirmation panels between client/folder. Open of disguised executable goes directly to an Open File - Security Warning confirmation, without an inspection prerequisite. Run explicitly starts fictional infection; Cancel does not. MP3/text use lightweight simulated viewers. Existing prevention/recovery and global reset/exit remain.
5. Test progress, cancellation, open-before-complete guard, completion with client closed, folder opening without inspection, safe files, consent/reset, keyboard/mobile and full game regression. Review and package locally; no public release.
