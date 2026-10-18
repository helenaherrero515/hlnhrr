<p align="center">
  <img src="public/icons/hln.svg" alt="HLN yellow brick logo" width="160">
</p>

<h1 align="center">HLN</h1>

<p align="center"><b>An endless appetite for the unknown.</b><br>
Helena Herrero's interactive portfolio: projects, experiments, and creative work,<br>
built around a love of learning and a world of colorful bricks.</p>

<p align="center">
  <img alt="Next.js 15" src="https://img.shields.io/badge/Next.js-15-111111?style=flat&logo=nextdotjs&logoColor=white">
  <img alt="React 19" src="https://img.shields.io/badge/React-19-149ECA?style=flat&labelColor=20232A&logo=react&logoColor=white">
  <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&labelColor=1E3A5F&logo=typescript&logoColor=white">
  <img alt="Three.js: interactive 3D" src="https://img.shields.io/badge/Three.js-interactive%203D-FFD900?style=flat&labelColor=171900&logo=threedotjs&logoColor=white"><br>
  <img alt="Motion: GSAP and Lenis" src="https://img.shields.io/badge/Motion-GSAP%20%2B%20Lenis-88CE02?style=flat&labelColor=243018">
  <img alt="Hosting: Cloudflare Pages and Workers" src="https://img.shields.io/badge/Cloudflare-Pages%20%2B%20Workers-F38020?style=flat&labelColor=402A19&logo=cloudflare&logoColor=white">
  <img alt="Guestbook: shared SQLite storage" src="https://img.shields.io/badge/Guestbook-shared%20SQLite-38C4AD?style=flat&labelColor=16483F">
</p>

<p align="center">
  <a href="https://hlnhrr.pages.dev">Visit HLN</a> ·
  <a href="#what-you-can-explore">Explore</a> ·
  <a href="#quick-start">Quick start</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="docs/README.md">Docs</a>
</p>

<div align="center">
  <table>
    <tr>
      <td align="center">
        <br>
        🟨 🟧 🟩 🟦 🟥 🟦 🟩 🟧 🟨
        <h2>📖 READ!</h2>
        <b>on Medium now</b><br>
        <sub>A story about bricks, becoming, and not knowing what comes next.</sub>
        <br><br>
        <a href="https://medium.com/@helenaherrero515/even-the-bricks-didnt-know-what-they-would-become-3b1eba78e7c6">
          <img alt="Read on Medium" src="https://img.shields.io/badge/Read%20on%20Medium-Even%20the%20Bricks%20Didn't%20Know-FFD900?style=for-the-badge&labelColor=171900&logo=medium&logoColor=FFD900">
        </a>
        <br><br>
        <a href="https://medium.com/@helenaherrero515/even-the-bricks-didnt-know-what-they-would-become-3b1eba78e7c6">medium.com/@helenaherrero515/even-the-bricks-didnt-know-what-they-would-become</a>
        <br><br>
        🟨 🟧 🟩 🟦 🟥 🟦 🟩 🟧 🟨
        <br><br>
      </td>
    </tr>
  </table>
</div>

## About

HLN is the personal portfolio of **Helena Herrero**, a BS Computer Science student at **PUP Manila (2025–2029)**. A start in high-school robotics grew into an interest in data science, AI and machine learning, cybersecurity, cloud computing, and design.

The brick theme makes the portfolio something to explore, not just read. Projects become building blocks, a 3D scene assembles as you scroll, and visitors can build something of their own before leaving a note.

## What you can explore

- **The build:** a brick-letter hero and a scroll-driven Three.js scene.
- **Projects:** GuidHer, Tinig, Lingap, Gising, PurifAI, and Convex, with project details and links.
- **Experience:** organization roles, internships, volunteering, hackathons, and education.
- **Creative work:** publication materials, event merchandise, and design galleries.
- **The playground:** choose brick colors and sizes, place and rotate pieces, undo changes, and export a personalized 1080 × 1920 PNG.
- **The guestbook:** leave a note through a BMO-inspired console. Confirmed notes are shared across devices and refresh every five seconds while the page is visible.
- **Personal touches:** light and dark themes, reduced-motion support, and responsive layouts.

## Quick start

Use **Node.js 22+**, npm, and a modern browser. WebGL is needed for the 3D scene and playground.

```bash
git clone https://github.com/helenaherrero515/hlnhrr.git
cd hlnhrr
npm ci
npm run dev
```

Open **http://localhost:3000** for frontend development. The Next.js development server alone does **not** run the Cloudflare guestbook API.

### Run the full site with the guestbook

```bash
npx wrangler dev
```

Wrangler builds the static export and serves the frontend together with `/api/guestbook`. Open the local URL it prints. Local guestbook data persists in `.wrangler/state` and is separate from production.

### Checks

```bash
npm run validate
```

This runs ESLint, TypeScript checks, and a production build. The GitHub Actions workflow also checks a Cloudflare Workers deployment dry-run.

