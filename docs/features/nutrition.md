# Core Pillar 1: Nutrition

This document outlines the functional and domain specifications for the **Nutrition** pillar of **Fitora**.

---

## 🥗 Overview & Purpose

Nutrition is the first core pillar of Fitora. The objective is to guide users toward balanced, mindful eating habits through accessible calorie context, structured meal planning, and straightforward meal logging.

Fitora emphasizes sustainable nutritional balance rather than extreme restriction or crash dieting.

---

## 📋 Functional Capabilities

### 1. Nutrition Profile & Biometrics
- Captures key user inputs:
  - Age
  - Biological Sex
  - Height (cm or ft/in)
  - Current Weight (kg or lbs)
  - Target Weight Goal (Loss, Maintenance, Muscle Gain)
  - Baseline Physical Activity Multiplier (Sedentary, Lightly Active, Moderately Active, Very Active)

### 2. BMI Calculation & Screening Context
- Computes standard Body Mass Index:
  $$\text{BMI} = \frac{\text{weight in kilograms}}{(\text{height in meters})^2}$$
- Categorizes BMI into standard WHO reference ranges (Underweight, Normal, Overweight, Obese).
- **Mandatory Medical Disclaimer**: BMI is presented strictly as a general screening metric for baseline context. The UI must explicitly inform users that BMI does not account for lean muscle mass, bone density, or individual metabolic health and is not a medical diagnosis.

### 3. Calorie & Macronutrient Estimation
- Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).
- Recommends a daily caloric target adjusted for the user's primary goal:
  - Weight Loss: Moderate caloric deficit (e.g., -300 to -500 kcal/day).
  - Maintenance: Equal to calculated TDEE.
  - Muscle Gain: Moderate caloric surplus (e.g., +250 to +400 kcal/day).
- Estimates baseline macronutrient distribution (Protein, Carbohydrates, Dietary Fats).

### 4. Meal Planning
- Structures each day into 4 primary meal slots:
  1. Breakfast
  2. Lunch
  3. Dinner
  4. Snacks
- Allows users to plan meals ahead of time or log them as consumed.

### 5. Meal & Nutrition Tracking
- Users log food items with:
  - Food Name
  - Serving Size / Portion (e.g., 100g, 1 cup, 1 piece)
  - Calories (kcal)
  - Protein (g)
  - Carbohydrates (g)
  - Fats (g)
- Real-time aggregation of consumed calories and macros vs. daily budget.

### 6. Basic Nutrition Education
- Integrated tips and insights displayed within the nutrition hub:
  - Importance of adequate dietary protein for satiety and tissue repair.
  - Role of dietary fiber and complex carbohydrates in energy stability.
  - Role of healthy fats in hormonal balance.

---

## 🎮 Gamification Integration (EXAMPLE ONLY — NOT A FITORA RULE)

> **NOTICE: EXAMPLE ONLY — NOT A FITORA RULE**  
> Any points or rewards listed below are non-binding illustrative examples. Actual gamification rules and values remain **TODO / UNDECIDED**.

- Logging a complete meal (e.g., Breakfast): XP award (Example Only).
- Logging all 3 main meals in a day: Bonus XP and streak progress (Example Only).
- Staying within caloric target: Consistency badge progress (Example Only).

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Formula Decision]**: Finalize default BMR calculation formula between **Mifflin-St Jeor** ($BMR = 10W + 6.25H - 5A + S$) and **Revised Harris-Benedict**.
- [ ] **TODO: [Data Decision]**: Choose the food item source strategy for Phase 1:
  - Option A: Curated local seed database of common whole foods and standard portions.
  - Option B: Integration with an external open-source food database (e.g., Open Food Facts or USDA FoodData Central).
- [ ] **TODO: [Feature Decision]**: Decide whether users can define custom meal categories beyond the 4 standard slots.
- [ ] **TODO: [Feature Decision]**: Decide whether micronutrient tracking (fiber, sodium, sugar) should be displayed in Phase 1 or deferred to Phase 2.
