<div align="center">

<br />

# Dev Raval — Portfolio

**Software Developer & Flutter Engineer**

Building scalable, AI-powered mobile applications that solve real-world problems.

<br />

[![Live](https://img.shields.io/badge/Live-portfolio.devraval.dev-38bdf8?style=flat-square)](https://portfolio.devraval.dev)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br />

</div>

---

## Overview

Personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Designed with a dark space aesthetic, fluid typography, and full accessibility support across every screen size.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Animation | Framer Motion |
| Font | Inter via `next/font/google` |
| Icons | React Icons |
| OG Image | Auto-generated via `next/og` |

---

## Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css               # Design system & utilities
│   │   ├── layout.tsx                # Root layout, fonts, SEO metadata
│   │   ├── page.tsx                  # Entry point
│   │   └── opengraph-image.tsx       # Auto-generated OG image (1200×630)
│   │
│   └── components/
│       ├── sections.tsx              # All page sections & UI components
│       ├── navigation.ts             # Section definitions
│       ├── portfolio.ts              # TypeScript interfaces
│       ├── useActiveSection.ts       # Intersection Observer nav tracking
│       ├── useFocusTrap.ts           # Focus trap for mobile menu
│       ├── useIsMobile.ts            # Mobile detection via MediaQuery
│       ├── usePrefersReducedMotion.ts
│       └── useScrollLock.ts
│
├── tailwind.config.ts                # Custom tokens, shadows, gradients
└── package.json
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/DevRaval2604/portfolio.git
cd portfolio

# Install
npm install

# Develop
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
# Build for production
npm run build
npm run start
```

---

## Configuration

**VS Code — suppress Tailwind warnings**

Create `.vscode/settings.json`:

```json
{
  "css.validate": false,
  "css.lint.unknownAtRules": "ignore"
}
```

**`tsconfig.json` — path aliases**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Design Tokens

| Token | Value |
|---|---|
| `background` | `#060810` |
| `gradient-title` | `135deg — cyan → violet → emerald` |
| `shadow-glow-cyan` | `0 0 28px rgba(56,189,248,0.40)` |
| `shadow-glow-purple` | `0 0 28px rgba(129,140,248,0.40)` |
| `shadow-card` | `0 8px 40px rgba(0,0,0,0.45)` |

---

## Accessibility

- Skip to content link for keyboard users
- `aria-current="page"` on active nav item
- `aria-live="polite"` on typewriter text
- Focus trap on mobile menu (Tab / Shift+Tab / Escape)
- `focus-visible` outlines — shown for keyboard, hidden for mouse
- `prefers-reduced-motion` respected — all animations disabled gracefully
- Safe area insets for notched iPhones and Android cutouts

---

## License

© 2026 Dev Raval. All rights reserved.

---

<div align="center">

[portfolio.devraval.dev](https://portfolio.devraval.dev) · [GitHub](https://github.com/DevRaval2604) · [LinkedIn](https://linkedin.com/in/devraval2604)

</div>