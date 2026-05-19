# Nyeya Live Editor ⚡

An ultra-modern, high-performance in-browser IDE, live web prototyping sandbox, and developer playground built for developers, students, and creators worldwide.

![Live Editor](https://img.shields.io/badge/Live%20Editor-Prototyping%20Sandbox-indigo?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%20%7C%20Monaco%20%7C%20Tailwind-emerald?style=for-the-badge)

---

## 🌟 Key Highlights & Modern Features

### 1. 🚀 Global Starter Templates Gallery
- **SaaS Analytics Dashboard**: Interactive KPI metrics cards, Chart.js revenue trend graphs, and live user activity tables.
- **SaaS Pricing & Checkout Calculator**: Annual/Monthly discount toggles, multi-currency display, tier selection, and interactive modal checkout.
- **Interactive Particle Physics Sandbox**: Kinetic HTML5 Canvas particle gravity simulator with interactive mouse cursor repulsion.
- **3D Card Hover & Glassmorphism Showcase**: Perspective 3D spatial tilt effects, glowing specular borders, and frosted glass depth.
- **Modern Full-Stack Developer Portfolio**: Dark-mode portfolio highlighting skill badges, featured projects, and contact drawer.
- **Minimal Sandbox**: Empty HTML5 / CSS3 / ES6 scaffold for fast distraction-free coding.

### 2. 🛠️ Universal DevTools & Visual Generators Suite
- **Color Studio**: Precision Color Inspector (HEX, RGB, HSL conversion) with one-click copy and curated modern designer palettes (*Modern SaaS Indigo, Emerald Cyber, Sunset Coral, Linear Slate, Nordic Frost, Warm Amber*).
- **CSS Gradient Generator**: Multi-stop linear gradient builder with live preview and ready-to-use CSS output.
- **Glassmorphism Styler**: Real-time backdrop blur, opacity, specular border, and radius sliders.
- **Multi-Layer Box Shadow Generator**: X/Y offset, blur, spread, elevation levels, and opacity control.
- **UI Component Snippets**: Ready-to-insert snippets for responsive navbars, modal dialogs, shimmer skeleton loaders, animated gradient buttons, and dark mode toggles.
- **Vector SVG Icon Library**: 20+ common scalable UI vector icons (*Search, User, ShoppingBag, Bell, Code, Terminal, Sparkles, Star, Heart, Check, Sun, Moon, ArrowRight, ExternalLink, Settings, Play, Lock, Mail, Zap, Layers*) with 1-click insert.
- **Smart Lorem Ipsum Generator**: Switch between Modern Tech Terminology and Classic Latin with customizable word count slider.

### 3. ⚡ Core IDE & Live Prototyping Engine
- **Monaco Code Editor**: Multi-tab code editor (HTML5, CSS3, JavaScript ES6) with syntax highlighting, word wrap, code beautification / formatting, and font scaling.
- **Multi-Layout Flexibility**: Split Vertical (Side-by-side), Split Horizontal (Top-bottom), and Full Live Preview mode.
- **Multi-Device Viewport Simulation**: 
  - 📱 *Small Mobile* (320x568)
  - 📱 *Mobile Phone* (375x667)
  - 📱 *Tablet* (768x1024)
  - 💻 *Fluid Desktop* (100%)
  - 🔍 *Zoom Scaling* (50% to 150%)
- **Live Interactive Console REPL**: Real-time capture of `console.log`, `warn`, `error`, and `info` messages with log level filters, plus an interactive command line (`>`) prompt to evaluate JavaScript expressions live inside the preview.
- **Local Workspace Project Manager**: Create, rename, switch, and persist multiple sandboxes in browser LocalStorage.
- **One-Click CDN Injector**: Easily add Tailwind CSS, FontAwesome 6, Chart.js, Animate.css, Google Fonts, and Canvas Confetti to your project.
- **Standalone HTML Export & Instant URL Sharing**: Export as self-contained HTML files or share projects via encoded URL hash (`#code=...`).

---

## 🚀 How to Run Locally

### Requirements
- Node.js 18+ and npm / yarn / pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```

The studio will be available at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
├── index.html                  # Vite entry with Google Fonts (Plus Jakarta, Outfit, JetBrains Mono)
├── src/
│   ├── App.tsx                 # Main application & URL hash loader
│   ├── components/
│   │   ├── CodeEditor.tsx      # Core IDE, preview stage, layout engine, REPL dock
│   │   ├── DevToolsSidebar.tsx # Universal DevTools, vector icons, palettes, visual CSS generators
│   │   └── ui/                 # Radix UI primitives (Dialog, Button, Tabs, Slider, etc.)
│   ├── lib/
│   │   ├── devUtils.ts         # Universal SVG icons, designer palettes, lorem generator, beautifier
│   │   ├── templates.ts        # Production-ready global starter templates
│   │   └── utils.ts            # Class name merging utilities
│   └── index.css               # Obsidian studio theme and custom scrollbar styling
```

---

## 📜 License & Credits

Built with ❤️ by **Nyeya** for developers and learners worldwide.