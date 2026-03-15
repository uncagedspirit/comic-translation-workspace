# Comic Translation Workspace

## Project Overview
A browser-based tool that helps indie comic translators and small localization 
teams replace the fragmented Photoshop + Google Docs workflow with a single 
purpose-built platform. Users upload a chapter's page images, draw bounding 
boxes over speech bubbles, type translated text, and export a finished ZIP of 
composited pages — all without leaving the browser.

## Tech Stack
- Framework: Next.js 14 (App Router) + TypeScript (strict mode)
- Styling: Tailwind CSS
- Canvas: react-konva (Konva.js) for all image/bubble/text rendering
- State: Zustand with persist middleware for localStorage persistence
- Export: Konva native export + jszip
- Fonts: Bangers (Google Fonts) as default comic font
- Deployment: Vercel

## Architecture Rules
- ALL canvas rendering happens inside react-konva components. Never use 
  raw DOM manipulation on canvas elements.
- Zustand store is the single source of truth for all project state.
  Components read from the store; they do not hold their own copies of 
  page/bubble/translation data.
- Page images are stored as object URLs (URL.createObjectURL). 
  Never base64-encode images in state.
- The text-fit algorithm lives in /lib/text-fit.ts — pure TypeScript, no DOM.
- Export logic lives in /lib/export-utils.ts — keep it isolated.
- Components go in /components, organized by feature folder.
- Keep all files under 200 lines. Split aggressively.

## File Naming
- Files: kebab-case (page-canvas.tsx, text-fit.ts)
- Components: PascalCase (PageCanvas, BubbleOverlay)
- Store: useProjectStore in /lib/store.ts

## Code Style
- Functional components only. No class components.
- async/await only. No raw promise chains.
- Every function that touches the DOM or canvas needs try/catch.
- Zustand actions are defined inside the store, not in components.

## Build & Test Commands
- Dev server: npm run dev
- Build: npm run build
- Type check: npx tsc --noEmit
- Lint: npm run lint

## Critical Constraints
- Do NOT store image File objects in Zustand — store object URLs as strings.
- Do NOT modify any working feature when adding a new one.
- The Konva Stage must have listening={true} for event handling to work.
- When exporting, use Konva's .toDataURL() not html2canvas.

## Current Status
- Phase: B (Zustand Store)
- Completed: [project initialized, dependencies installed, file structure created]
- In Progress: Zustand store
- Blocked: None