# System Requirements: Fitora

This document outlines the detailed functional and non-functional requirements for the **Fitora** wellness platform.

---

## 📋 Functional Requirements (FR)

### 1. User Management & Onboarding
- **FR-1.1**: The system shall allow users to register an account with email and password.
- **FR-1.2**: The system shall allow users to log in and receive an authentication token.
- **FR-1.3**: During onboarding, the system shall collect user biometric inputs: age, biological sex, height, current weight, target weight, and baseline activity level.
- **FR-1.4**: The system shall compute baseline BMI context and display appropriate health screening disclaimers.

### 2. Core Pillar 1: Nutrition
- **FR-2.1**: The system shall estimate daily maintenance calories and recommended daily caloric intake based on user goals (maintenance, deficit, surplus).
- **FR-2.2**: The system shall provide a meal planning interface categorized into Breakfast, Lunch, Dinner, and Snacks.
- **FR-2.3**: The system shall allow users to log foods and meals with portion sizes and record calorie and macronutrient values (protein, carbs, fat).
- **FR-2.4**: The system shall calculate running totals of daily calories and macronutrients against daily targets.
- **FR-2.5**: The system shall display basic educational nutritional tips within the nutrition module.

### 3. Core Pillar 2: Fitness
- **FR-3.1**: The system shall maintain an exercise library detailing exercise name, target muscle group, equipment needed, and instructions.
- **FR-3.2**: The system shall allow users to browse and select structured workout routines.
- **FR-3.3**: The system shall allow users to log active workout sessions by recording exercises, sets, reps, weight, and session duration.
- **FR-3.4**: The system shall save workout history and display completed sessions chronologically.
- **FR-3.5**: The system shall track workout consistency across days of the week.

### 4. Core Pillar 3: Awareness
- **FR-4.1**: The system shall provide an Awareness Center containing categorized educational lessons (Nutrition, Fitness, Lifestyle).
- **FR-4.2**: Each lesson shall explain the underlying scientific/physiological principles (*the "WHY"*) behind specific habits and recommendations.
- **FR-4.3**: The system shall track read/completed status for each user per article.
- **FR-4.4**: Completing an awareness lesson shall award the user educational XP.

### 5. Supporting System: Habit Tracking
- **FR-5.1**: The system shall provide standard preset wellness habits (e.g., Hydration, 10k Steps, 8h Sleep, Awareness Reading).
- **FR-5.2**: The system shall allow users to create custom personal habits with configurable frequencies (e.g., daily).
- **FR-5.3**: The system shall allow users to check off habits for the current calendar date.
- **FR-5.4**: The system shall record and update individual habit streaks.

### 6. Supporting System: Progress Analytics
- **FR-6.1**: The system shall aggregate and display daily, weekly, and monthly activity metrics.
- **FR-6.2**: The system shall visualize calorie intake trends vs. targets over time.
- **FR-6.3**: The system shall visualize workout frequency and volume history.
- **FR-6.4**: The system shall display habit completion percentage over weekly and monthly windows.

### 7. Supporting System: Gamification & Leagues
- **FR-7.1**: The system shall award XP based on verified user actions (logging meals, completing workouts, reading awareness lessons, checking habits).
- **FR-7.2**: The system shall compute user levels based on cumulative XP thresholds.
- **FR-7.3**: The system shall maintain a daily active streak counter incremented when at least one core action is completed per day.
- **FR-7.4**: The system shall award achievement badges upon reaching predefined milestones.
- **FR-7.5**: The system shall support time-bound challenges with defined criteria and XP rewards.
- **FR-7.6**: The system shall partition active users into weekly competitive leagues (e.g., Bronze, Silver, Gold) ranked by weekly consistency XP.

---

## 🛡️ Non-Functional Requirements (NFR)

### 1. Performance
- **NFR-1.1**: The backend API shall process standard read requests within 200 milliseconds under normal load.
- **NFR-1.2**: Initial web application page load time shall not exceed 2.0 seconds on standard broadband connections.

### 2. Security & Privacy
- **NFR-2.1**: All user passwords must be hashed using an industry-standard cryptographic hashing algorithm (e.g., BCrypt/Argon2) before storage.
- **NFR-2.2**: All API endpoints handling user data must require authenticated authorization tokens.
- **NFR-2.3**: Health and biometric profile data must remain private and accessible only to the authenticated owner.

### 3. Usability & Accessibility
- **NFR-3.1**: The user interface shall adhere to WCAG 2.1 AA accessibility guidelines, including color contrast and screen reader compatibility.
- **NFR-3.2**: The interface must be responsive across desktop (>= 1200px), tablet (768px - 1199px), and mobile (< 768px) viewports.

### 4. Reliability & Data Integrity
- **NFR-4.1**: Database operations modifying related records (e.g., logging a workout and updating XP/streak) must execute inside transactional boundaries.
- **NFR-4.2**: The system shall maintain audit timestamps (`created_at`, `updated_at`) on all primary domain entities.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Decision Needed]**: Finalize the password complexity rules (e.g., minimum 8 characters, alphanumeric + symbol).
- [ ] **TODO: [Decision Needed]**: Finalize whether email verification is required before allowing first login.
- [ ] **TODO: [Decision Needed]**: Define the timezone handling strategy for habit and streak daily reset (user local time vs server UTC).
