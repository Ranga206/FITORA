# Fitora

### Eat Better • Move Better • Live Better

Fitora is a wellness and lifestyle platform that combines
nutrition, fitness, habit tracking, educational content,
progress tracking, and gamification in one application.

The goal is to help users build healthier and more consistent
lifestyle habits through personalized guidance, tracking,
education, and engaging challenges.

---

## 🚀 Project Vision

Most fitness and nutrition applications focus on only one area.

Fitora brings multiple aspects of wellness together:

- Nutrition and meal planning
- Calorie and nutrition tracking
- Fitness and workout guidance
- Daily habit tracking
- Lifestyle improvement
- Progress and analytics
- Fitness and nutrition education
- Streaks and achievements
- XP and levels
- Challenges
- Competitive leagues

Instead of simply showing information, Fitora encourages users
to consistently act on it.

---

## 🎯 Problem

People often use separate applications for:

- Diet and meal planning
- Calorie tracking
- Workout planning
- Habit tracking
- Fitness education
- Progress monitoring

This makes it difficult to maintain a consistent lifestyle
routine.

Fitora aims to bring these experiences together in one
easy-to-use platform.

---

## 💡 Proposed Solution

Fitora provides a unified wellness platform where users can:

1. Create a personal profile
2. Set wellness and fitness goals
3. Understand their nutritional requirements
4. Plan and track meals
5. Learn about nutrition and fitness
6. Follow workout plans
7. Track daily habits
8. Monitor their progress
9. Maintain streaks
10. Earn XP and achievements
11. Participate in challenges
12. Progress through leagues

---

## ⭐ Core Features

### 🥗 Nutrition

- User nutrition profile
- BMI-based nutritional context
- Calorie estimation
- Meal planning
- Food information
- Meal tracking
- Nutrition progress

> BMI is used only as a general screening/input metric and
> should not be treated as a medical diagnosis.

### 🏋️ Fitness

- Exercise information
- Workout plans
- Workout tracking
- Exercise categories
- Workout progress
- Fitness education

### ✅ Habit Tracking

Users can track daily lifestyle actions such as:

- Nutrition consistency
- Workout completion
- Hydration
- Learning
- Other custom habits

### 📈 Progress

Users can view:

- Daily progress
- Weekly trends
- Monthly trends
- Nutrition progress
- Workout consistency
- Habit consistency
- Goal progress

### 🔥 Gamification

Fitora uses game-inspired systems to encourage consistency:

- Daily streaks
- XP
- Levels
- Achievements
- Challenges
- League rankings

Gamification is designed to encourage healthy consistency,
not extreme dieting or excessive exercise.

---

## 🏆 League System

Users can participate in leagues based on activity and
consistency.

Example progression:

Daily Actions
      ↓
    XP
      ↓
   Level
      ↓
Achievements
      ↓
 Challenges
      ↓
    League

The league system focuses on engagement and consistency rather
than body measurements or appearance.

---

## 🖥️ Main Application Modules

Fitora will contain the following major modules:

- Dashboard
- Nutrition
- Meals
- Fitness
- Workouts
- Progress
- Habits
- Learn
- Challenges
- League
- Achievements
- Profile

---

## 🎨 UI/UX Direction

Fitora follows a modern wellness SaaS design approach.

Design principles:

- Clean and professional
- Simple navigation
- Strong visual hierarchy
- Responsive design
- Accessible interface
- Light theme
- Dark theme
- Reusable UI components
- Data visualization where useful
- Minimal visual clutter

The UI design is being developed separately and will be
implemented consistently across the application.

---

## 🏗️ System Architecture

Fitora will follow a layered application architecture.

```text
                    Frontend
                       │
                       │ REST API
                       ↓
                  Backend API
                       │
              ┌────────┴────────┐
              ↓                 ↓
          Services          Security
              │
              ↓
         Repositories
              │
              ↓
           Database
