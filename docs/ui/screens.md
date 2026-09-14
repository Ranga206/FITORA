# Screen Specifications: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> The screen specifications, layout components, and interactions described below represent candidate proposals only. Final UI/UX screens and behavior remain **TODO / UNDECIDED**.

This document outlines the detailed component layout, user actions, and state transitions for each primary screen in **Fitora**.

---

## 🖥️ Screen Catalog

### 1. Dashboard (Home Command Center) — `/dashboard`
- **Purpose**: High-level overview of daily accomplishments, upcoming actions, active streak, and league rank.
- **Key Components**:
  - **Greeting & Date Banner**: Dynamic welcome message, date, and inspirational wellness quote.
  - **Quick Metrics Bar**: Master Streak badge, current daily XP, Level progress circle.
  - **Daily Pillars Snapshot**:
    - *Nutrition Bar*: Consumed kcal vs. Target kcal with macro distribution strip.
    - *Fitness Card*: Scheduled workout status or "Start Workout" quick launch button.
    - *Awareness Card*: "Daily Concept" bite-sized educational tip of the day.
  - **Today's Habit Checklist**: Interactive check-off list with live progress bar.
  - **Active League Snippet**: Current rank (e.g., #4 in Silver League) with promotion zone indicator.
- **Primary Actions**: Check off habits, quick-log food, start workout, read daily lesson.

### 2. Nutrition Hub — `/nutrition`
- **Purpose**: Plan meals, track caloric and macronutrient intake, and understand dietary balance.
- **Key Components**:
  - **Calorie Summary Card**: Circular progress ring showing calories remaining ($\text{Budget} - \text{Consumed} = \text{Remaining}$).
  - **Macronutrient Breakdown**: Three progress meters for Protein, Carbohydrates, and Dietary Fats.
  - **Meal Slot Cards**:
    - Breakfast, Lunch, Dinner, Snacks.
    - Displays logged items, serving sizes, individual calories, and an "+ Add Food" action.
  - **Educational Food Tip**: Informational card explaining satiety or nutrient density.
- **Primary Actions**: Add food item, search food database, adjust serving size, delete logged item.

### 3. Fitness Hub — `/fitness`
- **Purpose**: Discover routines, view exercise cues, and track workout sessions.
- **Key Components**:
  - **Workout Routine Selector**: Cards for beginner full-body, upper/lower, and custom routines.
  - **Active Session Launcher**: "Start Blank Workout" or "Resume Workout".
  - **Exercise Library Search**: Filterable list by category (Cardio, Strength, Mobility) and muscle group.
  - **Recent Workout History**: Compact cards showing date, duration, and total volume moved.
- **Primary Actions**: Start workout, browse exercises, inspect exercise execution cues.

### 4. Active Workout Tracker — `/fitness/active`
- **Purpose**: Distraction-free, real-time logging during physical training.
- **Key Components**:
  - **Session Header**: Elapsed timer and total volume counter.
  - **Exercise Card List**: Set rows with inputs for Reps, Weight (kg/lbs), and a completion checkmark.
  - **Rest Timer Bar**: Triggered automatically upon completing a set (e.g., 60-second countdown).
  - **Action Footer**: "+ Add Exercise" button and "Finish Workout" confirmation modal.
- **Primary Actions**: Enter reps/weight, check set complete, trigger rest timer, finish session.

### 5. Awareness Center — `/awareness`
- **Purpose**: Curated knowledge base explaining the science and reasoning behind healthy living.
- **Key Components**:
  - **Category Tabs**: Nutrition Awareness, Fitness Awareness, Lifestyle & Sleep.
  - **Lesson Grid**: Clean cards showing lesson title, estimated read time (e.g., "2 min read"), and a completion badge ("Read" vs. "Unread").
  - **Reading Modal / Detail View**: Distraction-free reading layout, highlighted key takeaways, and "Complete & Claim XP" button (XP value: TODO / UNDECIDED).
- **Primary Actions**: Read lesson, complete checkpoint, filter by topic.

### 6. Habits Tracker — `/habits`
- **Purpose**: Manage and monitor recurring daily wellness habits.
- **Key Components**:
  - **Today's Habit List**: Large touch-friendly check targets.
  - **Streak Counter per Habit**: Flame badge indicating consecutive days.
  - **Add Custom Habit Modal**: Form for title, icon, category, and target days.
  - **Weekly Habit Grid**: 7-day visual calendar grid showing completion dots.
- **Primary Actions**: Toggle habit status, create custom habit, edit/archive habit.

### 7. Progress Analytics — `/progress`
- **Purpose**: Long-term trend analysis across diet, exercise, and habits.
- **Key Components**:
  - **Timeframe Selector**: 7 Days, 30 Days, 90 Days.
  - **Calorie Intake Trend Chart**: Line chart with target budget baseline.
  - **Workout Consistency Heatmap**: Monthly activity matrix.
  - **Habit Compliance Bar Chart**: Weekly completion percentages.
- **Primary Actions**: Toggle timeframes, hover on data points for tooltips.

### 8. Leagues & Challenges — `/leagues`
- **Purpose**: Friendly social motivation through weekly cohort competitions and quests.
- **Key Components**:
  - **Current Tier Banner**: Badge for Bronze, Silver, Gold, Platinum, Diamond.
  - **Cohort Leaderboard Table**: Leaderboard rankings showing avatar, username, level, and weekly XP (cohort sizing: TODO / UNDECIDED).
  - **Zone Indicators**: Promotion Zone (Top 20%), Safe Zone, Relegation Zone (Bottom 20%).
  - **Active Challenges Section**: Cards for seasonal community quests with progress meters.
- **Primary Actions**: View league standings, join challenges, claim completed challenge rewards.

### 9. Profile & Settings — `/profile`
- **Purpose**: Manage biometrics, goal preferences, account credentials, and interface themes.
- **Key Components**:
  - **Biometrics Editor**: Height, weight, target weight, age, activity multiplier.
  - **Calculated Targets**: Displays calculated BMR, TDEE, and BMI context disclaimer.
  - **Preferences**: Theme toggle (Dark / Light), unit system (Metric kg/cm vs. Imperial lbs/in).
- **Primary Actions**: Update biometrics, toggle theme, save preferences, log out.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [UI Decision]**: Design celebratory modal animations for level-up and league promotion.
- [ ] **TODO: [UX Decision]**: Finalize offline caching behavior for the active workout tracker screen in case of spotty gym Wi-Fi.
