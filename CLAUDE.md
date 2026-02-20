# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gloria Pulse — a cinematic HTML pitch deck for hotel executives at Gloria Hotels & Resorts. Presents the case for a QR-code-based guest feedback system. 13 slides, zero dependencies, no build step.

## Running

Open `index.html` in a browser, or use a local server:
```bash
python3 -m http.server 8000
```
No package.json, no build tools, no npm.

## Architecture

**Single-page static presentation** built with vanilla HTML/CSS/JS.

```
index.html              ← All 13 <section class="slide"> elements
css/
  variables.css         ← Design tokens (colors, fonts, spacing, easing)
  base.css              ← Shared animation system, reveal classes, UI chrome
  slides/*.css          ← Per-slide styling (hero.css, quote.css, pilot.css, etc.)
js/
  engine.js             ← Slide navigation (keyboard, click, touch/swipe)
  carousel.js           ← Reviews auto-rotate carousel (slide 5)
  counters.js           ← Animated number count-up (requestAnimationFrame)
  reveals.js            ← Staggered element reveals (.rv, .rv-scale, .vis)
extracted_images/       ← All image assets
```

**JS modules use the IIFE pattern** — each file exposes a global object (Engine, Carousel, Counters, Reveals). `index.html` calls `Engine.init()` which orchestrates everything.

**Reveal system:** Elements with `.rv` or `.rv-scale` classes start invisible. `reveals.js` adds `.vis` when the parent slide becomes active. Stagger delays via `.d1`–`.d7` (100ms–1000ms).

## Design System

Documented in `.interface-design/system.md`. Key principles:

- **Palette:** Deep green (`--green-deep`), gold (`--gold`), cream/parchment surfaces, chocolate text
- **Typography:** Playfair Display (headings) + Cormorant Garamond (body), responsive via `clamp()`
- **Depth:** Surface color shifts only — no box-shadows (flat portfolio aesthetic). Exception: phone mockup on solution slide
- **Signature element:** The Gold Rule — thin 1px gold line used as dividers, stat underlines, and visual thread
- **Animation:** Slide transitions 800ms fade+scale; element reveals 700ms fade+translate; counters 1.5s ease-out

## Slide Patterns

- **Full-bleed:** Image covers viewport, text overlaid on gradient (hero, team)
- **Statement:** Deep green bg, centered serif quote, gold rules (quote, silence)
- **Split:** 50/50 or 60/40 layout, image + text (solution, pilot)
- **Data:** Large stat numbers with gold underlines, animated on entry (impact)
- **Timeline:** Horizontal steps with gold connecting line (story)

## Conventions

- CSS class names: `.slide-{name}` for slide-specific styles
- Slide data attributes: `data-count`, `data-prefix`, `data-suffix` for counter config; `data-idx` for carousel
- Navigation: arrow keys, spacebar, click (left 1/3 = back, right 2/3 = forward), touch swipe
- All content is in Turkish
