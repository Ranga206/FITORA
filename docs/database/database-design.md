# Database Design: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> The entity clusters, table suggestions, and relational models described below represent candidate proposals only. Final database schema and engine decisions remain **TODO / UNDECIDED**.

This document describes the architectural data model, normalization guidelines, entity clusters, and data integrity standards for **Fitora**.

---

## 🏛️ Data Modeling Principles

1. **Relational Consistency**: Utilize standard 3rd Normal Form (3NF) to eliminate redundant data and ensure referential integrity via foreign key constraints.
2. **Auditability**: Every primary entity table must include `created_at` (timestamp with timezone) and `updated_at` timestamps.
3. **Tenant & User Isolation**: All user-generated records (meals, workouts, habits, logs) must reference `user_id` with indexed foreign keys for rapid scoping and data privacy.
4. **Soft Deletes vs Hard Deletes**: User-generated records utilize soft deletion flags (`is_deleted` boolean) where historical tracking is essential.

---

## 📦 Domain Entity Clusters

The schema is partitioned into six cohesive entity clusters:

```text
┌─────────────────────────────────────────────────────────────┐
│                   DOMAIN ENTITY CLUSTERS                    │
├───────────────────┬─────────────────────┬───────────────────┤
│ 1. Identity & Bio │ 2. Nutrition Cluster│ 3. Fitness Cluster│
│   • users         │   • food_items      │   • exercises     │
│   • user_profiles │   • meals           │   • workouts      │
│   • user_settings │   • meal_items      │   • workout_sets  │
├───────────────────┼─────────────────────┼───────────────────┤
│ 4. Awareness      │ 5. Habit Cluster    │ 6. Gamification   │
│   • lessons       │   • habits          │   • user_stats    │
│   • lesson_reads  │   • habit_logs      │   • achievements  │
│                   │                     │   • leagues       │
│                   │                     │   • league_members│
└───────────────────┴─────────────────────┴───────────────────┘
```

### 1. Identity & Profiles
- `users`: Core authentication record (email, password_hash, status, role).
- `user_profiles`: Biometrics (age, biological sex, height, weight, target_weight, activity_level, calculated BMR/TDEE).
- `user_settings`: Preferences (theme, units: metric/imperial, notification preferences).

### 2. Nutrition & Meals
- `food_items`: Master catalog of food items with calorie and macro profiles per standard serving.
- `meals`: User meal log instance (user_id, date, meal_type: BREAKFAST/LUNCH/DINNER/SNACK).
- `meal_items`: Line items linking a meal to a food_item with quantity/serving_size.

### 3. Fitness & Workouts
- `exercises`: Master catalog of exercises (name, category, muscle_group, equipment, instructions).
- `workouts`: Completed or planned session header (user_id, start_time, end_time, total_volume, duration_minutes).
- `workout_sets`: Individual recorded set (workout_id, exercise_id, set_index, reps, weight_kg, completed).

### 4. Awareness & Lessons
- `lessons`: Educational articles (title, slug, category: NUTRITION/FITNESS/LIFESTYLE, content, reading_time_minutes).
- `user_lesson_progress`: Tracks user reading state (user_id, lesson_id, completed_at, xp_awarded).

### 5. Habit Tracking
- `habits`: Habit definitions (user_id, title, category, frequency_type, is_custom, is_active).
- `habit_logs`: Daily completion records (habit_id, user_id, log_date, status: COMPLETED/SKIPPED).

### 6. Gamification & Leagues
- `user_gamification`: Summary progression (user_id, total_xp, current_level, current_streak, highest_streak, streak_freezes_available).
- `achievements`: Master badge definitions (title, description, icon_key, criteria_type, threshold).
- `user_achievements`: Unlocked badges (user_id, achievement_id, unlocked_at).
- `leagues`: Weekly competition instances (tier_name, week_number, start_date, end_date).
- `league_members`: Cohort assignment and weekly standing (league_id, user_id, weekly_xp, final_rank).

---

## ⚡ Indexing Strategy

- Primary indexes on all primary keys (`id` UUID or BigInt).
- Foreign key indexes on all relation fields (`user_id`, `meal_id`, `workout_id`, `habit_id`).
- Composite unique indexes for date-scoped logs (e.g., `(user_id, habit_id, log_date)` to prevent duplicate daily entries).
- Time-series queries: Composite index on `(user_id, created_at DESC)` for efficient history fetching.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Database Decision]**: Finalize primary key convention: UUIDv4 vs Auto-incrementing BigInt.
- [ ] **TODO: [Database Decision]**: Finalize database engine (PostgreSQL vs MySQL).
- [ ] **TODO: [Database Decision]**: Determine whether nutrition food items should support user-contributed foods or remain system-curated.
- [ ] **TODO: [Database Decision]**: Define data retention and partitioning strategy for high-volume logs (`habit_logs`, `workout_sets`).
