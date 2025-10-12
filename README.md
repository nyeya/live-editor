# Live Editor

I built this app to create a fast, focused in-browser code editor and previewer so I can prototype HTML/CSS/JS quickly and share simple web demos.

## What it is

This is a lightweight live code editor with a split layout: editable source panels (HTML, CSS, JavaScript) on the left and a live preview iframe on the right. It includes a console output area that shows logs and runtime errors emitted by the previewed page, an optional developer tools sidebar for inserting snippets/colors, and simple export/save functionality.

## Key features

- Editable HTML/CSS/JavaScript panels with Monaco editor integration
- Live preview rendered inside a sandboxed iframe
- Console output capture (logs, warnings, errors) from the preview
- Export current project as a single HTML file
- Simple toolbar for toggling preview/dev tools, saving, and exporting
- Resizable panels (vertical/horizontal) for flexible layout
- Small footer with copyright information

## File structure

Important files and directories:

- `src/App.tsx` — app entry that wires the editor and global UI
- `src/components/CodeEditor.tsx` — the main editor + preview layout
- `src/components/DevToolsSidebar.tsx` — helper sidebar for quick inserts
- `src/components/ui/*` — shared UI primitives (buttons, tabs, toast, etc.)
- `src/index.css` — TailwindCSS configuration and base styles
- `index.html` — Vite entry HTML

## How to run it locally

Requirements: Node.js (16+ recommended) and npm/yarn/pnpm.

1. Install dependencies

```bash
# with npm
npm install

# or with pnpm
pnpm install

# or with yarn
yarn
```

2. Start the dev server

```bash
npm run dev
```

The app will open with Vite's dev server, typically at `http://localhost:5173 or http://localhost:3000`.

## How it works (brief)

- The editor uses Monaco (via `@monaco-editor/react`) to edit HTML/CSS/JS.
- When code changes, the app serializes everything into a single HTML string and writes that to a Blob URL which is loaded in the iframe.
- The preview overrides `console.log`, `console.warn`, `console.error` inside the iframe and posts messages to the parent window so the host app can display console output.

## Development notes & tips

- The preview is sandboxed (`allow-scripts allow-same-origin`) to keep it separated from the host app while allowing scripts to run.
- To avoid excessive updates, auto-save is debounced in `CodeEditor` (1s delay).
- More room for improvement and expansion like: adding more editor options (formatting, prettier, linting), by expanding the Monaco options in `CodeEditor`.
- The `DevToolsSidebar` exposes small helpers; it's a good place to add code snippets or color pickers.

## Accessibility & security considerations

- The iframe is sandboxed to mitigate risks from executing arbitrary code.
- The UI uses semantic elements where possible. If I add keyboard shortcuts, I'll ensure focus management for the Monaco editor and toolbar controls.

## Deployment

This is a static frontend app that can be built and deployed anywhere that serves static assets (Vercel, Netlify, GitHub Pages, static S3 bucket + CDN, etc.).

Build for production:

```bash
npm run build
```

Then deploy the `dist`/`build` output to any static hosting provider.

## Future ideas

- Add authentication and per-user project storage
- Persist projects in localStorage with a project list
- Allow embedding/exporting only the preview (no editor)
- Add templates for quick starters
- etc


---

Feel free to try it. You can also fork this repo and make changes