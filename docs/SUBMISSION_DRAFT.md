# ByteGeist OS 2000

Submission draft only. Not submitted. Add the approved repository URL, live AWS URL, AWS screenshots and deployment lessons after publication.

## My first internet, rebuilt as a portfolio

My internet journey started with WebTV, Talk City chat rooms, and trying to build terrible HTML websites using a television. A year or two later, I got my first desktop PC and found mIRC. Computers stayed my hobby and passion while bakery work, which I started at 16 through my mom's connection, became my profession. Now, at 46, I'm studying software engineering at Western Governors University to turn that interest into a career.

ByteGeist OS 2000 is my original Windows 98/2000-inspired portfolio. Visitors can move and resize windows, use Start and the taskbar, and directly explore About Me, Skills, and Projects. Three project case studies explain the problem, approach, outcome, and links to my existing technical work.

## Interactive fun fact: WebTV Memories

The visible Discover my first internet button opens WebTV Memories. Its tooltip says An interactive trip back to WebTV; desktop and Start shortcuts provide additional entry points.

Visitors choose Connect on a TV-shaped screen and watch an original, WebTV-inspired loading sequence. They open a deliberately homemade page to discover that I built my first websites on a television. Color buttons let them improve, or ruin, the page's design. The TV remote and Next memory controls reveal Talk City, mIRC, and my career change.

This is a playful recreation rather than an archived original page or historical chat transcript. Loading is skippable, reduced-motion users go directly online, and powering off cancels the connection. Visitors can leave for Projects at any time; background loading does not pull focus back.

## A second optional experience: ByteWire

ByteWire is a fictional P2P client with a suspicious music download. Visitors explicitly enter the game, search, watch a transfer, and open completed files through the client or Downloads. Properties can reveal the final .exe extension and help prevent infection. Choosing Run on a separate security confirmation starts the fictional incident.

Rogue warnings, hijacked wallpaper, an uninvited shortcut, and simulated CPU load recreate an adware-era desktop. The popups deliberately interrupt this opt-in game. Persistent exit/reset controls, Hide popups, Start and the taskbar remain available.

Visitors investigate with Task Manager, Startup Manager, ByteDefender and Event Viewer. Ending a process contains symptoms; leaving its startup entry enabled causes reinfection after reboot. Verified recovery requires stopping the process, disabling startup, quarantining the source, completing a clean scan and rebooting. The report records evidence and actions and awards I Survived ByteWire.

Everything is simulated inside the page. There are no real downloads, executables, device scans, chat connections or access to the visitor's files.

## Engineering and lessons

I used React, TypeScript, Vite, custom CSS, Vitest, Testing Library and Playwright. Window, download and incident state are separate, so closing a client does not lose a transfer or incident progress. Refresh starts a new session. Notes and background preferences last within the tab session.

The hardest problems were keeping windows usable after viewport changes, preserving keyboard focus, making blocked actions visibly explain themselves, and distinguishing containment from recovery. Browser QA uncovered transfer controls changing under a click, hidden feedback, and lost window placement after a narrow viewport. Regression tests cover those fixes. Desktop dimensions are observed directly, preferred size and position are preserved, and focus checks keep an optional feature from interrupting portfolio navigation.

Local verification covers Chromium, Firefox and WebKit, mobile widths, touch emulation, reduced motion, sampled accessibility checks, and prevention/reinfection/recovery. Physical-device and screen-reader sessions remain pending.

## AWS evidence to add after deployment

Planned service: AWS Amplify Hosting for the static dist build, with source on GitHub. amplify.yml selects Node 22, installs the lockfile, builds and publishes dist. No AWS resource or public repository has been created for this project yet.

Before submission, add the actual live URL, repository URL, AWS app/build/deployment screenshots, desktop/mobile screenshots and lessons from the real deployment. Deploy this portfolio independently; casko.dev and bytespace.casko.dev remain untouched.
