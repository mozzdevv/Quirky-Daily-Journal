# One Year Journal: Cosmic Edition 🌌

A beautiful, open-source desktop daily journal app that transforms your year into a glowing constellation of memories. Reimagined with a "Cosmic / Ethereal Night" aesthetic, featuring deep space gradients, twinkling stars, and immersive soundscapes.

## ✨ Features

- **Cosmic Atmosphere**: A deep indigo universe (`#0f172a`) with animated stars and ambient glows that breathe life into your journaling experience.
- **Constellation Streaks**: Watch your consistency light up the sky—consecutive journal entries are visually connected by glowing constellation lines.
- **Immersive Soundscapes**:
    - **Glass Chimes**: Soft, crystalline sounds when opening entries or planting memories.
    - **Cosmic Hover**: Subtle, ethereal hums when exploring your year grid.
- **Glassmorphism UI**: Premium frosted glass cards and overlays (`backdrop-blur-xl`) that float weightlessly above the cosmic background.
- **Symmetrical Grid**: A perfectly balanced 3x4 month layout that visualizes your entire year at a glance.
- **Privacy First**: All data is stored locally in your browser (LocalStorage). Your memories stay on your device.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Framer Motion (for complex animations)
- **State Management**: Zustand (with persistence)
- **Audio**: Custom synthesized sound effects (Python-generated)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/mozzdevv/Quirky-Daily-Journal.git
    cd Quirky-Daily-Journal
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Start the development server:
    ```bash
    pnpm dev
    ```

4.  Open your browser and visit `http://localhost:3003`

### 🍎 Mac Launcher (Easy Mode)

We've included a **One-Click Launcher** for macOS users!
1.  Find the `OpenJournal.command` file in the project folder.
2.  **Right-click > Open** (only needed the first time).
3.  Double-click it anytime to instantly start your journal.

## 📦 Building for Production

To create a production build:

```bash
pnpm build
```

The output will be in the `dist` directory, ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 🎨 Customization

- **Theme**: Colors and fonts can be customized in `client/src/index.css`.
- **Sounds**: Audio assets are located in `client/public/sounds/`.
- **Port**: The default port is set to `3003`. You can change this in `vite.config.ts`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Created with ❤️ by Manus AI*
