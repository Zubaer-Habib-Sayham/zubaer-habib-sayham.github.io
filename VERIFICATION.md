# Portfolio verification

## Required release checks

- JavaScript syntax is valid.
- All six case studies open and close; Escape closes the dialog and focus returns to the trigger.
- Project category filters show the correct records.
- All five skill stars select evidence and show completion after exploration.
- Day and night switch and persist through reload.
- Sound begins only after opt-in; mute and volume controls work.
- Reduced motion and companion visibility settings work.
- Mobile navigation opens and closes.
- Desktop and mobile layouts have no horizontal page overflow.
- The CV is a readable one-page PDF with selectable text and working links.
- Published source contains no credentials or machine-specific paths.
- GitHub Pages responds publicly over HTTPS after deployment.

## Release results — 20 October 2026

Passed locally in Chromium at 1440 × 900 and 390 × 844:

- Syntax check, six case-study dialogs, filters, five constellation controls, day/night persistence, opt-in audio and mute, volume, mobile menu, motion and owl preferences.
- Escape closes settings and returns keyboard focus to its trigger; dialogs return focus to their opening button.
- Both viewport sizes have no horizontal page overflow. The hero presents the owner's name and supplied portrait prominently.
- Five decorative branches provide section landing points for the SVG owl. Scrolling activates articulated flight; pausing folds its wings. Reduced motion disables the flight animation.
- The one-page CV was rendered and visually inspected; its text is selectable.
- Source scan found no credentials, machine-specific paths or unwanted tool branding.
- Browser error log was empty during interaction checks.

Public deployment passed over HTTPS at https://zubaer-habib-sayham.github.io/:

- All 20 checked pages and assets returned HTTP 200 and matched the local release, including binary comparison of the CV, fonts and images.
- The public page was opened in the browser and its hero, portrait and navigation were verified.
- The owl's feet and hero branch anchor aligned to within one pixel in the desktop layout.
- Hosting serves static files directly; the portfolio needs no running application server.
