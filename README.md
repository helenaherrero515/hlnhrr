<p align="center">
  <img width="180" src="./assets/hln-logo.png" alt="hln logo" />
</p>

<h1 align="center">Helena Herrero · Brick Portfolio</h1>

<p align="center"><strong>A LEGO-themed, single-page developer portfolio with a 3D brick scene, a scroll-driven build, a brick playground, and a BMO-style guestbook.</strong></p>

<p align="center">
  <strong>Navigation</strong><br />
  <a href="#what-this-is">What this is</a> ·
  <a href="#current-state">Current state</a> ·
  <a href="#run-it-locally">Run it locally</a> ·
  <a href="#whats-included">What's included</a> ·
  <a href="#why-bricks">Why bricks</a> ·
  <a href="#in-the-browser-versus-internet-required">In the browser versus internet required</a> ·
  <a href="#tech-stack">Tech stack</a> ·
  <a href="#known-limitations">Known limitations</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#development-checks">Development checks</a>
</p>

<p align="center">
  <img alt="Live site" src="https://img.shields.io/badge/live-hlnhrr.pages.dev-E3000B?style=flat-square" />
  <img alt="No build step" src="https://img.shields.io/badge/build_step-none-5BB838?style=flat-square" />
  <img alt="Three.js r128" src="https://img.shields.io/badge/Three.js-r128-2AA7F2?style=flat-square" />
  <img alt="GSAP 3.12.5" src="https://img.shields.io/badge/GSAP-3.12.5-FFB400?style=flat-square" />
  <img alt="Hosted on Cloudflare Pages" src="https://img.shields.io/badge/hosted_on-Cloudflare_Pages-334155?style=flat-square" />
</p>

<p align="center">
  <img width="100%" src="./docs/img/portfolio-demo.gif" alt="Portfolio demo" />
</p>

## What this is

This is the portfolio of Helena Herrero, a BS Computer Science student at PUP Manila (2025–2029) who got into tech through robotics research in high school and now focuses on data science, AI, and machine learning. The site is built around one idea: curious first, then build it, break it, fix it, and build it better.

The whole site is a single HTML file. Loose 3D bricks fly in and assemble as you scroll, the name is built out of bricks, and every card, button, and tag borrows the same stud-and-shadow look. Visitors can also build their own LEGO model in the playground and download it as an Instagram-story PNG.

