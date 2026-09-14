# Fitora

### Eat Better • Move Better • Live Better (PROPOSED — NOT APPROVED)

Fitora is a wellness and lifestyle platform built around three core pillars—**Nutrition**, **Fitness**, and **Awareness**—supported by **Habit Tracking**, **Progress Analytics**, and **Gamification**.

The goal is to help users build healthier and more consistent lifestyle habits through personalized guidance, tracking, education, and engaging challenges.

---

## 🚀 Project Vision

Most fitness and nutrition applications focus on only one isolated area.

Fitora brings the fundamental elements of wellness together in a unified experience:

- **Nutrition & Meal Planning**: Understand caloric requirements, plan meals, and log food.
- **Fitness & Workout Guidance**: Exercise directory, structured workouts, and session tracking.
- **Awareness & Education**: Learn the *why* behind habits, nutrition, and physical activity.
- **Daily Habit Tracking**: Monitor hydration, consistency, sleep, and personal wellness routines.
- **Progress & Analytics**: Weekly and monthly trend visualization across all pillars.
- **Gamification**: Streaks, XP, levels, achievements, challenges, and competitive leagues.

Instead of simply showing passive information, Fitora inspires and encourages users to consistently act on it.

---

## 🎯 Problem

People often juggle multiple separate applications:

- One app for diet and meal planning
- One app for calorie tracking
- One app for workout planning and logging
- One app for daily habit reminders
- Scattered websites for health and fitness articles
- Fragmented spreadsheets for monitoring long-term progress

This fragmentation creates cognitive overload, friction, and high dropout rates. Fitora solves this by integrating these workflows into a cohesive, balanced platform.

---

## 💡 Proposed Solution

Fitora provides a unified platform where users can:

1. Create a personal profile and define realistic wellness goals.
2. Calculate BMI context and estimate personalized daily caloric needs.
3. Plan and log daily meals and macronutrients.
4. Discover exercises and track workouts with set/rep/weight logging.
5. Gain awareness through educational articles explaining the science behind lifestyle habits.
6. Track custom and preset daily lifestyle habits.
7. Monitor holistic progress across nutrition, fitness, and habits.
8. Build streaks and earn XP for positive daily actions.
9. Unlock achievements and join seasonal challenges.
10. Compete in weekly leagues focused on healthy consistency.

---

## ⭐ The Three Core Pillars

Fitora is anchored by three primary pillars:

### 1. 🥗 Nutrition
- User nutrition profile
- BMI-based nutritional context (used strictly as an initial screening/context metric, never a medical diagnosis)
- Daily calorie and macronutrient estimation
- Meal planning and food library
- Meal tracking and logging
- Basic nutrition education

### 2. 🏋️ Fitness
- Exercise education and library
- Structured workout guidance and categories
- Workout tracking (exercises, sets, reps, weight, duration)
- Workout history and logs
- Consistency and frequency tracking

### 3. 🧠 Awareness
- Educational articles and bite-sized lessons
- Nutrition awareness and dietary concepts
- Fitness awareness and training principles
- Lifestyle awareness (sleep, recovery, hydration, stress)
- Helping users understand **WHY** certain choices matter, not merely **WHAT** to do

---

## ⚙️ Supporting Systems

To reinforce the three core pillars and sustain long-term adherence:

### ✅ Habit Tracking
- Daily habit checklists (hydration, workouts, nutrition, reading, sleep)
- Custom user-defined habits
- Completion status and streak recording

### 📈 Progress Tracking
- Daily, weekly, and monthly activity trends
- Calorie and nutrition adherence curves
- Workout frequency and volume metrics
- Habit consistency rates

### 🔥 Gamification & Leagues
- **XP (Experience Points)**: Awarded for healthy daily actions (logging meals, completing workouts, reading lessons).
- **Levels**: Progressive milestones reflecting cumulative effort.
- **Streaks**: Daily consistency indicators.
- **Achievements & Badges**: Earned for hitting consistency milestones.
- **Challenges**: Time-bound personal and community goals.
- **Competitive Leagues**: Tiered rankings (e.g., Bronze, Silver, Gold) rewarding consistent healthy participation—not extreme dieting or overtraining.

---

## 🔮 Scope Boundaries & Future Scope

| In Current Scope (Initial Releases) | Future Scope (Optional Extensions) |
| :--- | :--- |
| Core Pillars (Nutrition, Fitness, Awareness) | 🤖 **AI-Driven Personalization & Automated Generation** |
| Habit & Progress Tracking | ⌚ **Direct Wearable Hardware Sync (Garmin, Apple Watch)** |
| Gamification, XP, Streaks, Leagues | 🌐 **Public Social Feed & Media Sharing** |
| Web Application (REST API + Relational DB) | 📱 **Native Mobile Apps (iOS/Android)** |

> **Important**: Artificial Intelligence (AI) is **NOT** part of the initial implementation. All initial tracking, formulas, and recommendations are based on established dietary calculations and structured content libraries. AI is reserved as a future optional extension.

---

## 🏗️ System Architecture Overview

Fitora follows a decoupled, layered application architecture:

```text
┌─────────────────────────────────────────────────────────┐
│              Frontend Client (Web / SPA)                │
└────────────────────────────┬────────────────────────────┘
                             │ REST API (JSON)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend API Layer                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │             Security & Authentication             │  │
│  └─────────────────────────┬─────────────────────────┘  │
│  ┌─────────────────────────▼─────────────────────────┐  │
│  │           Service Layer (Business Logic)          │  │
│  └─────────────────────────┬─────────────────────────┘  │
│  ┌─────────────────────────▼─────────────────────────┐  │
│  │                 Data Repositories                 │  │
│  └─────────────────────────┬─────────────────────────┘  │
└────────────────────────────┼────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────┐
│               Relational Database (SQL)                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```text
FITORA/
├── README.md              # Project overview and orientation
├── CONTRIBUTING.md        # Contribution guidelines and workflow
├── PROJECT_STATUS.md      # Development status and pending decisions
├── .gitignore             # Ignored files for web, backend, and database
├── .env.example           # Configuration environment template
│
├── frontend/              # Frontend client application (placeholder)
│   └── .gitkeep
├── backend/               # Backend REST API service (placeholder)
│   └── .gitkeep
├── database/              # Database migration and seed scripts (placeholder)
│   └── .gitkeep
│
└── docs/                  # Comprehensive project documentation
    ├── README.md          # Documentation master index
    ├── project/           # Vision, problem, objectives, scope, requirements
    ├── architecture/      # System design, flows, tech stack, security
    ├── features/          # Detailed documentation for all pillars & systems
    ├── database/          # ER diagram, schema design, and schema placeholder
    ├── api/               # API design guidelines and endpoint specifications
    ├── ui/                # Design system, navigation hierarchy, screen specs
    └── development/       # Environment setup, git workflow, guidelines, roles
```

---

## 📖 Documentation Index

For detailed specifications and architectural documentation, explore the [docs/](docs/README.md) directory:

- [Project Specifications](docs/project/README.md)
- [Architecture & Tech Stack](docs/architecture/README.md)
- [Feature Specifications](docs/features/README.md)
- [Database Design & Schema](docs/database/README.md)
- [API Specifications](docs/api/README.md)
- [UI & Design System](docs/ui/README.md)
- [Development Guides](docs/development/README.md)
