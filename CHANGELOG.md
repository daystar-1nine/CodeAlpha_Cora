# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - Cora Final Release

### Added
- **Formula Library**: A comprehensive mathematical, physical, and computer science reference module with LaTeX rendering.
- **Developer Workspace**: Native BigInt hardware calculator with 64-bit visual Bit Grid and interactive bitwise logical operators.
- **Analytics Workspace**: Financial modeling (TVM, Loans, Compound Interest) and Statistical Regression (1-Var, Linear) with Recharts animations.
- **Matrix & Vector Workspace**: Advanced Linear Algebra environment with spreadsheet-like data entry components.
- **Graphing Engine**: 60FPS Custom HTML5 Canvas engine for rendering complex algebraic bounds and crosshairs.
- **Scientific Calculator**: Trig overrides (DEG/RAD/GRAD) and extensive constants panel.
- **Standard Calculator**: The core mathjs-powered computation engine with glassmorphism UI.
- Unified 3-panel architecture powered by Zustand and Tailwind CSS.

### Changed
- Refactored `tsconfig.json` to ES2020 target to ensure native JS `BigInt` operations process perfectly without floating point limits.
- Optimized all component states to avoid unneeded re-renders on the custom canvas loop.

### Fixed
- ESLint and explicit TypeScript warnings (`any` types replaced with accurate interfaces).
- Fixed peer dependency issues across `react-latex-next` and React 19 by leveraging legacy resolution where strictly required.
