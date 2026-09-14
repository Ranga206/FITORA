# Fitora MVP Scope

---

## 1. Document Status

- **Status**: `PROPOSED`
- **Authority**: Human Project Team Review & Approval Required

This document provides a concise, 5-minute product overview of the proposed Minimum Viable Product (MVP) scope for **Fitora**. It serves as an orientation guide for teammates before application coding begins. 

All items are proposed recommendations. Nothing is authoritative or `FINAL` until explicitly approved by the human project team.

---

## 2. What is Fitora?

**Fitora** is a unified wellness and lifestyle platform designed to make healthy living approachable, sustainable, and consistent.

> **Eat Better • Move Better • Live Better** *(PROPOSED — NOT APPROVED)*

Unlike single-purpose apps that only count calories or log gym reps, Fitora integrates nutrition, physical fitness, and health education into one balanced experience without extreme dieting, excessive workout routines, or confusing complexity.

---

## 3. Problem and Purpose

### The Problem
People often juggle separate, disconnected tools:
- One app for meal planning and calorie counting
- A second app for gym workouts and exercise logging
- A third app for daily habit checklists
- Scattered web articles for fitness and nutrition advice
- Spreadsheets or notebooks to monitor long-term trends

This fragmentation causes cognitive friction and high dropout rates. In addition, most apps tell users *what* to do, but fail to explain *why*, making healthy routines feel like meaningless chores.

### The Purpose
Fitora unites these essentials in one place so users can:
1. Understand their baseline nutritional needs and track daily meals.
2. Follow guided workouts and log exercise sessions.
3. Learn the science and reasons behind healthy lifestyle choices.
4. Build daily lifestyle habits (hydration, sleep, activity).
5. View their consistency and progress over time.
6. Stay engaged through positive, non-punitive gamification.

---

## 4. Product Structure

Fitora is organized into **Three Primary Pillars** reinforced by **Three Supporting Systems**:

```text
┌─────────────────────────────────────────────────────────────┐
│                    THE BIG 3 PRIMARY PILLARS                │
│       [ 1. NUTRITION ]    [ 2. FITNESS ]    [ 3. AWARENESS ]│
└──────────────────────────────┬──────────────────────────────┘
                               │ supported by
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     SUPPORTING SYSTEMS                      │
│       [ PROGRESS ]        [ HABITS ]        [ GAMIFICATION ]│
└─────────────────────────────────────────────────────────────┘
```

### Primary Pillars (The Big 3)
1. **Nutrition**: Mindful food choices, calorie balance, and meal tracking.
2. **Fitness**: Exercise guidance, workout routines, and training logs.
3. **Awareness**: Understanding the biological and behavioral *why* behind habits.

### Supporting Systems
1. **Progress**: Visualizing trends and consistency over time.
2. **Habits**: Anchoring daily lifestyle routines.
3. **Gamification**: Encouraging daily consistency through XP, levels, streaks, and leagues.

> **Key Rule**: Gamification is strictly a supporting system, **not** a fourth pillar.  
> **AI Scope**: Artificial Intelligence (AI) is strictly **`FUTURE`** scope and is excluded from the MVP.

---

## 5. Nutrition (Primary Pillar 1)

The Nutrition pillar helps users understand personal energy needs, plan balanced meals, and build mindful eating habits.

| Feature Area | Status | Purpose & Description |
| :--- | :--- | :--- |
| **Nutrition Profile** | `PROPOSED` | Captures basic user context (age, sex, height, weight, activity level, goal) to establish baseline energy requirements. |
| **BMI Context** | `PROPOSED` | Calculates BMI as an initial reference screening metric. *Strictly an educational screening metric, not a medical diagnosis.* |
| **Calorie Estimation** | `PROPOSED` | Estimates daily caloric targets based on user goals (maintenance, deficit, or surplus). |
| **Meal Planning** | `PROPOSED` | Structures each day into standard meal slots (Breakfast, Lunch, Dinner, Snacks). |
| **Meal Logging** | `PROPOSED` | Allows users to record daily meals and foods consumed for nutritional awareness. |
| **Nutrition Tracking** | `PROPOSED` | Displays running daily totals of calories and macronutrients (protein, carbs, fat) against targets. |
| **Nutrition Education** | `PROPOSED` | Shares practical, in-app tips on foundational concepts (protein, hydration, whole foods). |

---

## 6. Fitness (Primary Pillar 2)

The Fitness pillar makes exercise structured, safe, approachable, and measurable for all experience levels.

| Feature Area | Status | Purpose & Description |
| :--- | :--- | :--- |
| **Exercise Library** | `PROPOSED` | Directory of foundational exercises with target muscles, descriptions, and proper execution cues. |
| **Workout Guidance** | `PROPOSED` | Structured, baseline workout routines for different experience levels. |
| **Workout Logging** | `PROPOSED` | Allows users to log active workouts (exercises, sets, reps, resistance weight, and duration). |
| **Workout History** | `PROPOSED` | Chronological log of past completed sessions and workout summaries. |
| **Fitness Education** | `PROPOSED` | Practical guidance on warmups, injury prevention, and safe training form. |
| **Consistency Tracking** | `PROPOSED` | Tracks weekly workout frequency and adherence to planned routines. |

