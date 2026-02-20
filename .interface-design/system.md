# Gloria Pulse — Presentation Design System

## Intent

**Human:** Hotel executive (GM/operations director) at Gloria Hotels & Resorts. Boardroom setting, post-lunch. Has seen many vendor pitches. Cares about guest satisfaction, operational efficiency, low complexity.

**Task:** Understand the silent-guest problem, see a credible solution, approve a pilot. One decision.

**Feel:** Walking through their own hotel lobby. Polished stone, warm wood, gold catching light. Unhurried, confident, luxurious. Like turning pages in a leather-bound portfolio.

## Direction

Luxury hotel portfolio — warm cream surfaces, deep green and gold typography, generous whitespace that signals confidence. Photography is full-bleed and commands attention. Data is large, confident numbers. No bullets. No clutter.

## Signature Element

**The Gold Rule** — A thin horizontal gold line (`1px`, `#C9A84C`) that appears as:
- Section dividers between content blocks within slides
- Underlines beneath key statistics
- The visual thread connecting the entire deck
- Transition accent (gold line draws across during slide changes)

Like the gold trim on crown molding in a luxury hotel room.

## Palette

```css
:root {
  /* Surfaces */
  --cream: #FAF8F5;           /* Egyptian cotton — primary background */
  --cream-warm: #F5F0EA;      /* Slightly deeper — card surfaces */
  --stone: #B8B2A8;           /* Marble countertop — borders, muted elements */
  --stone-light: #D4CFC8;     /* Lighter stone — subtle separators */

  /* Foreground */
  --charcoal: #1A1A1A;        /* Evening wear — primary text */
  --charcoal-soft: #3D3D3D;   /* Secondary text */
  --charcoal-muted: #6B6B6B;  /* Tertiary/metadata text */

  /* Brand */
  --green-deep: #1B4332;      /* Hotel gardens — headings, dark backgrounds */
  --green-medium: #2D6A4F;    /* Lighter garden — hover states, accents */
  --gold: #C9A84C;            /* Lobby fixtures — signature element, accents */
  --gold-soft: #D4B86A;       /* Softer gold — hover states */
  --gold-glow: rgba(201, 168, 76, 0.15); /* Gold wash — highlight backgrounds */

  /* Semantic */
  --terracotta: #C4745A;      /* Mediterranean tile — warning/attention only */
  --success: #2D6A4F;         /* Reuse green-medium */
}
```

## Typography

```css
/* Headings: Playfair Display — editorial luxury, high contrast serifs */
--font-display: 'Playfair Display', Georgia, serif;

/* Body: Inter — precise, readable, disappears into content */
--font-body: 'Inter', -apple-system, sans-serif;

/* Scale (presentation context — large screens) */
--text-hero: 4rem / 1.05;        /* Title slides, single statements */
--text-headline: 2.75rem / 1.15;  /* Slide titles */
--text-subhead: 1.75rem / 1.3;    /* Section subtitles */
--text-body: 1.25rem / 1.6;       /* Descriptions, table content */
--text-label: 0.875rem / 1.4;     /* Metadata, small labels */
--text-stat: 5.5rem / 1;          /* Large statistics — extra bold */

/* Tracking */
--tracking-tight: -0.02em;   /* Headlines */
--tracking-normal: 0;        /* Body */
--tracking-wide: 0.08em;     /* Labels, uppercase text */
```

## Spacing

```css
--space-unit: 8px;

--space-xs: 4px;      /* Micro — icon gaps */
--space-sm: 8px;      /* Tight — within compact elements */
--space-md: 16px;     /* Standard — component internal padding */
--space-lg: 32px;     /* Section — between content blocks */
--space-xl: 64px;     /* Major — between slide sections */
--space-2xl: 96px;    /* Breathing — slide padding from edges */
--space-3xl: 128px;   /* Dramatic — hero spacing */
```

## Depth Strategy

