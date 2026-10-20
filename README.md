# Zubaer Habib Sayham Portfolio

The personal portfolio of Zubaer Habib Sayham. A fast, static engineering portfolio with a personal introduction and portrait, a subtle day-to-night environment, and an animated owl companion.

**Live:** https://zubaer-habib-sayham.github.io/

## Inside the observatory

- Six detailed project case studies and three additional experiments, with source links and available live demos.
- An interactive constellation connecting interfaces, APIs, data, testing and deployment to real projects.
- Coordinated day and night environments, with the selected mode remembered locally.
- Lumi, an articulated SVG owl that flies between branch perches while visitors scroll, then settles when reading pauses; visitors can hide it.
- Optional, locally synthesized nature ambience. Daytime birds and breeze crossfade into nighttime insects and distant owl tones. Sound starts only after a visitor enables it and pauses in background tabs.
- A downloadable, text-based one-page CV, contact links and compact language proficiency information.
- Responsive navigation, native accessible case-study dialogs, keyboard controls and reduced-motion preferences.

## Run locally

No dependency installation or build is needed. Serve this directory with a static HTTP server. For example:

```sh
python -m http.server 4173
```

Then open http://localhost:4173. An HTTP server is needed because `app.js` is a JavaScript module.

## Edit

- `index.html`: the profile, navigation, About, contact details and metadata.
- `app.js`: project records, skill connections, interactions, owl behavior and the sound engine.
- `styles.css`: layout, typography, animation and day/night colors.
- `assets/`: optimized artwork, self-hosted fonts, portrait and CV.

Project card illustrations are editorial representations; case studies and source links describe the implementations. The portfolio has no analytics, account system, remote audio dependency or backend service. Preferences stay in local storage and are optional.

## Publish

GitHub Pages serves the root of the `main` branch. `.nojekyll` keeps the site buildless. Changes go live after the Pages deployment finishes; no application server needs to wake up.

## Credits and licenses

DM Sans and Cormorant Garamond are distributed under the SIL Open Font License; license files are included in `assets/`. Observatory artwork, the original SVG owl and the personal monogram were created for this portfolio. The portrait was supplied by the owner, with its background removed for the layout. No franchise logos, soundtrack, or branded character assets are used.

## Verification

Run `node --check app.js` for JavaScript syntax. The browser verification checklist and results are recorded in `VERIFICATION.md`.
