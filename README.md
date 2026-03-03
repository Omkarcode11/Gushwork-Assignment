# Mangalam Industries - Assessment Submission

A premium, highly responsive landing page for Mangalam Industries (HDPE Piping Solutions), built strictly with vanilla HTML5, CSS3, and JavaScript. This project was developed to meet the requirements of the "Gushwork-Assignment" design specifications.

## 🚀 Key Features & Implementation Details

### 1. Sticky Header Functionality

- **Dynamic Scroll States**: Implemented a 3-stage scroll manager for the header.
  - **Natural State**: Fixed at the top for branding.
  - **Hidden State**: Slides out during the "first fold" scroll to provide an unobstructed view of Hero content.
  - **Sticky State**: Slides back in with a glassmorphism blur and deep shadow once the user scrolls past the 80vh threshold.
- **Performance**: Uses GPU-accelerated CSS `transform` for buttery-smooth animations.

### 2. Interactive Image Carousel with Zoom

- **Carousel Logic**: A fully functional product gallery with manual navigation (thumbnails, prev/next buttons) and automatic cycling.
- **Dynamic Zoom**: Developed a custom `magnify` effect using cursor coordinate tracking (`mousemove`). The main image scales and pans its `transform-origin` in real-time, allowing users to inspect product details without external libraries.

### 3. Responsive Design

- **Mobile-First Approach**: Optimized specifically for various breakpoints:
  - **Desktop (>1024px)**: Full multi-column grids and high-density layouts.
  - **Tablet (800px)**: Refined layouts, converting dense grids into readable columns or interactive sliders where appropriate (e.g., Applications slider).
  - **Small Mobile (360px)**: Deeply optimized layouts for ultra-narrow devices (specifically the Trust Bar row preservation and centered Contact Form).

### 4. Technical Excellence

- **Zero Dependencies**: 100% vanilla code. No jQuery, no React, no external libraries.
- **Code Quality**: Organized with semantic HTML5 elements, modular CSS sections, and throttled JavaScript event listeners to prevent main-thread jank.
- **Animations**: Integrated `IntersectionObserver` for "scroll-revealing" fade-in effects across all major content blocks.

## 📂 Project Structure

- `index.html`: Semantic structure with SEO meta-tags and branding.
- `style.css`: Comprehensive design system with variable-based colors and responsive media queries.
- `script.js`: Interactive logic including slider engines, modal managers, and the coordinate-based zoom effect.

## 🛠️ How to View

Simply open the `index.html` file in any modern web browser.

---
