<div align="center">
  <img src="public/logo.png" alt="Cora Logo" width="120" height="120" />
  <h1>Cora Workspace</h1>
  <p><strong>The premier computational environment for modern developers, engineers, and data scientists.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js" alt="Three.js" />
    <img src="https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge" alt="Zustand" />
  </p>

  <h3><a href="https://cora-wine.vercel.app/">🚀 View Live Application</a></h3>
</div>

<br />

> **Cora** is an ultra-premium, modular calculator and computational workspace built with Next.js App Router, TailwindCSS, and Framer Motion. It features a custom AST-parsing math engine and a completely bespoke WebGL 3D environment.

---

## 🚀 Features

Cora is not just a calculator; it is an entire computational operating system containing six distinct advanced modules:

* 🧮 **Standard & Scientific**: Precision mathematical environments powered by `mathjs` with BigNumber support (no `0.1 + 0.2 = 0.300000004` errors).
* 📈 **Graphing Engine**: Real-time Cartesian coordinate plotting with dynamic viewport panning, zooming, and multi-equation rendering using HTML5 Canvas.
* 🔢 **Matrix Operations**: Full Linear Algebra suite supporting up to 6x6 matrices. Compute Determinants, Inverses, Transposes, and Matrix Multiplication seamlessly.
* 📊 **Analytics & Finance**: Advanced statistics, linear regression, loan amortization schedules, and compound interest graphing powered by `recharts`.
* 💻 **Developer Mode**: Instant Binary, Octal, Decimal, and Hexadecimal conversions with a visual Bit-Toggling Grid for low-level systems programming.
* 🌌 **WebGL 3D Landing Experience**: A breathtaking, dynamic hero section featuring a custom 3D environment built with `@react-three/fiber` and post-processing bloom.

---

## 📸 Showcase

*(Screenshots provided from the live application)*

### Landing Experience
<img src="public/docs/landing.png" alt="Cora Landing Page" width="100%" />

### Standard & Scientific Calculator
<img src="public/docs/scientific.png" alt="Cora Scientific Calculator" width="100%" />

### Graphing Engine
<img src="public/docs/graphing.png" alt="Cora Graphing Engine" width="100%" />

### Matrix Mathematics
<img src="public/docs/matrix.png" alt="Cora Matrix Editor" width="100%" />

### Developer Profile
<img src="public/docs/profile.png" alt="Cora Developer Profile" width="100%" />

### Analytics & Statistics
<img src="public/docs/analytics.png" alt="Cora Analytics" width="100%" />

### Developer Tools
<img src="public/docs/developer.png" alt="Cora Developer Workspace" width="100%" />

### Formula Library
<img src="public/docs/library.png" alt="Cora Formula Library" width="100%" />

### Settings & Theming
<img src="public/docs/settings.png" alt="Cora Settings" width="100%" />

*(Feel free to add more screenshots to the `public/docs/` folder!)*

---

## 🏗️ Architecture

Cora is engineered for absolute performance and reliability:

1. **State Management**: Zero prop-drilling. Global state is managed efficiently using `Zustand`, divided into specific store slices (`calcStore`, `graphStore`, `matrixStore`, `analyticsStore`).
2. **Math Engine Integration**: Custom wrapper around `mathjs` ensuring strict AST sanitization. All calculations happen synchronously with sub-millisecond latency.
3. **Performance Optimization**: 
   - Heavy components (like the WebGL Scene and Recharts) are **Dynamically Imported** (`next/dynamic`) to completely eliminate them from the initial SSR payload.
   - UI elements are aggressively memoized with `React.memo` to prevent re-renders on every keystroke.
4. **Theming**: Dark/Light mode is powered by `next-themes` with a strictly enforced hydration strategy to prevent Server/Client DOM mismatches.

---

## 💻 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **3D Rendering:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & Drei
- **Math Engine:** [Math.js](https://mathjs.org/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/daystar-1nine/CodeAlpha_Cora.git
   cd CodeAlpha_Cora
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 🛡️ License
Built for the CodeAlpha Internship Program. 

<div align="center">
  <sub>Engineered with precision and elegance.</sub>
</div>
