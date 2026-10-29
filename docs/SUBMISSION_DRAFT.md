# ByteGeist OS 2000

Local draft only. Not submitted. Add approved public repository URL, live AWS URL and actual AWS screenshots after deployment.

## A technical portfolio inside a computer you should not have trusted in 2004

ByteGeist OS 2000 is my original Windows 98/2000-inspired portfolio. Visitors can move windows, use Start, explore projects, read about my transition from bakery work into software engineering, and inspect my skills and credentials.

Its creative feature is ByteWire: a fictional peer-to-peer client with a suspicious music download. Visitors explicitly enter the simulation, watch a transfer complete, and open the file directly or through an Explorer-style Downloads folder. Properties is optional. They can inspect file Properties, spot the final .exe extension, and prevent infection. Or they can confirm a fictional infection: recurring rogue warnings, hijacked wallpaper, an uninvited desktop shortcut, and simulated high CPU. They investigate through Task Manager, Startup Manager, ByteDefender and Event Viewer. The pop-ups are bounded and can be hidden; containment removes the symptoms.

The recovery path models an important distinction: ending a process stops symptoms, while startup persistence can bring them back. Recovery requires stopping the process, disabling startup, quarantining the source, running a clean scan and verifying with a simulated reboot. The final incident report records the actions and evidence, then connects the experience to my real troubleshooting work.

Everything happens in React state. There are no real downloads, executables, scans, browser pop-ups or access to the visitor's computer. Persistent exit/reset controls keep the portfolio usable throughout.

## Engineering and lessons

I used React, TypeScript, Vite, custom CSS, pure reducers, Vitest, Testing Library and Playwright. Window, file-sharing and incident state stay separate. Closing a window does not lose incident progress, and resetting the game does not close portfolio windows. Refresh starts clean.

The trickiest problems were honest recovery verification, small-screen window bounds, keyboard focus, and keeping global simulation controls clear of window controls. Tests caught a stale execution confirmation after reset and a toolbar that covered maximized-window buttons. Both received regression tests. A cross-browser suite exercises prevention and recovery; automated accessibility checks sample the desktop, client and incident views.

## AWS section to complete after approved deployment

Planned service: AWS Amplify Hosting for the static dist build. The repository contains amplify.yml and Node 22 build selection. This draft does not claim that AWS deployment has happened.

Required evidence to add: live URL, GitHub repository, Amplify app/build screenshot, deployment result, desktop/mobile screenshots, prevention/recovery screenshots, and any lessons from the actual AWS deployment.
