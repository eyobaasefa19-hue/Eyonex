# Eyonex

Eyonex is an AI-powered English-learning platform built with Next.js, React, TypeScript, and Tailwind CSS.

## Tech stack

- **Next.js** (App Router) — routing, rendering, and build pipeline
- **React 19** — UI library
- **TypeScript** — end-to-end type safety
- **Tailwind CSS** — utility-first styling with a custom design-token system
- **ESLint** + **Prettier** — linting and formatting

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy the example env file and fill in any required values
cp .env.example .env.local

# 3. Start the development server
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the development server             |
| `npm run build`        | Create a production build                |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format files with Prettier               |
| `npm run format:check` | Check formatting without writing changes |
| `npm run typecheck`    | Run the TypeScript compiler (`tsc`)      |

## Project structure

```
src/
├── app/            # App Router — layouts, pages, and global styles
│   ├── globals.css # Tailwind layers + custom utility classes
│   └── layout.tsx  # Root layout (fonts, metadata)
├── components/     # Reusable UI components
│   └── ui/         # Design-system primitives (Button, Card, Badge)
└── lib/            # Utilities and shared logic
    ├── utils.ts    # `cn()` class-merge helper + small utilities
    └── types.ts    # Shared TypeScript types
```

## Design tokens

Colors, typography, shadows, and animations are defined in `tailwind.config.ts` as a token system:

- **Color ramps:** `primary` (emerald), `secondary` (blue), `accent` (orange), plus `success`, `warning`, `error`, and Tailwind's `neutral` grays.
- **Fonts:** `font-sans` (body) and `font-display` (headings), wired through CSS variables in the root layout.
- **Shadows:** `card`, `card-hover`, `glow`, `glow-lg`.
- **Animations:** `fade-in`, `slide-up`, `shimmer`.

Dark mode is class-based — toggle by adding the `dark` class to the `<html>` element.

## License

MIT
