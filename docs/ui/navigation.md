# Navigation & Information Architecture: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> The navigation hierarchy and routing maps described below represent candidate proposals only. Final UI/UX behavior and routing remain **TODO / UNDECIDED**.

This document defines the information architecture, primary navigation patterns, URL routing tree, and responsive layouts for **Fitora**.

---

## 🗺️ Information Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                                 APP ROOT                               │
├───────────────────────────────────┬────────────────────────────────────┤
│           PUBLIC ROUTES           │          PROTECTED ROUTES          │
│  • /login                         │  • /onboarding (Initial Profile)   │
│  • /register                      │  • /dashboard  (Home Hub)          │
│  • /forgot-password               │                                    │
└───────────────────────────────────┼────────────────────────────────────┤
                                    │  THE THREE CORE PILLARS:           │
                                    │  • /nutrition (Meals & Macros)     │
                                    │  • /fitness   (Exercises & Logs)   │
                                    │  • /awareness (Lessons & Education)│
                                    │                                    │
                                    │  SUPPORTING SYSTEMS:               │
                                    │  • /habits    (Daily Checklist)    │
                                    │  • /progress  (Trends & Analytics) │
                                    │  • /leagues   (Weekly Standings)   │
                                    │  • /challenges(Quests & Badges)    │
                                    │                                    │
                                    │  ACCOUNT & CONFIGURATION:          │
                                    │  • /profile   (Biometrics)         │
                                    │  • /settings  (Preferences)        │
                                    └────────────────────────────────────┘
```

---

## 🖥️ Desktop Navigation Structure

On desktop viewports ($\ge 1024\text{px}$), Fitora utilizes a persistent **Left Navigation Sidebar** paired with a streamlined **Top Header Bar**:

### Left Sidebar:
- **Header**: Fitora Logo & Tagline.
- **Primary Nav Links**:
  - 🏠 **Dashboard** (`/dashboard`)
  - 🥗 **Nutrition** (`/nutrition`)
  - 🏋️ **Fitness** (`/fitness`)
  - 🧠 **Awareness** (`/awareness`)
  - ✅ **Habits** (`/habits`)
  - 📈 **Progress** (`/progress`)
  - 🛡️ **Leagues** (`/leagues`)
  - ⚔️ **Challenges** (`/challenges`)
- **Footer**: Profile badge, current Level indicator, and Settings trigger.

### Top Header Bar:
- Current Page Title & Breadcrumbs.
- 🔥 **Streak Indicator**: Current active streak with flame badge.
- ⚡ **XP Counter**: Current total XP and mini progress bar to next level.
- 🔔 Notification Bell.
- 👤 Profile Avatar Menu.

---

## 📱 Mobile Navigation Structure

On mobile viewports ($< 768\text{px}$), the sidebar converts into a **Bottom Tab Bar** containing the five highest-frequency actions:

| Tab Icon | Tab Label | Route Destination |
| :--- | :--- | :--- |
| 🏠 | **Home** | `/dashboard` |
| 🥗 | **Nutrition** | `/nutrition` |
| 🏋️ | **Fitness** | `/fitness` |
| ✅ | **Habits** | `/habits` |
| ☰ | **More** | Drawer menu linking to Awareness, Progress, Leagues, Settings |

---

## 🧭 Sub-Route Mapping

### Nutrition Module (`/nutrition`)
- `/nutrition`: Today's calorie breakdown, meal cards (Breakfast, Lunch, Dinner, Snack).
- `/nutrition/log`: Food search and portion entry modal.
- `/nutrition/plan`: Weekly meal planner.

### Fitness Module (`/fitness`)
- `/fitness`: Workout routine selection and recent workout history.
- `/fitness/active`: Full-screen active workout tracking session (sets, reps, rest timer).
- `/fitness/library`: Searchable exercise catalog with muscle filters.
- `/fitness/history`: Chronological workout session archives.

### Awareness Module (`/awareness`)
- `/awareness`: Category overview (Nutrition, Fitness, Lifestyle) with unread highlights.
- `/awareness/lesson/:slug`: Clean reading interface with key takeaways and completion button.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [UX Decision]**: Decide whether the active workout session should minimize into a floating persistent player bar when navigating to other screens.
- [ ] **TODO: [Mobile Decision]**: Determine whether "Awareness" should have its own dedicated tab on mobile instead of living inside the "More" drawer.
