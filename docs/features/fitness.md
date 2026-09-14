# Core Pillar 2: Fitness

This document outlines the functional and domain specifications for the **Fitness** pillar of **Fitora**.

---

## 🏋️ Overview & Purpose

Fitness is the second core pillar of Fitora. The goal is to demystify physical training and make exercise accessible, structured, and trackable for users of all fitness levels.

Fitora prioritizes proper exercise form, progressive consistency, and injury prevention over dangerous ego-lifting or extreme overtraining.

---

## 📋 Functional Capabilities

### 1. Exercise Library
- Curated database of exercises with structured taxonomy:
  - **Category**: Strength Training, Cardio, Bodyweight / Calisthenics, Mobility & Stretching.
  - **Target Muscle Groups**: Primary and secondary muscles (e.g., Chest, Quadriceps, Lats, Core).
  - **Equipment Needed**: Bodyweight only, Dumbbells, Barbell, Resistance Bands, Cable/Machines.
  - **Difficulty Level**: Beginner, Intermediate, Advanced.

### 2. Exercise Education
- Form and execution cues for each exercise in the library:
  - Step-by-step movement instructions.
  - Form tips and common mistakes to avoid.
  - Recommended breathing pattern (e.g., exhale on exertion).
  - Safe modifications / progressions for beginners.

### 3. Workout Guidance & Structured Routines
- Curated baseline workout routines organized by goal and experience:
  - Full Body Beginner Routine (3 days/week)
  - Upper / Lower Split (4 days/week)
  - Push / Pull / Legs (PPL) Split
  - Core & Mobility Routine
  - Quick Home Bodyweight Circuit (20 mins)

### 4. Active Workout Tracking
- Real-time logging interface during an active training session:
  - Add exercises to the active session.
  - Record per set:
    - Set Number
    - Repetitions Completed
    - Resistance Weight (kg / lbs) or Time Duration (seconds for planks/cardio)
    - Checkbox to mark set as completed
  - Rest timer between sets (countdown with visual indicator).
  - Total elapsed workout duration.

### 5. Workout History & Logs
- Chronological timeline of completed workouts.
- Summary metrics per session:
  - Total volume lifted ($\sum (\text{sets} \times \text{reps} \times \text{weight})$).
  - Total workout duration in minutes.
  - Exercises performed.
- Previous performance indicator: Shows the user what weight/reps they lifted in their previous session to encourage gradual progressive overload.

### 6. Consistency Tracking
- Weekly workout frequency target (e.g., 3 or 4 workouts per week).
- Visual calendar highlighting completed workout days.
- Tracking consistency rate over 4-week moving windows.

---

## 🎮 Gamification Integration (EXAMPLE ONLY — NOT A FITORA RULE)

> **NOTICE: EXAMPLE ONLY — NOT A FITORA RULE**  
> Any points or rewards listed below are non-binding illustrative examples. Actual gamification rules and values remain **TODO / UNDECIDED**.

- Completing a logged workout session: XP award (Example Only).
- Hitting personal volume benchmark: Bonus XP (Example Only).
- Meeting weekly workout frequency target: Consistency badge progress and League multiplier (Example Only).

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Catalog Decision]**: Finalize initial exercise library size (target: ~50 foundational exercises across all categories for Phase 1).
- [ ] **TODO: [Feature Decision]**: Decide whether users can create custom user-defined exercises in Phase 1 or use only the verified library.
- [ ] **TODO: [UX Decision]**: Finalize rest timer behavior (audible sound notification vs. subtle visual animation).
- [ ] **TODO: [Metric Decision]**: Finalize how cardiovascular exercises (running, cycling) calculate volume compared to resistance training.
