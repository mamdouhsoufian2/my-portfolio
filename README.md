# Soufiane Mamdouh portfolio

The portfolio remains a static HTML/CSS/JavaScript site. Only the animated
logos beside About Me use React. The generated assets are committed so the
site still works with a simple static server, including `py -m http.server`.

## Edit the animation

```sh
npm install
npm run build
```

- `src/about-logos.jsx`: logo list and animation controls.
- `src/components/OrbitingCircles.jsx`: reusable React orbit component.
- `src/about-logos.css`: responsive logo cards and animation styling.
- `assets/img/logos/`: the three supplied, unmodified logo images.

Use `npm run watch` to rebuild component assets as you edit. Serve the project
folder in another terminal, for example with `py -m http.server 8000`.

The component is adapted from Magic UI's Orbiting Circles on 21st.dev.
See `THIRD_PARTY_NOTICES.md` for its source and MIT license.

## Deployment

Vercel builds the component with `npm ci` and `npm run build`, then serves
the static site from `dist/`. The existing GitHub integration deploys pushes
to `main`.
