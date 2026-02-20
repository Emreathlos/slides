# Gloria Pulse — HTML Presentation Deck Design

**Date:** 2026-02-20
**Product:** Gloria Pulse pitch deck for hotel executives
**Approach:** Single-file cinematic HTML deck (Approach A)

## Context

Converting a 15-slide Google Slides export (.pptx) into a crafted HTML presentation. The original has good content and narrative but generic slide design. The HTML version should feel like a luxury hotel portfolio — not a tech pitch.

## Design System

Full token architecture, typography, spacing, and component patterns documented in `.interface-design/system.md`.

**Key decisions:**
- Palette: Deep green, gold, cream, charcoal — drawn from hotel interiors
- Typography: Playfair Display (display) + Inter (body)
- Depth: Surface color shifts only, no shadows (portfolio feel)
- Signature: Gold Rule — thin gold line as section divider, stat underline, and visual thread
- Animation: Subtle fades, staggered reveals, animated counters

## Slide Architecture (13 slides)

### 1. HERO — Title
- Full-bleed poolside photo with right-side dark gradient overlay
- Gloria Pulse logo top-left
- "Memnuniyetin Yeni Dijital İmzası" in Playfair Display, right-aligned
- Gold rule animates in under title
- QR code badge bottom-right

### 2. THE SILENT THREAT — Problem Quote
- Deep green background
- Large centered italic serif quote: "Gloria'nın en büyük rakibi..."
- Gold rules above and below
- Quote fades in on entry

### 3. THE ICEBERG — Visual Metaphor
- Cream background
- Full-width iceberg diagram image, centered
- Labels fade in with stagger

### 4. FIRDEVS HANIM — The Story
- Cream background
- Title: "Küçük Bir Sorun Nasıl Bir Kabusa Dönüşüyor?"
- Horizontal 3-step timeline with gold connecting line
- Each step card slides in sequentially: sink problem → too much hassle → vacation ruined
- Icons: wrench, phone-off, storm cloud (CSS/emoji)

### 5. REAL EVIDENCE — Tripadvisor Review
- Cream background
- Title: "Varsayımlar Değil, Gerçekler"
- Tripadvisor review screenshot as a card with subtle border
- Minimal design — let the evidence speak

### 6. WHY SILENCE? — The Insight
- Deep green background
- Large: "Neden Şikayet Etmiyorlar?"
- Below: "Çünkü tatillerini 'yöneticiyle' konuşarak bölmek istemiyorlar."
- Faded poolside image at 8% opacity as background texture

### 7. THE SOLUTION — Gloria Pulse
- Split layout: left 45% phone mockup (floating), right 55% text
- Title: "Uygulama Yok. Üyelik Yok. Sadece Çözüm Var."
- Three feature pills with staggered reveal: Şeffaf Süreç, Otomatik Planlama, Kolaylık
- Cream background

### 8. HOW IT WORKS — 3-Step Flow
- Full-width flow diagram image
- Title: "Saniyeler İçinde Çözüm: Misafirden Personele Doğrudan Hat"
- Cream background

### 9. PILOT RESULTS — Data
- Split: left = real feedback screenshot (star ratings), right = animated stats
- Stats: "50+" responses, "3" solved problems, "8 Hafta" duration, "30 QR" codes
- Each stat has gold rule underline, counter animates on entry
- Title: "Canlı Veri"

### 10. COST — Resource Table
- Cream background
- Title: "Düşük Maliyet, Büyük Etki"
- Elegant card-style rows (not a spreadsheet grid)
- Each row: icon + role + description + effort
- Total row highlighted with gold-glow background

### 11. EXPECTED IMPACT — Big Numbers
- Three large stat cards side by side
- %30 (green bg) | %10 (gold bg) | %5 (stone bg)
- Numbers count up on entry
- Gold rule under each number
- Subtitle: "Daha Az Operasyonel Yük, Daha Mutlu Misafir"

### 12. TEAM — Who We Are
- Full-bleed team illustration
- Dark overlay bar at bottom with quote: "En tehlikeli misafir bağıran değil, susandır."
- Gold text on dark semi-transparent bar

### 13. NEXT STEPS — Call to Action
- Cream background
- Title: "Yönetim Onayı ve Sonraki Adımlar"
- Three numbered action cards, staggered entry:
  1. Verde'de Tüm Odalarda Pilot Onayı
  2. Test Sonucuna Göre Bütün Otellerde Kullanıma Açılması
  3. Zamanlama: **Hemen**
- Gloria QR code centered below

## Technical Spec

### Single File: `index.html`
- Inlined `<style>` with full CSS custom properties
- Inlined `<script>` for navigation and animations
- Google Fonts loaded via `<link>` (Playfair Display + Inter)
- Images referenced from `extracted_images/` folder

### Navigation
- Arrow keys (left/right), click, spacebar to advance
- Escape for overview (optional)
- Slide counter bottom-right: `3 / 13` in muted text
- No visible nav buttons — clean presentation stage

### Animations
- Slide transitions: 800ms fade with 12px upward drift
- Element reveals: IntersectionObserver triggers on slide entry
- Stat counters: requestAnimationFrame count-up over 1.5s with easeOut
- Staggered items: 100ms delay between siblings
- Gold rule draw: width from 0% to 100% over 600ms

### Image Handling
- Images referenced by relative path from `extracted_images/`
- Hero image: `object-fit: cover` on full viewport
- Phone mockups: max-height constrained, centered
- Screenshots: bordered card treatment

### Browser Support
- Modern browsers (Chrome, Safari, Firefox, Edge)
- 16:9 aspect ratio optimized (1920x1080 target)
- CSS `aspect-ratio` + viewport units for scaling