Live site: **[hlnhrr.pages.dev](https://hlnhrr.pages.dev)**

## Current state

> [!IMPORTANT]
> This is a static site with no backend, no build step, and no package manager. Everything runs in the visitor's browser.

- Sections: Home, About, Work, Skills, Experience, Designs, Play, Git, and Contact.
- Light and dark mode, following the system setting until the visitor picks one.
- Mobile-first layout, with a scrolling nav and touch-friendly playground controls.
- Respects `prefers-reduced-motion`.
- The guestbook is stored on the visitor's own device only (see [Known limitations](#known-limitations)).

## Run it locally

Prerequisites: a modern browser with WebGL enabled and an internet connection (the libraries and fonts load from CDNs). Node.js is optional and only needed if you want a local server.

Open `index.html` directly in your browser, or serve the folder:

```bash
npx serve .
```

Then open the address it prints (usually `http://localhost:3000`).

There is nothing to install and nothing to compile. Edit the file, refresh the page.

## What's included

- **Brick hero:** the name "HELENA HERRERO" is built out of CSS bricks. Loose 3D bricks start off-screen and fly in as you scroll.
- **Scroll-driven build:** a Three.js scene assembles a LEGO build as the page scrolls, with Lenis smooth scrolling and GSAP ScrollTrigger.
- **About, Skills, and Technical Skills:** a brick-wall skills section and seven grouped cards (languages, frontend, data and ML, visualization and BI, blockchain, design and tools, others).
- **Projects:** GuidHer, Tinig, Lingap, Gising, PurifAI, and Convex.
- **Experience:** organizations, internships, volunteering, hackathons, and academics.
- **Designs:** a gallery for publication materials, swag designs, and presentation decks.
- **Playground:** a 3D brick builder where visitors pick colors and sizes, place, turn, and undo bricks, and save their work as a 1080×1920 PNG made for Instagram stories. The PNG shows their name ("name's work"), "YOUR TURN TO BUILD WITH ME", and the site link.
- **BMO guestbook:** a note form styled after BMO from Adventure Time, with a log of notes saved on the visitor's device.
- **Ticker:** a scrolling strip of focus areas (Machine Learning, Artificial Intelligence, Automation, Software Development, Cloud Computing, AI Workflows, UI/UX, Product Designer).

## Why bricks

A portfolio is mostly a list of things someone built. The LEGO theme makes that literal: every project is a brick, and the page itself gets built as you scroll. The playground lets visitors build something of their own before they leave, so the site is something you play with and not only read.

The design is a theme, not a gimmick that blocks content. All text is real HTML, the site works without the 3D scene (the builder shows a message if WebGL is off), and animation is reduced for visitors who ask for less motion.

## In the browser versus internet required

### Runs in the browser today

| Capability | Current behavior |
| --- | --- |
| Page content and layout | Static HTML, CSS, and JavaScript in a single file. |
| Theme (light or dark) | Saved in the browser's `localStorage` under `hln_brick_theme`. |
| Guestbook notes | Saved in the browser's `localStorage` under `hln_brick_notes`; never sent anywhere. |
| Playground builds | Built and held in memory in the visitor's browser. |
| PNG export | Drawn with the Canvas 2D API and downloaded locally; nothing is uploaded. |

### Requires internet

| Activity | Current requirement |
| --- | --- |
| Loading Three.js, GSAP, ScrollTrigger, and Lenis | Loaded from cdnjs and jsDelivr when the page opens. |
| Loading fonts | Pixelify Sans, DM Mono, Nunito come from Google Fonts. |
| Hosting and deployment | Cloudflare Pages and GitHub need a network connection. |

## Tech stack

| Layer | Choice |
| --- | --- |
| Markup and styling | HTML5 and CSS3 (custom properties, grid, flexbox, `color-mix`) |
| Scripting | Vanilla JavaScript (ES2020), no framework |
| 3D | Three.js r128 (cdnjs) |
| Animation | GSAP 3.12.5 and ScrollTrigger (cdnjs) |
| Smooth scrolling | Lenis 1.1.20 (jsDelivr) |
| Fonts | Pixelify Sans, DM Mono, Nunito (Google Fonts) |
| Image export | Canvas 2D API |
| Storage | `localStorage` |
| Hosting | Cloudflare Pages |

Prerequisites for development:

- A code editor such as VS Code.
- A modern browser with WebGL (Chrome, Edge, Firefox, or Safari).
- Git and a GitHub account.
- Node.js (optional), for `npx serve`.
- An image tool such as Squoosh to compress images to WebP.

## Known limitations

- The guestbook saves notes only on the visitor's own device, so notes are not shared between visitors and I cannot read them. A shared guestbook would need a backend (for example Cloudflare Workers with KV or D1).
- The 3D scene and the playground need WebGL. Without it, the builder shows a message and the PNG export is unavailable.
- The page depends on CDN-hosted libraries and fonts, so it does not work fully offline.
- The PNG export waits for the fonts to load, so test it online.
- Pinned library versions are older releases (Three.js r128); upgrading them may need small code changes.

## Deployment

The site is deployed on Cloudflare Pages at [hlnhrr.pages.dev](https://hlnhrr.pages.dev).

1. Push the repository to GitHub.
2. In Cloudflare Pages, connect the repository.
3. Leave the build command empty and set the output directory to the repository root.
4. Every push to the main branch redeploys the site.

## Development checks

There are no automated tests. Before publishing, check these by hand:

- The page loads with no console errors.
- No horizontal scroll at 360px, 768px, and 1280px widths.
- The light and dark toggle works and is remembered after a reload.
- The playground places, turns, undoes, and clears bricks.
- "Save my work" downloads a PNG that shows the build, the name, and the site link.
- The guestbook saves and shows a note after sending.
- Every link points to a real address (no placeholder `#` links).

---

© 2026 hln. All rights reserved.
