# Project Scope: Fitora

This document defines the strict boundaries of what is included within the initial development milestone of **Fitora**, and what is deferred to subsequent releases.

---

## 🧭 Scope Classification Matrix

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FITORA INITIAL SCOPE                            │
│                                                                        │
│   ┌─────────────────────┬─────────────────────┬────────────────────┐   │
│   │     NUTRITION       │       FITNESS       │     AWARENESS      │   │
│   │  • Profile & BMI    │  • Exercise Library │  • Curated Lessons │   │
│   │  • Calorie Estimates│  • Workout Tracking │  • Nutrition "Why" │   │
│   │  • Meal Logging     │  • Workout History  │  • Fitness "Why"   │   │
│   └─────────────────────┴─────────────────────┴────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                      SUPPORTING SYSTEMS                        │   │
│   │   • Habit Tracking (daily checks & streaks)                    │   │
│   │   • Progress Analytics (daily/weekly/monthly charts)           │   │
│   │   • Gamification (XP, Levels, Streaks, Badges, Leagues)        │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ Future Optional Extensions
┌────────────────────────────────────────────────────────────────────────┐
│                         FUTURE SCOPE (DEFERRED)                        │
│   • Artificial Intelligence & Machine Learning                         │
│   • Direct Wearables & Sensor Hardware Integration                     │
│   • Social Feeds, Direct Messaging & Public Community Boards           │
│   • Mobile Native Apps (iOS / Android App Store releases)             │
│   • Smart Contracts / Blockchain integrations                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ In-Scope: Phase 1 (Core Implementation)

### 1. The Big 3 Core Pillars

#### Pillar 1: Nutrition (First Implementation Milestone)
> **Approved Direction**: Nutrition logging is the first core pillar implementation milestone.
- **Target Audience**: Intended for **adults and teenagers**.
- **Meal Structure**: Support for 4 standard meal slots: **Breakfast, Lunch, Dinner, and Snacks**.
- **Tracked Nutrients**: Track **calories, protein, carbohydrates, and fats** from logged foods.
- **Energy Estimation**:
  - All calculated energy requirements must be explicitly identified as **estimates**.
  - Must use **age-appropriate approaches** suitable for adults and teenagers.
  - Applicability to **Indian users** must be reviewed before selecting final equations.
- **Contract & Schema Preservation**:
  - The existing profile API (`/api/v1/profile`) and database schema (`profiles`) must remain **unchanged**.
  - Nutrition features consume existing profile biometrics read-only and record meal logs independently.
- **Explicitly Out of Scope**: AI meal recognition (photo/vision parsing) and unapproved gamification mechanics remain strictly out of scope.
- **Pending Decisions (TODO / UNDECIDED)**: Final equation selection, handling of undisclosed sex (`prefer_not_to_say`), activity classification tiers, and personalized calorie-target rules.

#### Pillar 2: Fitness
- Categorized exercise library (cardio, strength, mobility, bodyweight).
- Workout guidance with instructions and target muscle groups.
- Workout tracking (exercises, sets, reps, weight lifted, session duration).
- Workout history log and frequency calendar.
- Consistency tracking.

#### Pillar 3: Awareness
- Curated educational articles organized by topic (Nutrition, Fitness, Lifestyle).
- Explanations of core physiological principles (energy balance, muscle hypertrophy, sleep cycles, hydration).
- Focus on answering the **"WHY"** behind wellness choices, empowering lasting cognitive change.

### 2. Supporting Systems

- **Habit Tracking**: Daily habit checklists (water intake, 10k steps, sleep target, reading), custom habit creation, and habit streaks.
- **Progress Tracking**: Holistic analytics dashboards displaying daily completion, weekly trends, calorie adherence, and workout frequency.
- **Gamification**:
  - XP awarded for positive actions (logging meals, completing workouts, reading articles).
  - Progressive user levels.
  - Daily active streaks.
  - Milestone achievements and badges.
  - Time-limited personal and community challenges.
  - Weekly competitive leagues grouped by consistent activity.

### 3. Application Infrastructure
- Responsive Web Application interface.
- Backend REST API with authentication and authorization.
- Relational database schema with data integrity and audit fields.

---

## 🚫 Out-of-Scope: Explicitly Deferred to Future Scope

### 🤖 Artificial Intelligence (AI) & Machine Learning
- **Status**: **Strictly Future Scope**.
- No automated LLM meal planners or conversational AI agents.
- No computer vision / photo-based calorie estimation.
- No machine-learning predictive workout generation.
*Rationale*: A robust, deterministic, and verified foundation must precede any speculative AI layers.

### ⌚ Wearable Hardware Integrations
- No Bluetooth device drivers or direct SDK connections with Apple Watch, Garmin, Whoop, or Fitbit.

### 👥 Public Social Networking
- No public user timeline, photo posting, comments, or direct messaging between users.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Scope]**: Determine whether multi-language internationalization (i18n) is in scope for Phase 1 or deferred to Phase 2.
- [ ] **TODO: [Scope]**: Determine whether user data export (CSV/JSON download) should be included in Phase 1 profile management.
