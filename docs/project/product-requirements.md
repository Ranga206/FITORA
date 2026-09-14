# Fitora Product Requirements

---

## 1. Document Status

- **Status**: `PROPOSED`
- **Authority**: Human Project Team Review & Approval Required

This document defines the proposed Product Requirements Document (PRD) for **Fitora**. It answers: **"What should each part of Fitora allow the user to do?"**

This document describes **WHAT** the product should do from a user perspective, **NOT HOW** it will be technically implemented. All requirements are derived strictly from [`docs/project/mvp-scope.md`](mvp-scope.md) and remain `PROPOSED` until approved as `FINAL` by the human project team.

---

## 2. Product Goal

Fitora helps users build healthier, more balanced, and more consistent daily lifestyle habits.

The product brings together nutrition, physical fitness, and health education into one simple platform so users can understand their needs, take daily action, and maintain positive habits over time.

---

## 3. Core Product Pillars

Fitora is built around three primary pillars:

| Pillar | Purpose | Main Features |
| :--- | :--- | :--- |
| **1. Nutrition** | Help users understand energy requirements, plan balanced meals, and track daily food intake. | Nutrition Profile, BMI Context, Calorie Estimation, Meal Planning, Meal Logging, Nutrition Tracking, Basic Nutrition Education |
| **2. Fitness** | Make physical activity approachable, guided, safe, and measurable for all experience levels. | Exercise Library, Workout Guidance, Workout Logging, Workout History, Fitness Education, Consistency Tracking |
| **3. Awareness** | Educate users on the biological and behavioral *why* behind habits rather than just tracking numbers. | Nutrition Awareness, Fitness Awareness, Lifestyle Awareness, Educational Lessons, Healthy Lifestyle Concepts |

---

## 4. Nutrition Requirements

### 4.1. Nutrition Profile
- **Purpose**: Capture basic user physical metrics and goals to establish baseline nutritional needs.
- **User can**: Enter and update age, biological sex, height, weight, activity level, and weight goal (maintenance, loss, gain).
- **Expected result**: System stores the profile to calculate calorie targets and BMI context.
- **Status**: `PROPOSED` *(Exact input fields and validation limits: `TODO / UNDECIDED`)*.

### 4.2. Basic BMI Screening / Context
- **Purpose**: Provide an initial general reference screening metric.
- **User can**: View their calculated BMI category based on profile height and weight.
- **Expected result**: System displays the BMI value alongside an explicit educational disclaimer stating it is a screening metric, not a medical diagnosis.
- **Status**: `PROPOSED`.

### 4.3. Calorie Estimation
- **Purpose**: Provide an estimated daily calorie target based on user goals.
- **User can**: View recommended daily calories for maintenance, deficit, or surplus.
- **Expected result**: System calculates an estimated daily caloric target used as the daily budget.
- **Status**: `PROPOSED` *(Estimation formula choice: `TODO / UNDECIDED`)*.

### 4.4. Meal Planning
- **Purpose**: Help users organize daily eating into predictable routines.
- **User can**: View and plan meals across 4 standard slots: Breakfast, Lunch, Dinner, and Snacks.
- **Expected result**: Daily meals are categorized into standard time slots.
- **Status**: `PROPOSED` *(Custom meal slot options: `TODO / UNDECIDED`)*.

### 4.5. Meal Logging / Tracking
- **Purpose**: Enable users to record foods consumed each day.
- **User can**: Select or search for food items, specify portion sizes, and log them into a meal slot.
- **Expected result**: Logged items are saved to the user's daily record.
- **Status**: `PROPOSED` *(Food database data source: `TODO / UNDECIDED`)*.

### 4.6. Nutrition Tracking
- **Purpose**: Provide visual feedback on daily calorie and macronutrient intake.
- **User can**: View running totals of calories and macronutrients (protein, carbs, fat) consumed vs. daily targets.
- **Expected result**: System displays real-time progress bars showing consumed vs. remaining budget.
- **Status**: `PROPOSED` *(Micronutrient display rules: `TODO / UNDECIDED`)*.

### 4.7. Basic Nutrition Education
- **Purpose**: Provide practical dietary tips directly within the nutrition module.
- **User can**: Read brief tips on core topics (such as protein benefits, hydration, and whole foods).
- **Expected result**: Tips are displayed contextually to reinforce mindful food choices.
- **Status**: `PROPOSED`.

---

## 5. Fitness Requirements

### 5.1. Exercise Library / Education
- **Purpose**: Provide a reference directory of foundational exercises with safe execution cues.
- **User can**: Browse exercises categorized by target muscle group and movement category.
- **Expected result**: System displays exercise descriptions, target muscles, and safe form instructions.
- **Status**: `PROPOSED` *(Exercise catalog contents: `TODO / UNDECIDED`)*.

### 5.2. Workout Guidance
- **Purpose**: Provide structured workout routines for different experience levels.
- **User can**: Browse and select baseline workout routines (e.g., beginner full body, split routines).
- **Expected result**: User sees the list of scheduled exercises and set recommendations.
- **Status**: `PROPOSED` *(Custom routine creation rules: `TODO / UNDECIDED`)*.

