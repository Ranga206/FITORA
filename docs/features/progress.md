# Supporting System: Progress Tracking

This document outlines the functional specifications for the **Progress Tracking** and analytics system of **Fitora**.

---

## 📈 Overview & Purpose

Progress Tracking is a vital supporting system in Fitora. It synthesizes user actions across all three core pillars—Nutrition, Fitness, and Awareness—into clear, encouraging, visual feedback.

Rather than fixating solely on scale weight, Fitora’s progress tracking emphasizes behavioral trends, habit consistency, nutritional balance, and training volume.

---

## 📊 Analytics Dimensions

```text
┌─────────────────────────────────────────────────────────────┐
│                 PROGRESS ANALYTICS MATRIX                   │
├───────────────────┬─────────────────────┬───────────────────┤
│     NUTRITION     │       FITNESS       │      HABITS       │
│     PROGRESS      │      PROGRESS       │    CONSISTENCY    │
├───────────────────┼─────────────────────┼───────────────────┤
│ • Calorie Intake  │ • Weekly Frequency  │ • Daily Checklist │
│   vs Target       │ • Workout Count     │   Completion %    │
│ • Macro Balance   │ • Total Volume (kg) │ • Habit Streaks   │
│ • Logging Days    │ • Workout Duration  │ • 30-Day Heatmap  │
└───────────────────┴─────────────────────┴───────────────────┘
```

### 1. Nutrition Progress
- **Calorie Budget Adherence**: Visual line/bar chart displaying daily calories consumed vs. calculated target.
- **Macronutrient Ratio Breakdown**: Weekly average percentage distribution (Protein / Carbs / Fat).
- **Logging Consistency**: Number of days per week all main meals were recorded.

### 2. Fitness Progress
- **Workout Frequency**: Weekly workouts completed vs. weekly target (e.g., 3/4 completed).
- **Volume Load Over Time**: Aggregate weight moved ($\sum \text{reps} \times \text{weight}$) charted across weeks to illustrate progressive overload.
- **Duration Tracking**: Total active training minutes per week.

### 3. Habit & Consistency Progress
- **Habit Completion Rate**: Percentage of scheduled daily habits successfully checked off (e.g., 85% this week).
- **Consistency Heatmap**: A GitHub-style monthly activity grid highlighting active days.
- **Awareness Progression**: Number of educational lessons completed over time.

### 4. Body Measurement & Goal Progress (Optional)
- Weight check-in log (recorded weekly or bi-weekly).
- Moving average weight curve (to smooth out natural daily water weight fluctuations).

---

## ⏱️ Time-Scale Views

- **Daily View**: Granular hourly or meal-by-meal / workout breakdown for the active day.
- **Weekly View**: 7-day rolling window comparing daily performance against weekly targets.
- **Monthly View**: 30-day macro trends highlighting behavioral consistency and milestone achievements.

---

## 🎮 Gamification Integration (EXAMPLE ONLY — NOT A FITORA RULE)

> **NOTICE: EXAMPLE ONLY — NOT A FITORA RULE**  
> Any points or rewards listed below are non-binding illustrative examples. Actual gamification rules and values remain **TODO / UNDECIDED**.

- Maintaining a consistent habit completion rate: Bonus XP (Example Only).
- Reviewing weekly progress summary: XP award (Example Only).
- Reaching multi-week training milestones: Badge progress (Example Only).

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Analytics Decision]**: Select preferred charting library for frontend client rendering (e.g., Chart.js, Recharts, or lightweight custom SVG).
- [ ] **TODO: [Aggregation Decision]**: Decide whether weekly analytics rollups are computed on-demand via SQL aggregates or pre-aggregated via a scheduled backend cron job.
- [ ] **TODO: [UX Decision]**: Finalize default landing period for the progress screen (Weekly view vs. Monthly view).
