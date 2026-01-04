# Quirky Daily Journal 🌿

A beautiful, open-source desktop daily journal app inspired by the "One Year Daily Journal" iOS app. Reimagined with a modern, minimalist aesthetic and a focus on pure, distraction-free writing.

## ✨ Features

- **Quarterly Garden Grid**: A balanced 3x4 grid layout that visualizes your year in perfect symmetry.
- **Interactive Dots**: Every day is a clickable dot. Click any past or future date to plant a memory.
- **Glassmorphism UI**: Experience a premium writing environment with frosted glass overlays (`backdrop-blur-2xl`) that blur the world behind your words.
- **Modern Minimalist Design**:
    - **Clean Typography**: *Courier Prime* for an authentic, typewriter-like feel.
    - **Deep Blue Theme**: A calming, deep blue palette (`#0000aa`) on a soft gray canvas.
    - **No Clutter**: A floating navigation pill and simple, intuitive controls.
- **Privacy First**: All data is stored locally in your browser (LocalStorage). No servers, no tracking.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Shadcn UI
- **State Management**: Zustand (with persistence)
- **Icons**: Lucide React
- **Fonts**: Courier Prime (Monospace)

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
- **Port**: The default port is set to `3003`. You can change this in `vite.config.ts`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Created with ❤️ by Manus AI*
