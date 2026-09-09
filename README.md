# Dev Raval — Portfolio

A portfolio combining technology and business development experience. The headline, About section, skills, and current Budventure internship are based on the supplied resumes. The original project details, Maxgen internship, education, contact information, navigation, and overall design are preserved.

## Run in VS Code

Open this folder in VS Code. In its terminal, run:

```bash
npm ci
npm run dev
```

Open http://localhost:3000 in your browser. Node.js 20 or later is recommended.

## Production build

```bash
npm run build
npm start
```

The production site is exported to `out/`. `npm start` serves that export locally at http://localhost:3000, without an additional server package. The `out/` folder can also be deployed to a static host. The existing live domain has not been changed by this redesign.

## Where to make changes

- `src/components/sections.tsx` — page sections and original text.
- `src/components/content.ts` — profile copy, resume-based skills, Budventure details, and the preserved project and education data.
- `src/components/profile-animation.tsx` — the continuously playing abstract profile animation.
- `src/components/header.tsx` — navigation, active section tracking, and mobile menu.
- `src/app/globals.css` — the new visual design, responsive layouts, and motion rules.
- `src/app/layout.tsx` — the original page metadata and locally hosted Inter font.
- `src/app/opengraph-image.tsx` — the original social preview image, preserved.

The original dependency versions and lockfile are retained. Static sections render without client-side JavaScript. The only interactive client component is the navigation. The redesigned page no longer imports the continuous particle, typewriter, or floating-card animations.

## Responsive and accessibility behavior

- Fluid typography, wrapping content, and bounded layouts for small phones through large desktops.
- One-column phone layouts; two-column tablet layouts where appropriate; wider desktop grids.
- A native mobile dialog with keyboard focus handling, Escape dismissal, and a scrollable menu for short viewports.
- Visible keyboard focus, skip navigation, and touch controls at least 44px high.
- Reduced-motion preferences, forced-color mode, and print styles.
- All main text is available in the initial HTML; the local font uses swap loading.

## Validation

- Production build and TypeScript checks passed.
- All three original project records and the Maxgen internship were checked for exact preservation.
- All 22 skills and tools from the non-tech resume are covered; original technical skills are retained.
- The profile count is 2 internships, including Budventure from August 2026 to Present.
- The profile animation plays continuously using CSS, with a static reduced-motion state.
- All external link destinations match the supplied project.
- Internal anchors and required local asset paths were checked.
- The sampled text/background color pairs exceed 4.5:1 contrast.
- Browser-based interaction tests, visual checks on physical devices, and Lighthouse measurements have not been performed. No Lighthouse score is claimed.

© 2026 Dev Raval. All rights reserved.
