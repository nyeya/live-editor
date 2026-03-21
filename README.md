# Nyeya Code Studio 🇬🇭 (Ghana Edition)

An ultra-modern, high-performance in-browser IDE, live web prototyping sandbox, and developer ecosystem suite tailored for Ghanaian creators, fintech developers, software engineers, and SMEs.

![Ghana Edition](https://img.shields.io/badge/Edition-Ghana%20Developer%20Suite%20🇬🇭-amber?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%20%7C%20Monaco%20%7C%20Tailwind-emerald?style=for-the-badge)

---

## 🌟 Key Highlights & Modern Features

### 1. 🇬🇭 Ghana Starter Templates Gallery
- **Mobile Money & Paystack Checkout Gateway**: Interactive MTN MoMo, Telecel Cash, and AT Money modal with live GH₵ calculations and real-time USSD push prompt simulation.
- **Ghana SME E-Commerce Boutique**: High-converting storefront for Bonwire Kente cloth, pure Northern raw Shea butter, and hand-woven Bolga baskets with WhatsApp direct ordering.
- **Ghana Card ID Verification (NIA)**: Biometric ID verification widget with live PIN validation and holographic card simulation.
- **Accra Tech Summit & Meetup Landing Page**: High-energy conference page featuring countdown timers and speaker showcases.
- **Adinkra & Kente Generative Canvas Art**: Algorithmic canvas generator rendering traditional Ghanaian patterns (*Gye Nyame*, *Sankofa*, *Dwennimmen*).
- **Modern Ghanaian Developer Portfolio**: Dark-mode personal portfolio highlighting Accra tech stacks, GitHub projects, and MoMo API experience.

### 2. 🛠️ Ghana Tech & DevTools Suite
- **MoMo Network Detector**: Auto-identifies network carriers (`024/054/055/059` -> MTN, `020/050` -> Telecel, `027/057` -> AT).
- **Ghana Cedi (GH₵) Price Tag Generator**: Format and generate ready-to-use Cedi currency components.
- **WhatsApp Quick-Order CTA Builder**: Generate direct WhatsApp ordering links for Ghanaian merchants.
- **Sacred Adinkra SVG Vector Library**: One-click insert for scalable vector Adinkra symbols.
- **Smart Ghana Lorem Ipsum**: Toggle between Ghanaian cultural/tech terms (*Accra, Kejetia, Makola, Jollof, Chale Wote, Silicon Accra*) and classic Latin lorem.
- **Curated Ghanaian Color Palettes**: *Ghana Heritage*, *Royal Kente*, *Accra Coastal Sunset*, and *Fintech Modern*.

### 3. ⚡ Core IDE & Live Prototyping Engine
- **Monaco Code Editor**: Multi-tab code editor (HTML5, CSS3, JavaScript ES6) with syntax highlighting, word wrap, code beautification / formatting, and font scaling.
- **Multi-Layout Flexibility**: Split Vertical (Side-by-side), Split Horizontal (Top-bottom), Full Live Preview, and Zen Code mode.
- **Multi-Device Viewport Simulation**: 
  - 📟 *KaiOS Feature Phone* (240x320) for USSD & lightweight web apps
  - 📱 *Mobile Phone* (iPhone 15 / 390x844) with realistic bezel frame
  - 📱 *Tablet* (iPad Air / 768x1024)
  - 💻 *Fluid Desktop* (100%)
- **Live Interactive Console REPL**: Execute JavaScript expressions live inside the sandboxed iframe and inspect filtered logs (*All, Logs, Warnings, Errors, Info*).
- **Local Workspace Project Manager**: Create, rename, switch, and persist multiple projects in browser memory.
- **One-Click CDN Injector**: Easily add Tailwind CSS, FontAwesome 6, Animate.css, Google Fonts, and Canvas Confetti.
- **Standalone HTML Export & Instant URL Sharing**: Export as single-file HTML bundles or share projects via encoded URL hash.

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
│   │   ├── DevToolsSidebar.tsx # Ghana Dev Suite, Adinkra SVGs, color palettes, glass generators
│   │   └── ui/                 # Radix UI primitives (Dialog, Button, Tabs, Slider, etc.)
│   ├── lib/
│   │   ├── ghanaUtils.ts       # Adinkra SVGs, MoMo carriers, Cedi formatter, Ghana Lorem, Beautifier
│   │   ├── templates.ts        # Production-ready Ghanaian starter templates
│   │   └── utils.ts            # Class name merging utilities
│   └── index.css               # Obsidian luxury studio theme, glassmorphic tokens, glowing borders
```

---

## 📜 License & Credits

Built with ❤️ by **Nyeya** for developers in Ghana 🇬🇭 and worldwide.