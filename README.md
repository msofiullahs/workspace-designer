# Workspace Designer — monis.rent

An interactive workspace designer for [monis.rent](https://monis.rent) — rent the perfect office setup for your Bali co-working experience.

**Live Demo:** https://workspace-designer-nine.vercel.app

---

## The Challenge

Built as part of the Desent Solutions developer challenge: create a cool, visual, fun experience where users design their perfect workspace and rent it through monis.rent.

---

## Features

- 3 desk options (Standing Desk Pro, Minimal Desk, L-Shape Corner)
- 3 chair options (Ergonomic Pro, Executive Chair, Drafting Stool)
- 10+ accessories (monitors, lamp, plants, keyboard, webcam, speaker, whiteboard, etc.)
- Live visual workspace preview that updates as items are added or changed
- Running monthly price calculator always visible in the header
- Checkout/summary view with a direct Rent CTA to monis.rent
- Fully responsive (mobile + desktop)

---

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Vercel (deployment)

---

## Approach

I focused on making the designer feel good to use rather than feature-complete. Key decisions:

1. Emoji-based live preview instead of images — loads instantly, playful, works everywhere, and matches the Bali vibe
2. Teal/amber tropical color scheme inspired by Bali greens and warm sand
3. Three-tab sidebar (Desks / Chairs / Add-ons) keeps the UI clean and scannable
4. Running price total in the header so users always know what they're building towards
5. Checkout page as a full-screen view with a clear CTA to reduce distraction at conversion time

---

## What I'd Improve With More Time

- Real product photos from monis.rent
- Drag-and-drop accessory placement on the preview canvas
- Animated transitions when items appear/disappear
- Saved configurations via localStorage or shareable URLs
- Isometric or 3D workspace visualization
- Integration with monis.rent live inventory/pricing API

---

## Running Locally

```bash
git clone https://github.com/msofiullahs/workspace-designer.git
cd workspace-designer
npm install
npm run dev
```

Open http://localhost:3000 in your browser.
