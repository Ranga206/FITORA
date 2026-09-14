# Design System: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> The design tokens, color palette hex values, typography choices, and component rules described below represent candidate design proposals only. The final design system remains **TODO / UNDECIDED**.

This document defines the visual identity, design tokens, color palette, typography hierarchy, and component rules for **Fitora**.

---

## 🎨 Visual Philosophy: Modern Wellness SaaS

Fitora’s aesthetic is clean, energetic, and sophisticated. It avoids both cluttered spreadsheet-like interfaces and overly clinical medical visuals. 

### Design Pillars
1. **Calm Clarity**: Plenty of whitespace, balanced typography, and clean cards reduce cognitive fatigue.
2. **Intentional Accent Color Coding**: Each core pillar possesses an intuitive accent color to provide visual landmarks:
   - **Nutrition**: Fresh Emerald / Mint Green
   - **Fitness**: Energetic Coral / Electric Cyan
   - **Awareness**: Mindful Indigo / Soft Violet
   - **Gamification & Streaks**: Warm Amber / Radiant Gold
3. **Accessibility (WCAG 2.1 AA)**: High contrast ratios for all textual elements in both light and dark modes.

---

## 🌈 Color Palette (Tokens)

```text
┌─────────────────────────────────────────────────────────────┐
│                 PRIMARY BRAND COLOR SYSTEM                  │
├────────────────────────────────┬────────────────────────────┤
│ Token Name                     │ Planned Hex / Value        │
├────────────────────────────────┼────────────────────────────┤
│ `--color-bg-primary-dark`      │ `#0D1117` (Deep Obsidian)  │
│ `--color-bg-surface-dark`      │ `#161B22` (Sleek Slate)    │
│ `--color-bg-card-dark`         │ `#21262D` (Card Elevation) │
│ `--color-text-primary-dark`    │ `#F0F6FC` (Crisp Off-White)│
│ `--color-text-secondary-dark`  │ `#8B949E` (Muted Gray)     │
│                                │                            │
│ `--color-pillar-nutrition`     │ `#10B981` (Emerald Mint)   │
│ `--color-pillar-fitness`       │ `#06B6D4` (Electric Cyan)  │
│ `--color-pillar-awareness`     │ `#8B5CF6` (Mindful Violet) │
│ `--color-accent-gamify`        │ `#F59E0B` (Amber Gold)     │
│ `--color-accent-streak`        │ `#EF4444` (Flame Crimson)  │
└────────────────────────────────┴────────────────────────────┘
```

---

## ✍️ Typography Hierarchy

- **Primary Font Family**: Modern geometric sans-serif (e.g., `'Plus Jakarta Sans'`, `'Inter'`, or `'Outfit'`).
- **Headings**:
  - `Display 1`: 36px / Bold / Line-height 1.2
  - `Heading 1`: 28px / SemiBold / Line-height 1.25
  - `Heading 2`: 22px / SemiBold / Line-height 1.3
  - `Heading 3`: 18px / Medium / Line-height 1.35
- **Body & Captions**:
  - `Body Regular`: 15px / Regular / Line-height 1.5
  - `Body Medium`: 15px / Medium / Line-height 1.5
  - `Caption`: 12px / Regular / Line-height 1.4
  - `Metric Label`: 11px / SemiBold / Uppercase / Letter-spacing 0.05em

---

## 📏 Spacing & Sizing Scale

Fitora uses a base 4px/8px modular grid:

| Token | Pixels | Use Case |
| :--- | :--- | :--- |
| `--space-xs` | `4px` | Micro gaps, icon paddings |
| `--space-sm` | `8px` | Badge padding, compact card gaps |
| `--space-md` | `16px` | Standard element margins, container padding |
| `--space-lg` | `24px` | Card internal padding, grid column gaps |
| `--space-xl` | `32px` | Section margins, dashboard card separators |
| `--space-2xl` | `48px` | Page hero margins, modal padding |

---

## 🧱 Component Guidelines

### 1. Cards & Containers
- Border radius: `12px` or `16px` for smooth modern rounded corners.
- Borders: Subtle 1px solid border (`rgba(255, 255, 255, 0.08)` in dark mode).
- Glassmorphism: Subtle background blur (`backdrop-filter: blur(12px)`) on navigation bars and floating modals.

### 2. Interactive Buttons
- **Primary Action**: Solid accent fill with high-contrast text, subtle hover lift (`transform: translateY(-1px)`).
- **Secondary Action**: Outlined border with transparent background, accent color on hover.
- **Ghost Action**: Borderless with subtle hover background highlight.

### 3. Data Visualization & Progress Bars
- Smooth rounded progress bars (`border-radius: 9999px`).
- Animated transition fills when updating calories or completed habits (`transition: width 0.4s ease-out`).

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Design Decision]**: Finalize exact web font selection from Google Fonts (`Plus Jakarta Sans` vs `Outfit`).
- [ ] **TODO: [Design Decision]**: Finalize complete light theme color token mapping for full light/dark toggle support.
- [ ] **TODO: [UX Decision]**: Select animation library or pure CSS keyframes for streak flame micro-animations.