**Surface color shifts** — No drop shadows. Hierarchy established through subtle background tint changes. Cream → warm cream → stone-light. This matches the flat, confident aesthetic of a printed portfolio.

Exception: The phone mockup on the solution slide gets a single subtle shadow to float it above the surface.

## Border Treatment

```css
--border-subtle: 1px solid rgba(180, 170, 155, 0.2);   /* Whisper — table rows */
--border-standard: 1px solid rgba(180, 170, 155, 0.35); /* Standard — card edges */
--border-gold: 1px solid #C9A84C;                        /* Signature — gold rule */
--border-gold-thick: 2px solid #C9A84C;                  /* Emphasis — stat underlines */
```

## Border Radius

```css
--radius-sm: 4px;    /* Buttons, pills */
--radius-md: 8px;    /* Cards, containers */
--radius-lg: 16px;   /* Large cards, image frames */
```

Sharper than typical — this is a corporate luxury context, not a friendly consumer app.

## Animation

```css
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-decel: cubic-bezier(0, 0, 0.2, 1);

--duration-fast: 200ms;     /* Hover states */
--duration-normal: 400ms;   /* Element reveals */
--duration-slow: 800ms;     /* Slide transitions */
--duration-counter: 1500ms; /* Counting animations */
```

- Slide transitions: Fade with subtle upward drift (12px)
- Element reveals: Staggered fade-in with 100ms delay between items
- Stat counters: Ease-out count from 0 to target over 1.5s
- Gold rule: Draws left-to-right on slide entry (width animation)

## Slide Patterns

### Full-Bleed Image Slide
Image covers entire viewport. Content overlaid on gradient (linear-gradient from transparent to rgba(26,26,26,0.7)). Text in cream/gold.

### Statement Slide
Deep green (`--green-deep`) background. Single large serif quote centered. Gold rule above and below. Maximum whitespace.

### Split Slide
60/40 or 50/50 horizontal split. One side: image or visual. Other side: text content on cream. Vertical gold rule as divider.

### Data Slide
Cream background. Large stat numbers in `--green-deep` with gold underlines. Supporting text in `--charcoal-soft`. Stats animate on entry.

### Timeline Slide
Horizontal flow with connected steps. Gold connecting line. Each step is a card on cream-warm surface.

## Component Patterns

### Stat Card
```
┌─────────────────┐
│                  │
│      %30         │  ← --text-stat, --green-deep
│  ════════════    │  ← gold rule (2px)
│  Çağrı Azalma   │  ← --text-body, --charcoal-soft
│                  │
└─────────────────┘
```

### Timeline Step
```
┌──────────────┐
│    [icon]     │  ← 48px, --green-deep
│              │
│  Step title   │  ← --text-subhead, --charcoal
│  Description  │  ← --text-body, --charcoal-soft
└──────────────┘
     │
     ● ──────── gold line ──────── ●
```

### Resource Row (Cost Table)
```
┌──────────────────────────────────────────────┐
│  [icon]  Role Name  │  Description  │  Effort │
│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │  ← border-subtle
```

### Navigation
Minimal — slide counter bottom-right (`3 / 13`), small dot indicators. Keyboard arrows + click to advance. No visible prev/next buttons (clean stage).

## Images

All images referenced from `extracted_images/` directory:
- slide1 hero: poolside luxury photo
- slide1 logo: Gloria Pulse wordmark
- slide1 qr: Gloria QR code (bottom-right badge on final slide)
- slide3 iceberg: complaint iceberg metaphor
- slide4 review: Tripadvisor screenshot (evidence)
- slide7 phone: Gloria Pulse app mockup
- slide8 flow: Scan → Select → Solve diagram
- slide9 phone: Live app screenshot
- slide10 data: Real feedback data (star ratings)
- slide12 palette: Brand color circles
- slide14 team: Team illustration
- slide15 qr: Gloria branded QR code
