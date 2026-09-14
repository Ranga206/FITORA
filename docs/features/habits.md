# Supporting System: Habit Tracking

This document outlines the functional and domain specifications for the **Habit Tracking** system in **Fitora**.

---

## ✅ Overview & Purpose

Habit Tracking is a foundational supporting system designed to convert intentional wellness choices into automatic, sustained daily routines.

By integrating habits directly with Nutrition, Fitness, and Awareness, Fitora prevents habit tracking from becoming a disconnected chore.

---

## 📋 Functional Capabilities

### 1. Preset System Habits
Fitora comes preloaded with evidence-supported wellness habits that directly map to the core pillars:

| Habit Name | Pillar Link | Target Rule | Default Frequency |
| :--- | :--- | :--- | :--- |
| **Hydration Goal** | Lifestyle / Nutrition | Drink 2.5L / 8 glasses of water | Daily |
| **Log All Meals** | Nutrition | Record Breakfast, Lunch, Dinner | Daily |
| **Active Movement** | Fitness | Complete scheduled workout or walk | 4–5 Days / Week |
| **Learn & Aware** | Awareness | Read 1 educational lesson | 3 Days / Week |
| **Sleep Discipline** | Lifestyle | Achieve 7–8 hours of restful sleep | Daily |

### 2. Custom User-Defined Habits
Users can create personal habits to fit their unique lifestyle needs:
- Habit Title & Description.
- Category (Nutrition, Fitness, Mindfulness, Lifestyle, Other).
- Target Frequency (Every Day, Specific Days of Week, X times per week).
- Optional target quantity (e.g., "10,000 steps" or "20 minutes meditation").

### 3. Daily Checklist & Interaction
- Dashboard habit widget displays habits scheduled for the current date.
- One-click checkmark toggle to complete a habit.
- Real-time progress bar showing daily completion percentage (e.g., 4/5 completed).

### 4. Habit Streaks & Continuity
- **Individual Habit Streak**: Number of consecutive scheduled days a specific habit was completed.
- **Master Daily Streak**: Incrementing count indicating that at least one core habit was performed every consecutive day.
- **Grace Policy / Streak Freeze**: To avoid demoralizing users due to illness or emergency travel, users can utilize limited streak freezes earned through consistency.

---

## 🎮 Gamification Integration (EXAMPLE ONLY — NOT A FITORA RULE)

> **NOTICE: EXAMPLE ONLY — NOT A FITORA RULE**  
> Any points or rewards listed below are non-binding illustrative examples. Actual gamification rules and values remain **TODO / UNDECIDED**.

- Checking off a scheduled habit: XP award (Example Only).
- Completing scheduled daily habits: Bonus XP (Example Only).
- Achieving consecutive habit days: Consistency badge and streak bonus (Example Only).

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Streak Decision]**: Finalize streak freeze mechanics: How many freezes can a user hold at once (e.g., maximum 2 freezes), and how are freezes earned or refilled?
- [ ] **TODO: [UX Decision]**: Decide whether users can reorder habits manually on their daily dashboard list.
- [ ] **TODO: [Archive Decision]**: Define habit archival and deletion rules (e.g., preserving historical logs when a habit is archived).
