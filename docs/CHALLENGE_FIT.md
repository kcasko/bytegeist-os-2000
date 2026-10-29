# Challenge fit audit

October 29, 2026. Compared against Keith's supplied official About/qualification/rubric text and the previously inspected [challenge overview and Rules tab](https://builder.aws.com/build/hackathons/3bff5627-ef21-3bfc-acfc-fce21d39a4f6/aws-student-builder-challenge-build-your-tech-superpower). This is a readiness audit, not organizer approval or proof of eligibility.

## Qualification gates

| Requirement | Evidence / status | Remaining action |
| --- | --- | --- |
| Live public portfolio on AWS Amplify | NOT YET MET. Local production build and amplify.yml exist; no AWS app deployed. | Obtain deployment confirmation, publish a new Amplify app, test live HTTPS URL and preserve it during judging. |
| About Me | MET LOCALLY. Personal background, WGU studies, interests and contact in About Keith. Direct About Me shortcut on Welcome, desktop and Start access. | Recheck live after deployment. |
| Skills / technical superpowers | MET LOCALLY. System Properties includes practical tools, investigative mindset, education and issuer credential links. Direct Skills shortcut on Welcome. | Recheck live after deployment. |
| Projects / achievements | MET LOCALLY. Three case studies with problem, approach, outcome and evidence/live links. Direct Projects shortcut. | Recheck live links after deployment. |
| Interactive creative feature with visible hint | MET LOCALLY. Welcome explicitly calls ByteWire an optional malware recovery game; desktop and Start launch it. Tested prevention and verified recovery routes. | Capture current desktop/client/recovery screenshots. |
| Creative feature does not obstruct navigation | MET LOCALLY. Opt-in plus execution confirmation, independent window/game state, global exit/reset, portfolio accessible during infection. | Maintain these guarantees in live smoke test. |
| GitHub repository link | NOT YET MET. Local Git repository exists. About links to Keith's profile, which is not a substitute for this project's repository. | Publish approved source repository; add its actual URL to site and submission. Do not invent an unverified URL. |
| Project entered under Your project | NOT YET MET. SUBMISSION_DRAFT.md is an unsubmitted local draft. | Add approved site/repo URLs, AWS service details and evidence, then obtain submission confirmation. |
| Portfolio and AWS setup screenshots | PARTIAL. Local portfolio and game screenshots exist. No AWS deployment evidence exists. | Capture genuine Amplify setup/build/deploy screenshots after release. |
| Original, previously unpublished portfolio | SUPPORTED LOCALLY. Separate new source repository and original CSS/icons/interactive implementation; neither existing site was edited or redeployed. Personal biography and own project facts are reused as portfolio content. | Keep truthful publication history; organizer makes final originality judgment. |
| Individual entrant, verified student, age/profile/other eligibility | ACCOUNT CONFIRMATION NEEDED. The project is for Keith; coding-agent assistance is part of the referenced workflow. WGU enrollment in biography is not proof of Builder Center student verification. | Confirm account verification and all Rules conditions before submitting. Do not claim eligibility until verified. |

## Rubric alignment

- **Creativity / 30%:** The distinctive part is the evidence-based prevention/recovery scenario tied to Keith's troubleshooting skills. A retro desktop alone is only one of the event's suggested interfaces. The incident report connects the game back to real technical work.
- **AWS / 25%:** The static build is prepared for Amplify, but this category needs an actual deployed site and AWS evidence. Local testing does not satisfy it.
- **Communication / 25%:** Draft covers the concept, separate reducers, containment versus persistence, test-caught problems and lessons. Add the actual AWS deployment experience and screenshots without claiming unperformed work.
- **Completeness / 20%:** All core sections are present and directly labeled; keyboard/window/mobile flows are tested. Physical-device and screen-reader checks remain manual.

## Changes made during this audit

Added a clearly labeled About Me / Skills / Projects navigation strip to Welcome. Replaced a vague nostalgia sentence with an explicit optional ByteWire recovery-game hint. Added a component regression proving the sections/hint and Skills launch are available. No changes to either existing website, public hosting or submission.

## Verdict

The local application fits the product requirements. It is not yet a qualifying submitted entry. The concrete remaining gates are repository publication/link, public Amplify hosting through judging, actual AWS screenshots/service evidence, account eligibility confirmation and final Your project submission. Public deployment and submission still require Keith's explicit confirmation.

Verification after the local changes: npm run check passed lint, strict application typechecking, 25 unit/component tests and production build. All 26 Chromium browser scenarios passed against production preview. The required navigation labels and game hint were directly checked at 320px and 1440px; the hint is visible without scrolling. Earlier three-engine coverage remains recorded in RECOVERY_RELEASE_EVIDENCE.md.
