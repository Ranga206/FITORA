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
- `demo_users` / `users`: Core authentication/demo user record (`id` UUID).
- `profiles`: Biometrics (`age`, `sex`, `height`, `weight`). **Approved Direction: The existing `profiles` schema is finalized for current milestone and must remain unchanged.** Any nutrition-specific goal/preference settings will be modeled in a separate table without altering `profiles`.
- `user_settings`: Preferences (theme, units: metric/imperial, notification preferences).

### 2. Nutrition & Meals (First Implementation Milestone)
> **Approved Direction**: Nutrition logging is the first implementation milestone.
> - Supports 4 meal slots: `BREAKFAST`, `LUNCH`, `DINNER`, `SNACK`.
> - Tracks calories, protein, carbohydrates, and fats from logged foods.
> - Existing profile schema remains unchanged.
> - AI meal recognition and unapproved gamification remain out of scope.

- `food_items`: Master catalog of food items storing unambiguous `nutrition_reference_basis` (`per_100g`, `per_100ml`, `per_serving`), `serving_size`, `serving_unit`, `serving_weight_g`, `serving_volume_ml`, `calories`, `protein`, `carbohydrates`, `fat`, `preparation_state`, `food_type`, and verified `source_name` / `source_code`.
- `meals`: User meal log instance (`user_id`, `logged_date`, `meal_slot`: `BREAKFAST`/`LUNCH`/`DINNER`/`SNACK`).
- `meal_items`: Individual food items logged in a meal, storing an **immutable historical nutrient snapshot** (`food_item_id`, `food_name_snapshot`, `logged_quantity`, `logged_unit`, `calories_snapshot`, `protein_snapshot`, `carbohydrates_snapshot`, `fat_snapshot`) so later catalog corrections never alter historical daily totals.

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

- [x] **IMPLEMENTED & TESTED: [Food Catalog Database Model]**: Implemented `food_items` PostgreSQL table with UUID primary key, numeric precision (`Numeric(6, 1)`, `Numeric(5, 1)`), indexes (`name`, `category`), check constraints for positive serving size, positive serving weight/volume, non-negative calories, protein, carbohydrates, and fat, and Alembic migration `dd5a613843df_create_food_items`.
- [x] **IMPLEMENTED & TESTED: [System-Curated Food Catalog]**: Phase 1 catalog is strictly system-curated (`is_system=True`) and read-only. User-contributed foods are deferred to future milestones.
- [ ] **TODO: [Database Decision]**: Finalize database engine and primary key convention across remaining future modules.
- [ ] **TODO: [Meal Logging Tables]**: Implement `meals` and `meal_items` migration with immutable historical nutrient snapshots.
- [ ] **TODO: [Database Decision]**: Define data retention and partitioning strategy for high-volume logs (`habit_logs`, `workout_sets`).