### 5.3. Workout Logging / Tracking
- **Purpose**: Allow users to record active exercise sessions.
- **User can**: Log exercises performed, sets, reps, weight lifted, and workout duration.
- **Expected result**: System saves the completed workout session.
- **Status**: `PROPOSED` *(Rest timer audio/visual behavior: `TODO / UNDECIDED`)*.

### 5.4. Workout History
- **Purpose**: Preserve a record of past workouts.
- **User can**: View past completed workout sessions in chronological order.
- **Expected result**: System displays past workout dates, exercises, volume, and duration.
- **Status**: `PROPOSED`.

### 5.5. Fitness Education
- **Purpose**: Embed exercise safety and preparation guidelines.
- **User can**: Read practical guidance on warmups, injury prevention, and safe execution.
- **Expected result**: Guidance is accessible within the fitness module to encourage safe training.
- **Status**: `PROPOSED`.

### 5.6. Consistency Tracking
- **Purpose**: Track regular workout frequency over time.
- **User can**: View how many workout sessions they have completed relative to their weekly routine.
- **Expected result**: System shows weekly workout frequency adherence.
- **Status**: `PROPOSED`.

---

## 6. Awareness Requirements

### 6.1. Nutrition Awareness
- **Purpose**: Educate users on nutritional science and energy balance.
- **User can**: Read lessons explaining caloric balance, macronutrient roles, and whole foods.
- **Expected result**: User gains understanding of why certain dietary choices support health.
- **Status**: `PROPOSED`.

### 6.2. Fitness Awareness
- **Purpose**: Educate users on exercise physiology and training principles.
- **User can**: Read lessons explaining progressive overload, recovery, and training types.
- **Expected result**: User understands how exercise stimulates adaptation and why rest is essential.
- **Status**: `PROPOSED`.

### 6.3. Lifestyle Awareness
- **Purpose**: Educate users on daily recovery and lifestyle factors.
- **User can**: Read lessons explaining sleep quality, hydration, and stress management.
- **Expected result**: User connects daily lifestyle habits to overall physical performance.
- **Status**: `PROPOSED`.

### 6.4. Educational Lessons
- **Purpose**: Deliver accessible wellness knowledge in short formats.
- **User can**: Browse and read bite-sized lessons designed for 2–3 minutes of reading.
- **Expected result**: User completes lessons without cognitive overload or dense medical jargon.
- **Status**: `PROPOSED` *(Curriculum content list: `TODO / UNDECIDED`)*.

### 6.5. Healthy Lifestyle Concepts
- **Purpose**: Dispel common fitness myths and build health literacy.
- **User can**: Read concept breakdowns covering long-term sustainable habits.
- **Expected result**: User gains confidence to make informed lifestyle choices.
- **Status**: `PROPOSED`.

### 6.6. Explain "WHY", Not Only "WHAT"
- **Purpose**: Build intrinsic motivation by explaining the reasoning behind recommendations.
- **User can**: View the scientific or behavioral rationale behind each recommended habit.
- **Expected result**: Recommendations are accompanied by clear explanations.
- **Status**: `PROPOSED`.

---

## 7. Supporting Systems

Supporting systems reinforce the Big 3 pillars without acting as independent primary pillars:

### 7.1. Progress
- **Purpose**: Help users understand consistency and changes over time.
- **User can**: View daily, weekly, and monthly summaries of meals logged, workouts completed, and habits maintained.
- **Expected result**: Visual feedback emphasizes long-term consistency rather than short-term weight fluctuations.
- **Status**: `PROPOSED` *(Specific chart styles and aggregation intervals: `TODO / UNDECIDED`)*.

### 7.2. Habits
- **Purpose**: Anchor daily lifestyle routines.
- **User can**: Check off daily lifestyle habits (such as hydration, sleep, movement, reading lessons) and add custom habits.
- **Expected result**: System marks habits complete for the day and tracks consecutive active days.
- **Status**: `PROPOSED` *(Habit scheduling options and streak freeze policies: `TODO / UNDECIDED`)*.

### 7.3. Gamification
- **Purpose**: Encourage healthy consistency through positive game-inspired mechanics.
- **Core Rule**: Rewards healthy, balanced daily participation. Never rewards extreme dieting or overtraining.
- **User can**:
  - **XP**: Earn experience points by completing meals, workouts, reading lessons, and habits.
  - **Levels**: Progress through milestone levels based on cumulative activity.
  - **Streaks**: Maintain consecutive days of positive activity.
  - **Achievements**: Unlock badges for milestone achievements.
  - **Challenges**: Join time-bound personal and community challenges.
  - **Leagues**: Participate in weekly cohorts for friendly consistency competition.
- **Expected result**: User receives encouraging feedback for daily consistency.
- **Status**: `PROPOSED` *(Exact XP points, progression formulas, streak rules, and league calculations: strictly `TODO / UNDECIDED`)*.

---

## 8. Basic User Journey

The high-level relationship across Fitora's core areas:

