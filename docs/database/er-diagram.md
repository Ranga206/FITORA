# Entity-Relationship Diagram: Fitora

This document presents the conceptual Entity-Relationship (ER) model for the **Fitora** platform.

> **Note**: This is a conceptual data model representing business entities and relationships. Field names and data types are indicative and subject to final technical schema implementation.

---

## 🗺️ Conceptual Entity-Relationship Diagram

```mermaid
erDiagram
    USERS ||--o| USER_PROFILES : "has"
    USERS ||--o| USER_GAMIFICATION : "tracks"
    USERS ||--o{ MEALS : "logs"
    USERS ||--o{ WORKOUTS : "performs"
    USERS ||--o{ HABITS : "defines"
    USERS ||--o{ HABIT_LOGS : "records"
    USERS ||--o{ USER_LESSON_PROGRESS : "completes"
    USERS ||--o{ USER_ACHIEVEMENTS : "unlocks"
    USERS ||--o{ LEAGUE_MEMBERS : "competes_in"

    MEALS ||--|{ MEAL_ITEMS : "contains"
    FOOD_ITEMS ||--o{ MEAL_ITEMS : "referenced_by"

    WORKOUTS ||--|{ WORKOUT_SETS : "contains"
    EXERCISES ||--o{ WORKOUT_SETS : "performed_in"

    HABITS ||--o{ HABIT_LOGS : "logged_in"

    LESSONS ||--o{ USER_LESSON_PROGRESS : "tracked_in"

    ACHIEVEMENTS ||--o{ USER_ACHIEVEMENTS : "awarded_as"

    LEAGUES ||--|{ LEAGUE_MEMBERS : "groups"

    USERS {
        uuid id PK
        string email UK
        string password_hash
        string username
        string role
        timestamp created_at
    }

    USER_PROFILES {
        uuid id PK
        uuid user_id FK
        int age
        string biological_sex
        decimal height_cm
        decimal current_weight_kg
        decimal target_weight_kg
        string activity_level
        decimal calculated_bmr
        decimal calculated_tdee
    }

    FOOD_ITEMS {
        uuid id PK
        string name
        decimal serving_size_g
        decimal calories
        decimal protein_g
        decimal carbs_g
        decimal fats_g
    }

    MEALS {
        uuid id PK
        uuid user_id FK
        date log_date
        string meal_type
        timestamp logged_at
    }

    MEAL_ITEMS {
        uuid id PK
        uuid meal_id FK
        uuid food_item_id FK
        decimal quantity
    }

    EXERCISES {
        uuid id PK
        string name
        string category
        string muscle_group
        string equipment
    }

    WORKOUTS {
        uuid id PK
        uuid user_id FK
        timestamp start_time
        timestamp end_time
        decimal total_volume_kg
        int duration_minutes
    }

    WORKOUT_SETS {
        uuid id PK
        uuid workout_id FK
        uuid exercise_id FK
        int set_index
        int reps
        decimal weight_kg
        boolean completed
    }

    LESSONS {
        uuid id PK
        string title
        string category
        text content
        int reading_time_mins
        int xp_reward
    }

    HABITS {
        uuid id PK
        uuid user_id FK
        string title
        string category
        string frequency_type
        boolean is_active
    }

    HABIT_LOGS {
        uuid id PK
        uuid habit_id FK
        uuid user_id FK
        date log_date
        string status
    }

    USER_GAMIFICATION {
        uuid id PK
        uuid user_id FK
        int total_xp
        int current_level
        int current_streak
        int streak_freezes
    }

    LEAGUES {
        uuid id PK
        string tier_name
        int week_number
        date start_date
        date end_date
    }

    LEAGUE_MEMBERS {
        uuid id PK
        uuid league_id FK
        uuid user_id FK
        int weekly_xp
        int final_rank
    }
```

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Data Modeling]**: Decide whether to store denormalized daily summaries (e.g., `daily_nutrition_summaries`) for faster dashboard query loading.
- [ ] **TODO: [Data Modeling]**: Finalize cascade delete behaviors (e.g., `ON DELETE CASCADE` for meal items vs. soft delete).
