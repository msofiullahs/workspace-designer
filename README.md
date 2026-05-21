# Workspace Designer — monis.rent

An interactive workspace designer for [monis.rent](https://monis.rent) — design and rent the perfect Bali co-working setup.

## The Challenge

Built for the Desent Solutions developer challenge: a visual, fun experience where users design their perfect workspace and rent it through monis.rent. The brief emphasised user-centric design — "it should feel good to use" — over algorithmic complexity, so that is what I optimised for.

## Features

- **3 desk options** (Minimal, Standing Desk Pro, L-Shape Corner) — each rendered as a distinct SVG shape in the preview
- **3 chair options** (Ergonomic Pro, Executive, Drafting Stool) — also unique SVGs with their own silhouette
- **10 accessories** across Tech / Lighting / Decor / Audio / Org categories, with per-item quantity limits
- **Live visual preview**: monitors stack on the desk, plants line the floor, lamps glow, the chair gently floats — the scene composes itself as you click
- **Running monthly total** pinned in the header so users always know the cost
- **localStorage persistence** so refreshes don't lose your build
- **Checkout summary** with a direct CTA to monis.rent
- **Fully responsive** (mobile and desktop) with `prefers-reduced-motion` respected
- **Keyboard / a11y friendly** controls (real `<button>` elements, aria labels on quantity steppers)

## Tech Stack

- **Next.js 14** (App Router) — required by the brief
- **TypeScript** — strict mode
- **Tailwind CSS** — required by the brief, with custom keyframes for the float / fade / slide-up animations
- **Inline SVG** for the desk and chair illustrations — sharp at any size, zero asset weight, no CDN dependency
- **Vercel** — hosting

No state library, no animation library, no UI kit. The whole page is one focused component plus two small SVG helpers.

## Approach

The brief asked for something user-centric, not feature-complete, so I focused on the *feel*:

1. **Distinct SVG illustrations** instead of photos or pure emoji — the standing desk has a visible riser column, the corner desk is actually L-shaped, the executive chair has a tall back and armrests. Selecting feels meaningful because the preview visibly *changes*.
2. **Composable scene** — monitors stack on the desk, lamps glow with a soft `box-shadow`, plants line the floor, the whiteboard hangs on the wall. Every accessory has a designated slot (`desk-top` / `desk-front` / `floor-left` / `floor-right` / `wall`) and the preview just renders them where they belong.
3. **Tropical color palette** — teal/emerald background, amber sand, warm wood tones for the desks. The Bali sun glows in the corner. The chair has a subtle float animation.
4. **Persistence** — the configuration is saved to `localStorage` so a refresh or accidental close doesn't lose work. Hydration is guarded to avoid SSR mismatch.
5. **Always-visible total** — the header shows the running monthly cost so users feel in control of the budget.
6. **Disabled CTA pattern** — the checkout button stays visible but disabled until both a desk and chair are picked, with clear text explaining what's needed.
7. **One-click reset** — small "Reset" link near the selection summary lets users start over without hunting through menus.

## What I'd Improve With More Time

- **Real product photos** from monis.rent (the SVGs are a decent placeholder but real imagery would close the gap)
- **Drag-and-drop accessory placement** so users can position monitors / plants / lamps where they want, not just where I decided
- **Shareable URL** encoding the config in the querystring so users can show a friend
- **3D / isometric preview** using `react-three-fiber` for a "wow" moment
- **Live inventory and pricing** from a monis.rent API instead of hardcoded values
- **Budget slider** that highlights options within range
- **Save / name multiple configurations** for users designing several desks

## Running Locally

```bash
git clone https://github.com/msofiullahs/workspace-designer.git
cd workspace-designer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Push to GitHub and connect to Vercel, or use the CLI:

```bash
npx vercel --prod
```
