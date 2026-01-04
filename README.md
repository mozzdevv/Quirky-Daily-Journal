# Quirky Daily Journal 🌿

A beautiful, open-source desktop daily journal app inspired by the "One Year Daily Journal" iOS app. Built with React, Tailwind CSS, and local storage privacy.

![App Screenshot](client/public/images/hero_garden.png)

## ✨ Features

- **365-Day Visualization**: View your entire year as a grid of dots that bloom into flowers as you journal.
- **Digital Hygge Design**: Hand-drawn aesthetics, paper textures, and a calming "garden" theme.
- **Privacy First**: All data is stored locally in your browser (LocalStorage). No servers, no tracking.
- **Memory Garden**: Watch your collection of memories grow into a lush digital garden.
- **Journal View**: Browse your past entries chronologically.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Shadcn UI
- **State Management**: Zustand (with persistence)
- **Icons**: Lucide React
- **Fonts**: Patrick Hand (Headers), Quicksand (Body)

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

4.  Open your browser and visit `http://localhost:3000`

## 📦 Building for Production

To create a production build:

```bash
pnpm build
```

The output will be in the `dist` directory, ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 🎨 Customization

- **Images**: Plant assets are located in `client/public/images/plants`. You can replace them with your own 18 unique images (set1_1-9, set2_1-9).
- **Theme**: Colors and fonts can be customized in `client/src/index.css`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Created with ❤️ by Manus AI*