---

## 7. Awareness (Primary Pillar 3)

Awareness is Fitora’s educational pillar and a key differentiator. It helps users understand core health concepts rather than simply checking off boxes.

### Explaining the "WHY", Not Only the "WHAT"
Most health apps tell users *what* tasks to do without explaining *why*. When habits feel arbitrary, users lose motivation. Awareness provides bite-sized, evidence-based lessons so users understand how the body works.

- **Nutrition Awareness** (`PROPOSED`): Explains energy balance, macronutrients, satiety, and whole foods.
- **Fitness Awareness** (`PROPOSED`): Explains progressive overload, muscle recovery, and cardio vs. strength training.
- **Lifestyle Awareness** (`PROPOSED`): Explains sleep quality, hydration, stress management, and daily recovery.
- **Educational Lessons** (`PROPOSED`): Short, 2-to-3 minute bite-sized lessons written in simple English without medical jargon.
- **Healthy Lifestyle Concepts** (`PROPOSED`): Clear explanations that dispel common fitness myths and build long-term health literacy.

---

## 8. Supporting Systems

Supporting systems reinforce the Big 3 pillars and encourage daily adherence:

### 8.1. Progress (`PROPOSED`)
- **Purpose**: Visualizes daily, weekly, and monthly trends across diet, exercise, and habits.
- **Focus**: Emphasizes long-term behavioral consistency rather than short-term scale weight fluctuations.

### 8.2. Habits (`PROPOSED`)
- **Purpose**: Provides daily checklists for key lifestyle routines (hydration, sleep, movement, reading lessons).
- **Focus**: Helps users turn positive wellness intentions into automatic daily routines.

### 8.3. Gamification (`PROPOSED`)
- **Purpose**: Encourages positive daily consistency through engaging, game-inspired elements.
- **Ethical Rule**: Rewards healthy, balanced consistency (logging meals, exercising, reading). It must **never** reward extreme dieting or excessive exercise.
- **Proposed Concepts**:
  - **XP**: Points earned by completing positive daily actions.
  - **Levels**: Milestones reflecting cumulative user effort over time.
  - **Streaks**: Counters tracking consecutive active days.
  - **Achievements**: Badges celebrating consistency milestones.
  - **Challenges**: Time-bound personal and community goals.
  - **Leagues**: Weekly cohorts for friendly competition based on consistent healthy activity.

> **Status Notice**: All exact XP amounts, level progression curves, streak rules, and league calculations are strictly **`TODO / UNDECIDED`**.

---

## 9. How the Parts Connect

Fitora forms a simple, cohesive daily lifestyle loop:

```text
               ┌───────────────────────────────┐
               │          THE BIG 3            │
               │  Nutrition • Fitness • Aware  │
               └──────────────┬────────────────┘
                              │
                    Daily User Actions
                              │
                              ▼
               ┌───────────────────────────────┐
               │      SUPPORTING SYSTEMS       │
               │  • Habits anchor routines     │
               │  • Progress shows trends      │
               │  • Gamification rewards effort│
               └───────────────────────────────┘
```

1. **Daily Action**: Users log meals in **Nutrition** and record workouts in **Fitness**.
2. **Understanding**: Users read short lessons in **Awareness** to understand *why* these actions matter.
3. **Daily Routine**: **Habits** anchor essential daily routines into simple checkboxes.
4. **Visual Trends**: **Progress** aggregates meals, workouts, and habits to show growth over time.
5. **Positive Reinforcement**: Completed actions award **XP**, build **Streaks**, unlock **Achievements**, and update weekly **Leagues**, motivating users to return each day.

---

## 10. MVP Boundary

| Scope Area | In Proposed MVP? | Details |
| :--- | :--- | :--- |
| **The Big 3 Pillars** | ✅ Yes (`PROPOSED`) | Nutrition, Fitness, and Awareness core tracking & education. |
| **Supporting Systems** | ✅ Yes (`PROPOSED`) | Progress analytics, Habit checklists, and Gamification mechanics. |
| **Artificial Intelligence (AI)** | ❌ No (`FUTURE`) | Excluded from MVP. No AI meal generators, computer vision, or AI coaching. |

---

## 11. Explicitly Undecided Items

The following items are unresolved and remain **`TODO / UNDECIDED`** awaiting human project team decisions:

- Exact BMR / calorie calculation formula (e.g., Mifflin-St Jeor vs. Harris-Benedict).
- Food database data source (curated seed catalog vs. external food API).
- Exercise library list, taxonomy, and media assets.
- Awareness lesson list and content authoring pipeline.
- Gamification math: exact XP values, level formulas, streak freeze policies, and league cohort sizes.
- Technical implementation details: database engine, build tools, API contracts, and schema design.

---

## 12. Human Approval

The human project team has sole decision authority for Fitora.

- This document is a proposal.
- No proposed item becomes authoritative until reviewed and approved as `FINAL` by the human team.
- Application coding, database creation, and API implementation must not begin without explicit human team approval.
