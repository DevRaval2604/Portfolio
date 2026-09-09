<div align="center">

<br />

# Dev Raval — Portfolio

**Software Developer & Business Development Professional**

Combining software development, business research, and clear communication to understand requirements and deliver practical solutions.

<br />

[![Live](https://img.shields.io/badge/Live-portfolio.devraval.dev-38bdf8?style=flat-square&logo=vercel&logoColor=white)](https://portfolio.devraval.dev)
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Flutter](https://img.shields.io/badge/Flutter-02569B?style=flat-square&logo=flutter&logoColor=white)](https://flutter.dev)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://framer.com/motion)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

<br />

[![GitHub](https://img.shields.io/badge/GitHub-DevRaval2604-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/DevRaval2604)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-devraval2604-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/devraval2604)
[![Email](https://img.shields.io/badge/Email-devraval2004@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:devraval2004@gmail.com)

<br />

</div>

---

## 📖 Overview

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and React. Designed with a light background, navy surfaces, blue accents, fluid typography, and responsive layouts for mobile, tablet, and desktop screens.

---

## 🛠️ Stack

| Layer | Technology |
|---|---|
| 🧱 Framework | Next.js 14 (App Router) |
| 🔷 Language | TypeScript |
| 🎨 Styling | Tailwind CSS + custom design tokens |
| 🌊 Animation | CSS keyframes and transitions; Framer Motion remains an installed dependency |
| 🔤 Font | Locally hosted Inter via `next/font/local` |
| 🔣 Icons | React Icons |
| 🖼️ OG Image | Auto-generated via `next/og` |
| ☁️ Deployment | Vercel |

---

## 🗂️ Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── fonts/                    # Locally hosted Inter font
│   │   ├── globals.css               # Design system & utilities
│   │   ├── layout.tsx                # Root layout, fonts, SEO metadata
│   │   ├── page.tsx                  # Entry point
│   │   └── opengraph-image.tsx       # Auto-generated OG image (1200×630)
│   │
│   └── components/
│       ├── sections.tsx              # Page sections & static content
│       ├── content.ts                # Profile, skills, projects & education
│       ├── header.tsx                # Navigation, active tracking & mobile dialog
│       ├── profile-animation.tsx     # CSS-animated orbit graphic
│       ├── navigation.ts             # Section definitions
│       ├── portfolio.ts              # TypeScript interfaces
│       ├── useActiveSection.ts       # Retained legacy navigation hook
│       ├── useFocusTrap.ts           # Retained legacy focus-trap hook
│       ├── useIsMobile.ts            # Retained legacy mobile-detection hook
│       ├── usePrefersReducedMotion.ts
│       └── useScrollLock.ts
│
├── scripts/
│   └── serve.mjs                     # Local production export server
├── tailwind.config.ts                # Tailwind configuration
└── package.json
```

---

## 🚀 Getting Started

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

## ⚙️ Configuration

**🔵 VS Code — suppress Tailwind warnings**

Create `.vscode/settings.json`:

```json
{
  "css.validate": false,
  "css.lint.unknownAtRules": "ignore"
}
```

**🔷 `tsconfig.json` — path aliases**

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

## 🎨 Design Tokens

| Token | Value |
|---|---|
| 🌑 `--paper` | `#ffffff` |
| 🌈 `--blue` | `#315de6` |
| 🔵 `--ink` | `#17243a` |
| 🟣 `--muted` | `#536178` |
| ⬛ `--navy` | `#101d31` |

---

## ♿ Accessibility

- ⌨️ Skip to content link for keyboard users
- 🔖 `aria-current="location"` on active nav item
- 📢 Descriptive `aria-label` attributes on navigation and menu controls
- 🪤 Native mobile dialog with focus containment and Escape dismissal
- 👁️ `focus-visible` styles on page controls; focus outlines are disabled for mobile navigation
- 🎭 `prefers-reduced-motion` respected — all animations disabled gracefully
- 📱 Safe area insets in the mobile menu for notched iPhones and Android cutouts

---

## 📄 License

© 2026 Dev Raval. All rights reserved.

---

<div align="center">

[🌐 portfolio.devraval.dev](https://portfolio.devraval.dev) · [💻 GitHub](https://github.com/DevRaval2604) · [🔗 LinkedIn](https://linkedin.com/in/devraval2604) · [📧 Email](mailto:devraval2004@gmail.com)

</div>