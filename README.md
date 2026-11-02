# Portfolio

Personal site of Arman Naseri Far, with case studies for NEXTRIBE, Parsilon Part, armap and Jetaime.

**Live site:** https://armannss.github.io/portfolio/

## Stack

React, TypeScript, Vite and Tailwind CSS, with self-hosted Onest and JetBrains Mono fonts. The opening project graph is drawn on a canvas.

## Run it

You need Node.js 20 or later and pnpm.

```bash
pnpm install
pnpm dev
```

## Build and publish

```bash
pnpm build
```

The build type-checks the code, then prerenders the page into `docs/`. GitHub Pages serves `docs/` from the `main` branch, so commit that folder with your changes.

## Layout

- `src/App.tsx`: page sections and copy
- `src/components/ProjectGraph.tsx`: the live project graph
- `src/index.css`: global styles and the Jetaime awning and shelf
- `public/`: screenshots and the CV
- `scripts/build.mjs`: build and prerender step