Before publishing, exercise the playground, PNG export, theme toggle, mobile layout, and cross-device guestbook updates. Do not use real visitor notes as test data.

## How the guestbook works

1. A visitor submits a name and note to the same-origin `/api/guestbook` endpoint.
2. On Pages, a Function forwards the request through the `GUESTBOOK_SERVICE` service binding to the `hlnhrr` Worker.
3. The Worker stores the note in one shared, SQLite-backed Durable Object.
4. The UI reports success only after the server confirms saving. Failed requests keep the draft.
5. Visible pages refresh every five seconds, and refresh again on focus or reconnect.

Both Pages and Workers URLs use the same records. The API displays the latest **50 notes**, ordered by submission. Notes saved only in an older browser-local guestbook are not automatically uploaded; those must be resubmitted.

## Tech stack

| Area | Tools |
| :-- | :-- |
| Application | Next.js 15 App Router, React 19, TypeScript |
| Styling | Custom CSS, brick-themed design tokens, Tailwind CSS 4 |
| 3D and export | Three.js, WebGL, Canvas 2D |
| Motion | GSAP, ScrollTrigger, Lenis, Framer Motion |
| Guestbook | Cloudflare Worker, Durable Objects, SQLite |
| Hosting | Cloudflare Pages and Workers static assets |
| Tooling | npm, ESLint, TypeScript, Wrangler, GitHub Actions |

The deployed app is built from `app/` and `components/`. The root `index.html` is a separate standalone version, not the source of the Next.js export.

## Scripts

| Command | What it does |
| :-- | :-- |
| `npm run dev` | Start Next.js frontend development |
| `npm run build` | Generate the production static export in `out/` |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run validate` | Run lint, typecheck, and build |
| `npx wrangler dev` | Build and run the site with its local guestbook API |
| `npx wrangler deploy` | Build and deploy the Worker, assets, and pending Durable Object migrations |

Use Wrangler to serve the complete static-export application; `next start` is not the production server for this deployment mode.

## Deployment

### 1. Deploy the shared Worker

```bash
npx wrangler login
npx wrangler deploy
```

`wrangler.json` configures the `hlnhrr` Worker, its static assets, and the `GUESTBOOK` Durable Object binding. The `v1` migration creates the SQLite-backed class. No separate KV namespace or database ID is required.

**New Durable Object migrations require `wrangler deploy`.** Apply them before using `wrangler versions upload` for preview versions; an upload alone cannot apply migrations.

### 2. Connect Cloudflare Pages

For **hlnhrr.pages.dev**, configure the Pages project as follows:

| Setting | Value |
| :-- | :-- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | Repository root |
| Service binding, production and preview | `GUESTBOOK_SERVICE` → `hlnhrr` production Worker |

The service binding is managed in Pages settings. `wrangler.json` configures the separate Worker and is intentionally ignored by Pages. Keep `functions/api/guestbook.js` in the repository: it connects Pages to the shared database through that Worker.

For a manual production deployment, run from the repository root:

```bash
npm run build
npx wrangler pages deploy out --project-name hlnhrr --branch main
```

**Keep `main` in sync before the next automatic deployment.** A feature-branch merge or manual upload does not update the production branch's source. Deploying an older `main` can replace newer frontend or guestbook fixes.

## Project layout

```text
app/                 Next.js routes, root metadata, and global styles
components/lego/     Portfolio, 3D scenes, playground, and guestbook UI
constants/           Site identity, SEO, navigation, and shared configuration
data/                Portfolio content
styles/              Brick theme and reusable design tokens
public/              Images, downloadable assets, and HLN icons
functions/api/       Pages proxy for the shared guestbook
worker/              Persistent guestbook Worker and Durable Object
hooks/ · lib/        Shared React hooks and application helpers
utils/ · types/      Utilities and TypeScript models
docs/                Design, content, and implementation references
index.html           Standalone HTML version
wrangler.json        Worker deployment and database binding configuration
```

## FAQ

**What is HLN?**  
Helena Herrero's personal portfolio: a collection of technical projects, creative work, and experiments presented through an interactive brick-inspired interface.

**Are guestbook notes private?**  
No. Submitted names and messages appear in the public guestbook. Do not include sensitive personal information.

**Where is my playground build saved?**  
The build lives in browser memory. Use the PNG export to keep an image; it is generated and downloaded locally rather than uploaded.

**Does the site work offline?**  
It is not an offline app. Shared guestbook reads and writes need a network connection, and some fonts and external resources also depend on internet access.

**Do I need WebGL?**  
The 3D features do. The portfolio's text and project content remain ordinary HTML, but the builder and its export need a working graphics context.

## Author

| GitHub | Name | Focus |
| :-- | :-- | :-- |
| [@helenaherrero515](https://github.com/helenaherrero515) | Helena Herrero | Computer science, data and AI, frontend development, and creative design |

---

© 2026 Helena Herrero. All rights reserved. This personal portfolio is not affiliated with or endorsed by the LEGO Group.