```text
Profile → Nutrition / Fitness / Awareness → Tracking → Progress / Habits / Gamification
```

- **Profile**: Establishes initial user context and goals.
- **Nutrition / Fitness / Awareness**: The Big 3 primary pillars where users plan, learn, and take action.
- **Tracking**: Daily logging of meals, workouts, and lifestyle habits.
- **Progress / Habits / Gamification**: Supporting systems that visualize long-term trends, anchor daily routines, and provide encouraging feedback.

---

## 9. MVP Requirements Summary

| Area | Feature | Status | Decision Needed? |
| :--- | :--- | :--- | :--- |
| **Nutrition** | Nutrition Profile | `PROPOSED` | Yes (exact fields & input validation) |
| **Nutrition** | BMI Context | `PROPOSED` | No (formula standard; disclaimers required) |
| **Nutrition** | Calorie Estimation | `PROPOSED` | Yes (estimation formula selection) |
| **Nutrition** | Meal Planning | `PROPOSED` | Yes (custom meal slots allowed or fixed 4) |
| **Nutrition** | Meal Logging | `PROPOSED` | Yes (food catalog data source) |
| **Nutrition** | Nutrition Tracking | `PROPOSED` | Yes (display format and macro targets) |
| **Nutrition** | Basic Nutrition Education | `PROPOSED` | Yes (starter tip content) |
| **Fitness** | Exercise Library | `PROPOSED` | Yes (starter exercise list & taxonomy) |
| **Fitness** | Workout Guidance | `PROPOSED` | Yes (template routine definitions) |
| **Fitness** | Workout Logging | `PROPOSED` | Yes (timer behavior & input rules) |
| **Fitness** | Workout History | `PROPOSED` | No (chronological session listing) |
| **Fitness** | Fitness Education | `PROPOSED` | Yes (starter form & safety tips) |
| **Fitness** | Consistency Tracking | `PROPOSED` | Yes (frequency goal settings) |
| **Awareness** | Nutrition Awareness | `PROPOSED` | Yes (initial lesson topics) |
| **Awareness** | Fitness Awareness | `PROPOSED` | Yes (initial lesson topics) |
| **Awareness** | Lifestyle Awareness | `PROPOSED` | Yes (initial lesson topics) |
| **Awareness** | Educational Lessons | `PROPOSED` | Yes (content authoring pipeline) |
| **Awareness** | Healthy Lifestyle Concepts | `PROPOSED` | Yes (core concept curriculum) |
| **Awareness** | Explain "WHY", Not "WHAT" | `PROPOSED` | No (core philosophy) |
| **Supporting**| Progress Tracking | `PROPOSED` | Yes (aggregation intervals & chart types) |
| **Supporting**| Habit Tracking | `PROPOSED` | Yes (streak freeze rules & defaults) |
| **Supporting**| Gamification: XP | `PROPOSED` | Yes (numerical point values per action) |
| **Supporting**| Gamification: Levels | `PROPOSED` | Yes (level progression formula) |
| **Supporting**| Gamification: Streaks | `PROPOSED` | Yes (streak grace/freeze policy) |
| **Supporting**| Gamification: Achievements | `PROPOSED` | Yes (badge criteria list) |
| **Supporting**| Gamification: Challenges | `PROPOSED` | Yes (challenge duration & rules) |
| **Supporting**| Gamification: Leagues | `PROPOSED` | Yes (cohort size & promotion rules) |

---

## 10. Out of Scope / Future

The following items are explicitly excluded from the MVP scope:

| Area | Scope Rule |
| :--- | :--- |
| **Artificial Intelligence (AI)** | Classified as **`FUTURE`** scope. No AI meal plans, automated computer-vision food scanners, conversational AI coaches, or machine learning models belong to the MVP. |
| **Other Non-MVP Features** | Any feature or integration not explicitly included in [`docs/project/mvp-scope.md`](mvp-scope.md) remains excluded from the MVP. |

---

## 11. Open Decisions

The following items remain **`TODO / UNDECIDED`** awaiting human project team decisions:

1. **Calorie & BMR Estimation Formula**: Selection of mathematical formula (e.g., Mifflin-St Jeor vs. Revised Harris-Benedict).
2. **Food Catalog Data Source**: Internal curated seed dataset vs. external food database API.
3. **Exercise Catalog Content**: Initial exercise list, taxonomy, and media assets.
4. **Awareness Lesson Curriculum**: Initial lesson list and publishing pipeline.
5. **Gamification Numerical Rules**:
   - Exact XP amounts awarded per action.
   - Mathematical formula for level progression.
   - Streak freeze limits and recovery mechanics.
   - League tier naming, weekly cohort sizing, and promotion/demotion thresholds.
6. **Technical Implementation Choices**: Database engine, build tools, API contracts, and schema design.

---

## 12. Human Approval

The human project team has sole decision authority over the Fitora project.

- This document represents a proposed PRD.
- No requirement or rule becomes authoritative until the human project team explicitly reviews and approves it as `FINAL`.
- Technical implementation and coding must not commence without explicit human team approval.
