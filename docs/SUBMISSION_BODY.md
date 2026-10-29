### Before my first PC, there was a television

My internet journey started on WebTV: Talk City chat rooms and terrible homemade HTML websites built using a television. A year or two later, I got my first desktop PC, discovered mIRC, and spent much of my twenties in chat rooms, learning about computers along the way.

Technology stayed my hobby and passion while baking became my profession. I started bakery work at 16 through my mom's connection. Now, at 46, I'm studying software engineering at Western Governors University and working toward a career in technology.

ByteGeist OS 2000 brings those beginnings together as a working browser-based portfolio. The Windows 98/2000-inspired desktop is the setting for my story, projects, and an optional troubleshooting experience.

[Open the live portfolio](https://main.d17okimdsll7tw.amplifyapp.com/)

[View the source repository](https://github.com/kcasko/bytegeist-os-2000)

### Try the personal fun fact in under a minute

1. Open the portfolio and choose **Discover my first internet** in the Welcome window. A hover or keyboard-focus hint describes the interactive trip back to WebTV.
2. Choose **Connect** on the TV-shaped screen. Watch the simulated connection sequence or skip it.
3. Open **my first homepage** to discover my WebTV beginnings. Try the color buttons to improve, or ruin, the design.
4. Use the remote to explore the chat-room memories and where that interest has taken me today.

WebTV Memories is an original recreation of a personal memory, not an archived page or a real connection. The visitor controls the reveal. Reduced-motion users bypass the loading sequence, and visitors can close the window or open Projects at any time.

<Image url="https://prod-assets.cosmic.aws.dev/a/3LO7AYGTsAQ7EDxfsZdOgSe2fL4/03-w.webp?imgSize=1280x720" alt="WebTV Memories reveals that Keith built his first websites on a television, with interactive color buttons and a TV remote." caption="The interactive personal fun fact on the live site: connect, reveal my WebTV beginnings, change the colors, and explore the memories." />

### ByteWire: question that download

My second optional experience recreates another familiar part of that era: a suspicious file in a fictional P2P client.

Visitors explicitly enter ByteWire, search for files, watch a transfer, and open the completed item through ByteWire or Downloads. Inspecting its properties can reveal the executable extension before anything happens. A separate security warning gives visitors another chance to stop.

Choosing to run the file starts a simulated infection: rogue warnings, changed wallpaper, an unwanted shortcut, and fictional CPU activity. These interruptions are deliberate parts of the opt-in game. Exit/reset controls, Hide pop-ups, Start, and the taskbar remain available.

Recovery requires more than closing the warnings. Visitors use Task Manager, Startup Manager, ByteDefender, and Event Viewer to stop the process, disable persistence, quarantine its source, scan, and reboot. Leaving the startup entry enabled brings the symptoms back after restart. A verified recovery produces an incident report and the **I Survived ByteWire** achievement.

The game demonstrates a troubleshooting habit I value: investigate the cause, apply a fix, and verify that it stays fixed. All files, processes, scans, and infections are simulated inside the page. Nothing executes on the visitor's computer or accesses their files.

<Image url="https://prod-assets.cosmic.aws.dev/a/3LO7DqWBTfVvm5y5wF3BUX1G9lK/06-b.webp?imgSize=1280x720" alt="ByteWire fictional infection on the live portfolio, with Task Manager, a rogue warning, and permanent exit and reset controls." caption="ByteWire is an opt-in troubleshooting game. All infection symptoms and processes are simulated inside the page." />

### A portfolio visitors can navigate without playing

About Me, Skills, and Projects are directly available from the Welcome window, desktop shortcuts, and Start menu. Project case studies explain the problem, approach, and outcome, with links to my existing technical work. Neither interactive experience is required to reach them.

The desktop includes movable and resizable windows, a taskbar, Start menu, Notepad, Downloads, display settings, and a staged virtual reboot. Windows adapt when the browser shrinks or grows. A plain-HTML summary keeps the core portfolio information available if JavaScript fails to load.

### How I built and hosted it

The application uses React, TypeScript, Vite, and custom CSS. Vitest and Testing Library cover component and state behavior; Playwright exercises the desktop and both interactive experiences.

AWS Amplify Hosting serves the static production build over HTTPS from a separate app in **us-east-1**. This release uses a manual ZIP upload. The build runs locally with Node.js 22, and GitHub stores the source and runs automated quality checks. Automatic deployment from GitHub is not configured. The repository includes an amplify.yml for a future connected build.

The deployment flow is:

**Source → local checks and Vite build → portable ZIP → AWS Amplify Hosting → visitor's browser**

The deployed app does not require a database, authentication service, or backend. Simulated game state stays in memory for the current page session; refreshing starts over. My existing sites and DNS were left untouched.

<Image url="https://prod-assets.cosmic.aws.dev/a/3LO77zWeAXar7Go5wDerCFhcoVn/05-a.webp?imgSize=1536x606" alt="AWS Amplify console showing ByteGeist OS 2000 deployment 2 as Deployed, with its public HTTPS domain." caption="Actual AWS Amplify console: successful manual static deployment, October 29, 2026. Account header excluded from the capture." />

### What was harder than I expected

**Making an old desktop usable today.** Small browser windows, rotation, keyboard focus, and overlapping windows exposed problems that a single desktop screenshot could not reveal. Testing led to preferred-size recovery when the viewport grows, clearer focus behavior, and visible feedback for actions that cannot yet proceed.

**Making recovery mean something.** Closing a popup or ending a process should not count as fixing persistence. I separated symptoms, startup behavior, quarantine, scanning, and reboot verification so that the incident has a consistent cause and outcome.

**Deploying successfully versus loading successfully.** My first ZIP contained Windows backslashes in asset paths. Amplify reported deployment success, but the live site returned 404s for JavaScript and CSS. I wrote a packaging script that uses forward slashes, redeployed, and verified the assets and browser behavior. A green deployment status was only the beginning of verification.

### Verification and lessons learned

GitHub Actions passed lint, type checks, the production build, 37 unit/component tests, and 163 browser tests. Two unsupported Firefox touch-emulation cases were skipped. The full browser suite also passed against the public Amplify URL. Coverage includes Chromium, Firefox, WebKit, narrow viewports, reduced motion, keyboard interactions, and the prevention, reinfection, and recovery routes. Physical-device and screen-reader sessions have not been completed.

The most useful lesson was that a creative interface still has to communicate clearly. Labels, focus, feedback, and escape routes matter as much as the nostalgic details. I also learned to check the deployed experience itself instead of treating a successful upload as proof that everything works.

I developed this individual project with coding-agent assistance, directing the concept and iterating through implementation, QA feedback, and deployment. The story and design decisions reflect my own experience. WebTV and Windows are inspirations; this is an original browser portfolio, not a Microsoft product or an operating-system emulator.
