# Cora - Professional Computational Environment

![Cora Banner](https://via.placeholder.com/1200x600/000000/FFFFFF?text=Cora+Computational+Environment)

Cora is a premium, desktop-class computational workspace running entirely in the browser. It combines the aesthetic elegance of native macOS/Windows applications with the raw power of standard and advanced mathematical engines.

## 🌟 Modules

- **Standard Calculator**: Glassmorphism UI, real-time expression parsing.
- **Scientific Calculator**: Advanced trigonometry, constants library, multi-angle modes (DEG/RAD/GRAD).
- **Graphing Engine**: High-performance, custom-built HTML5 Canvas engine supporting 60FPS fluid pan/zoom, interactive crosshairs, and multi-equation rendering.
- **Matrix & Vector Workspace**: Spreadsheet-like input grid for high-speed linear algebra operations (Determinant, Inverse, Rank, Dot/Cross products).
- **Analytics Workspace**: Data entry grid for statistical modeling (1-Var, Linear Regression) and premium interactive Finance models (TVM, Compound Interest). Visualizations powered by Recharts.
- **Developer Workspace**: Native 64-bit `BigInt` hardware-level calculator. Features an interactive 64-bit Bit Grid, multi-base live translation (HEX/DEC/OCT/BIN), and bitwise logic.
- **Formula Library**: An interactive, searchable reference of mathematical, physical, and CS formulas integrated directly with Cora's calculation engines, powered by $\KaTeX$.

## 🚀 Technology Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS v4 + Framer Motion (for fluid, desktop-like micro-animations)
- **State Management**: Zustand (modular, decoupled stores for `useCalcStore`, `useGraphStore`, etc.)
- **Math Engine**: `mathjs` for AST parsing, regression, and complex matrix ops. `BigInt` native for developer/hex calculations.
- **Rendering**: Custom Canvas API for graphs, `recharts` for analytical charts, `react-latex-next` for beautiful formula typsetting.

## 🛠️ Architecture

Cora is built using a highly modular Feature-Slice design pattern. The core UI `shell` encapsulates navigation, while independent functional `features` plug into the shell dynamically. This allows the computational logic (e.g. `statisticsMath.ts`) to remain strictly decoupled from the presentation layer (`DataGrid.tsx`), ensuring future-proof expansion for Machine Learning or IEEE-754 modules.

## ⌨️ Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to launch the Cora Workspace.

## 🤝 Contributing
Open to PRs for new Formula entries, translations, or math engine optimizations!

## 📄 License
MIT License. Created for the CodeAlpha portfolio.
