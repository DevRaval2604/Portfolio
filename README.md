<div align="center">

<br />

```
██████╗ ███████╗██╗   ██╗    ██████╗  █████╗ ██╗   ██╗ █████╗ ██╗
██╔══██╗██╔════╝██║   ██║    ██╔══██╗██╔══██╗██║   ██║██╔══██╗██║
██║  ██║█████╗  ██║   ██║    ██████╔╝███████║██║   ██║███████║██║
██║  ██║██╔══╝  ╚██╗ ██╔╝    ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══██║██║
██████╔╝███████╗ ╚████╔╝     ██║  ██║██║  ██║ ╚████╔╝ ██║  ██║███████╗
╚═════╝ ╚══════╝  ╚═══╝      ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝
```

### ✦ Software Developer & Flutter Engineer ✦

*Building scalable, AI-powered mobile applications that solve real-world problems*

<br />

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://framer.com/motion)

[![Deploy Status](https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://devraval.com)
[![License](https://img.shields.io/badge/License-MIT-818cf8?style=for-the-badge)](LICENSE)

<br />

---

</div>

<br />

## ⚡ Overview

This is my personal portfolio — a production-grade, fully responsive web app showcasing my work as a Flutter developer and software engineer. Built with a focus on performance, accessibility, and a premium dark-space design identity.

Every detail is intentional: fluid typography with `clamp()`, hardware-accelerated animations, full keyboard navigation, screen reader support, and a design system that scales from 320px Galaxy Fold to 4K ultrawide monitors.

<br />

## 🖥️ Live Preview

<div align="center">

**[→ devraval.com](https://devraval.com)**

</div>

<br />

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 **Design System** | Custom Tailwind tokens — `bg-gradient-title`, `shadow-glow-cyan`, `shadow-glow-purple` |
| 🌊 **Fluid Typography** | `clamp()` scales text from 320px to 4K — no breakpoint jumps |
| ⚡ **Framer Motion** | Shared `glowAnimate` variables, staggered reveals, reduced-motion aware |
| ♿ **Accessibility** | Skip link, `aria-current`, `aria-live`, focus trap, scroll lock, `focus-visible` |
| 📱 **Responsive** | Works on Galaxy Fold (280px), iPhone, iPad, desktop, ultrawide |
| 🔒 **Safe Areas** | `env(safe-area-inset-*)` for notched iPhones and Android cutouts |
| 🎭 **Typewriter Effect** | Custom hook-based animation with screen reader `aria-live` announcements |
| 🌌 **Floating Particles** | RAF-throttled, capped for ultrawide, fully disabled on reduced-motion |
| 🔗 **OG Image** | Auto-generated branded preview via `next/og` — perfect LinkedIn/WhatsApp cards |
| 🚀 **Performance** | `next/font` for Inter, `willChange` on animations, mobile backdrop optimisation |

<br />

## 🗂️ Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css              # Design system, utilities, safe areas
│   │   ├── layout.tsx               # Root layout, Inter font, SEO metadata
│   │   ├── page.tsx                 # Entry point → Shell component
│   │   └── opengraph-image.tsx      # Auto-generated OG image (1200×630)
│   │
│   └── components/
│       ├── sections.tsx             # All page sections & UI components
│       ├── navigation.ts            # Section definitions
│       ├── portfolio.ts             # TypeScript interfaces
│       ├── useActiveSection.ts      # IntersectionObserver nav tracking
│       ├── useFocusTrap.ts          # Keyboard focus trap for mobile menu
│       ├── useIsMobile.ts           # MediaQuery mobile detection
│       ├── usePrefersReducedMotion.ts  # Respects OS motion settings
│       └── useScrollLock.ts         # Body scroll lock when menu is open
│
├── tailwind.config.ts               # Custom tokens, shadows, gradients
└── package.json
```

<br />

## 🛠️ Tech Stack

**Framework**
- [Next.js 15](https://nextjs.org) — App Router, Edge Runtime for OG image
- [TypeScript](https://typescriptlang.org) — Full type safety throughout

**Styling**
- [Tailwind CSS](https://tailwindcss.com) — Utility-first with custom design tokens
- Custom CSS — `clamp()` fluid sizing, safe-area insets, scrollbar styling

**Animation**
- [Framer Motion](https://framer.com/motion) — Shared glow variants, staggered reveals, viewport-triggered animations

**Icons**
- [React Icons](https://react-icons.github.io/react-icons/) — `FiGithub`, `FiMenu`

**Font**
- [Inter](https://fonts.google.com/specimen/Inter) via `next/font/google` — Zero layout shift

<br />

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/DevRaval2604/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

<br />

## ⚙️ Configuration

### VS Code — Suppress Tailwind CSS warnings

Create `.vscode/settings.json` in the project root:

```json
{
  "css.validate": false,
  "css.lint.unknownAtRules": "ignore"
}
```

### `tsconfig.json` — Path aliases

Ensure this is present for `@/components/*` imports to work:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

<br />

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "react-icons": "^5.0.0",
    "classnames": "^2.5.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0"
  }
}
```

<br />

## 🎨 Design Tokens

| Token | Value | Used On |
|---|---|---|
| `background` | `#060810` | Page background |
| `gradient-title` | cyan → violet → emerald | Name, avatar, accents |
| `gradient-hero` | Radial ellipse glow | Hero section backdrop |
| `shadow-card` | `0 8px 40px rgba(0,0,0,0.45)` | All glass cards |
| `shadow-glow-cyan` | `0 0 28px rgba(56,189,248,0.40)` | Buttons, featured card |
| `shadow-glow-purple` | `0 0 28px rgba(129,140,248,0.40)` | Button hover states |

<br />

## ♿ Accessibility

- **Skip to content** link for keyboard users
- **`aria-current="page"`** on active nav link
- **`aria-live="polite"`** on typewriter text for screen readers
- **Focus trap** on mobile menu — Tab/Shift+Tab cycles, Escape closes
- **Scroll lock** on `<body>` when mobile menu is open
- **`focus-visible`** outlines — visible for keyboard, hidden for mouse
- **`prefers-reduced-motion`** respected — all animations disabled gracefully
- **Safe area insets** for notched devices

<br />

## 📄 License

MIT © [Dev Raval](https://github.com/DevRaval2604)

<br />

<div align="center">

*Designed & built with obsessive attention to detail*

**[devraval.com](https://devraval.com)** · **[GitHub](https://github.com/DevRaval2604)** · **[LinkedIn](https://linkedin.com/in/devraval2604)**

</div>