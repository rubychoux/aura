# AURA — AI Human Optimization Lab

> A personalization engine that generates adaptive health and beauty protocols based on individual biometric and lifestyle inputs.

**Live Demo:** [your-vercel-url]  
**Built with:** React · TypeScript · Vite · Tailwind CSS

---

## Overview

AURA is a production-quality SaaS foundation for AI-driven human optimization. Users complete a multi-step intake assessment covering skin profile, lifestyle data, fitness habits, and goals. The system runs a weighted scoring algorithm across four categories — skin, sleep, fitness, and lifestyle — and generates a fully personalized daily protocol, product stack, and optimization score.

The project was built as part of exploring product-market fit in the Korean wellness and beauty space, where I've been researching the intersection of AI personalization and preventive health optimization.

---

## Architecture

The core design principle is **complete separation between the personalization engine and the React UI layer.**
```
src/
├── engine/               # Pure TypeScript — zero React dependencies
│   ├── scoring/          # Category scorers (skin, sleep, fitness, lifestyle)
│   │   └── composite.scorer.ts   # Weighted aggregate score
│   ├── protocol/         # Routine + product stack generators
│   └── transforms/       # Score → grade/label formatting
│
├── features/             # Vertical feature slices
│   ├── onboarding/       # Multi-step intake form
│   ├── dashboard/        # Score display + What If simulator
│   └── protocol/         # Daily routine + product stack views
│
├── store/                # Context + useReducer + localStorage
├── hooks/                # useOptimizationEngine (master hook)
├── components/           # Shared UI primitives
└── types/                # All interfaces, zero logic
```

The `engine/` module takes a `UserProfile` object and returns scores and protocols. It has no knowledge of React, hooks, or the DOM — it can be extracted to a Node.js backend or Web Worker without touching any UI code.

---

## Key Engineering Decisions

**Pure function engine**  
All scoring and protocol generation logic lives in `src/engine/` as pure TypeScript functions. This makes the entire personalization layer independently testable — every scoring function can be unit tested by passing a mock profile object and asserting the output, with zero rendering overhead.

**useReducer over useState for profile state**  
The user profile is complex, multi-step state with many fields. `useReducer` with typed actions makes state transitions explicit and auditable. It also makes features like undo, optimistic updates, or time-travel debugging straightforward to add.

**localStorage hydration via initializer function**  
Profile state hydrates from localStorage using `useReducer`'s initializer argument (third parameter), not a `useEffect`. This means the hydrated state is available on the first render — no flash of default state.

**useMemo-gated engine execution**  
The master `useOptimizationEngine` hook wraps all engine calls in `useMemo` with the full profile object as the dependency. The engine only re-runs when profile data actually changes — not on unrelated re-renders.

**TypeScript strict mode throughout**  
Strict mode is enabled across the project. The `isCompleteProfile` type guard narrows `Partial<UserProfile>` to `UserProfile` before any engine call, making it impossible to pass incomplete data to scoring functions.

---

## Features

**Multi-step onboarding** — 5-step intake form with per-step validation logic. The Continue button is gated behind step-specific field requirements so users can't skip required inputs.

**Optimization score** — Composite 0–100 score with S/A/B/C/D grading, computed from weighted category subscores. Displayed as an animated SVG gauge.

**Category breakdown** — Individual scores for skin, sleep, fitness, and lifestyle with personalized one-line insights derived from the highest-impact variable in each category.

**Priority insights feed** — Dynamically generated insights that surface the highest-leverage intervention point, flag critical patterns like sleep deficit or elevated cortisol, and identify the user's strongest anchor variable.

**Daily protocol** — Personalized morning/midday/evening/night routine steps generated from skin type, climate, stress level, and goals. Each step has priority classification (essential / recommended / optional) and goal alignment tags.

**Product stack** — Ranked product category recommendations with relevance scores, frequency guidance, and rationale tied to the user's specific profile inputs.

**What If simulator** — Real-time score recalculation as users adjust sleep, stress, workout frequency, and water intake via sliders. Score delta updates instantly using memoized engine execution. No profile changes are saved.

**Persistent state** — Profile persists across sessions via localStorage. Returning users land directly on their dashboard.

---

## Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Language | TypeScript (strict mode) |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Context API + useReducer |
| Persistence | localStorage |
| Deployment | Vercel |

---

## Running Locally
```bash
git clone https://github.com/rubychoux/aura.git
cd aura
npm install
npm run dev
```

Open `http://localhost:5173`

---

## What's Next

- Weekly check-in flow with score trajectory tracking over time
- Biological optimization age estimator derived from lifestyle inputs
- Seoul / Korea climate-specific protocol layer
- Profile editor without full onboarding re-entry
- Unit test suite for the engine scoring functions using Vitest