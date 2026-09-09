<div align="center">

<br />

Dev Raval — Portfolio

Software Developer & Business Development Professional

Combining software development, business research, and clear communication to understand requirements and deliver practical solutions.

<br />










<br />





<br />

</div>

📖 Overview

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and React. Designed with a light background, navy surfaces, blue accents, fluid typography, and responsive layouts for mobile, tablet, and desktop screens.

🛠️ Stack

Layer

Technology

🧱 Framework

Next.js 14 (App Router)

🔷 Language

TypeScript

🎨 Styling

Tailwind CSS + custom design tokens

🌊 Animation

CSS keyframes and transitions; Framer Motion remains an installed dependency

🔤 Font

Locally hosted Inter via next/font/local

🔣 Icons

React Icons

🖼️ OG Image

Auto-generated via next/og

☁️ Deployment

Vercel

🗂️ Project Structure

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

🚀 Getting Started

# Clone
git clone https://github.com/DevRaval2604/portfolio.git
cd portfolio

# Install
npm install

# Develop
npm run dev

Open http://localhost:3000

# Build for production
npm run build
npm run start

⚙️ Configuration

🔵 VS Code — suppress Tailwind warnings

Create .vscode/settings.json:

{
  "css.validate": false,
  "css.lint.unknownAtRules": "ignore"
}

🔷 tsconfig.json — path aliases

{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

🎨 Design Tokens

Token

Value

🌑 --paper

#ffffff

🌈 --blue

#315de6

🔵 --ink

#17243a

🟣 --muted

#536178

⬛ --navy

#101d31

♿ Accessibility

⌨️ Skip to content link for keyboard users

🔖 aria-current="location" on active nav item

📢 Descriptive aria-label attributes on navigation and menu controls

🪤 Native mobile dialog with focus containment and Escape dismissal

👁️ focus-visible styles on page controls; focus outlines are disabled for mobile navigation

🎭 prefers-reduced-motion respected — all animations disabled gracefully

📱 Safe area insets in the mobile menu for notched iPhones and Android cutouts

📄 License

© 2026 Dev Raval. All rights reserved.

<div align="center">

🌐 portfolio.devraval.dev · 💻 GitHub · 🔗 LinkedIn · 📧 Email

</div>