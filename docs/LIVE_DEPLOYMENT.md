# Public release: ByteGeist OS 2000

Published October 29, 2026 after Keith approved GitHub publication and a new Amplify deployment. The contest entry has not been submitted.

- Live URL: https://main.d17okimdsll7tw.amplifyapp.com/
- Repository: https://github.com/kcasko/bytegeist-os-2000
- Deployed application source: a7c04e1d479f2cf9831989c3949f54ad14bc66d8
- AWS region: us-east-1
- Amplify app: bytegeist-os-2000 / d17okimdsll7tw
- Branch: main; platform: WEB; deployment job: 2
- Successful deploy completed: October 29, 2026 at 21:07:39 UTC (5:07 PM Eastern).
- AWS console: https://us-east-1.console.aws.amazon.com/amplify/apps/d17okimdsll7tw/branches/main/deployments/2
- GitHub Actions: https://github.com/kcasko/bytegeist-os-2000/actions/runs/40954491729

## What is configured

This is a manual Amplify Hosting deployment of a locally verified static build. The app is not connected for automatic deploy-on-push. GitHub Actions runs npm ci, lint/types/unit tests/build, installs Playwright browser dependencies and runs the browser suite. amplify.yml is included for a future connected build but was not the mechanism used for this manual upload.

No backend, database, authentication service, custom-domain purchase or DNS changes were added. Hosting storage and traffic follow the account's AWS pricing. casko.dev, bytespace.casko.dev and their DNS were not altered. The existing Support Lab Amplify app still reports its original October 11 deployment.

## Deployment lesson

Job 1 reported deployment success, but live checks found JavaScript and CSS 404s. PowerShell Compress-Archive had placed backslashes in ZIP asset entry names. Job 2 used scripts/package-site.ps1, which explicitly writes forward-slash paths and index.html at the archive root. The live JS and CSS now return 200 with text/javascript and text/css content types.

Uploaded portable artifact SHA-256: C381204CF66BDACBD8AA01D38BC3E0AD2C15C123A03173BE21E7951CB37001B1.

## Updating the site

1. Make changes, run npm run check and appropriate browser tests.
2. Commit and push to GitHub main; inspect the quality workflow.
3. Build dist, then run ./scripts/package-site.ps1 -OutputPath a-new-site.zip in PowerShell 7. The output file must not already exist.
4. Upload that ZIP to this existing Amplify app/branch using the console or CreateDeployment, upload the returned zipUploadUrl, then StartDeployment with its jobId.
5. Verify the HTML, JS/CSS status and content types, then the interactive features on the live URL. A successful deployment job alone does not establish usability.

## Evidence and remaining submission work

The task outputs contain a live desktop screenshot, AWS deployment evidence and logs. These are genuine records of the new app. The browser available for console screenshots is signed out, so an AWS console screenshot is still pending; do not mislabel an API record or live-site screenshot as a console setup view.

Physical-phone testing, screen-reader review, student/profile eligibility confirmation, final entry review and submission remain pending. Publication approval does not imply challenge submission approval.

GitHub Actions completed successfully for the deployed source commit: lint, types, build, 37 unit/component tests and 163 browser tests passed; two unsupported Firefox touch cases were skipped. The complete browser suite was also run against the live Amplify URL; its final Playwright result is passed with no failed tests. Physical devices and screen readers remain untested.

