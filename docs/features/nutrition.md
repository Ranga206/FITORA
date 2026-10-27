# Core Pillar 1: Nutrition

This document outlines the functional and domain specifications for the **Nutrition** pillar of **Fitora**.

---

## 🎯 Implementation Milestone Status

> **APPROVED DIRECTION**
> **Nutrition logging is the first implementation milestone of Fitora.**

- **Target Audience**: Fitora is intended for **adults and teenagers**.
- **Meal Structure**: Support for 4 standard meal slots: **Breakfast, Lunch, Dinner, and Snacks**.
- **Tracked Nutrients**: Track **calories, protein, carbohydrates, and fats** from logged foods.
- **Energy Estimation Nature**: All calculated energy requirements must be explicitly identified and presented as **estimates**.
- **Age-Appropriate Estimation**: Energy estimation must use **age-appropriate approaches** suitable for adults and teenagers.
- **Population Suitability**: Applicability to **Indian users** must be reviewed before selecting the final equations.
- **Profile & Schema Preservation**: The existing profile API (`/api/v1/profile`) and database schema (`profiles`) must remain **unchanged**. Nutrition will consume existing biometrics read-only and manage nutrition-specific logs independently.
- **Out-of-Scope Boundaries**: AI meal recognition (computer vision, photo logging, LLM parsing) and unapproved gamification mechanics remain strictly **out of scope**.

---

## 🥗 Overview & Purpose

Nutrition is the first core pillar of Fitora. The objective is to guide users toward balanced, mindful eating habits through accessible calorie context, structured meal planning, and straightforward meal logging.

Fitora emphasizes sustainable nutritional balance rather than extreme restriction or crash dieting.

---

## 📋 Functional Capabilities

### 1. Nutrition Profile & Biometrics Integration
- Consumes existing profile biometrics without modifying the profile contract or schema:
  - Age (supports adults and teenagers)
  - Biological Sex (`male`, `female`, `prefer_not_to_say`)
  - Height (cm)
  - Current Weight (kg)
- *Note*: Any nutrition-specific goal or activity inputs will be maintained independently of the core `profiles` table.

### 2. BMI Calculation & Screening Context
- Computes standard Body Mass Index for baseline context:
  $$\text{BMI} = \frac{\text{weight in kilograms}}{(\text{height in meters})^2}$$
- Categorizes BMI into standard WHO reference ranges (Underweight, Normal, Overweight, Obese).
- **Mandatory Medical Disclaimer**: BMI is presented strictly as a general screening metric for baseline context. The UI must explicitly inform users that BMI does not account for lean muscle mass, bone density, or individual metabolic health and is not a medical diagnosis.

### 3. Energy & Calorie Requirement Estimation
- All calculated energy requirements must be clearly identified to users as **estimates**.
- Estimation methods must use **age-appropriate approaches** reflecting differences between adults and teenagers.
- **Applicability to Indian users must be reviewed before selecting the final equations** (evaluating body composition differences, metabolic variations, and regional validation).
- Recommends daily caloric estimates based on user goals:
  - Weight Loss: Moderate caloric deficit.
  - Maintenance: Equal to estimated energy expenditure.
  - Muscle Gain: Moderate caloric surplus.
- Estimates baseline macronutrient distribution (Protein, Carbohydrates, Dietary Fats).

### 4. Meal Slots (Approved)
- Structures each day into 4 primary meal slots:
  1. **Breakfast**
  2. **Lunch**
  3. **Dinner**
  4. **Snacks**
- Users can log foods directly into these slots or plan ahead.

### 5. Meal & Nutrition Tracking (Approved)
- Users log food items with:
  - Food Name
  - Logged Quantity and Serving Unit
  - **Calories (kcal)**
  - **Protein (g)**
  - **Carbohydrates (g)**
  - **Fats (g)**
- **Nutrient Reference Basis Standard**: Every catalog item must declare an explicit, unambiguous reference basis (`per_100g`, `per_100ml`, or `per_serving` with documented serving weight/volume) to prevent double-scaling or unit mismatches.
- **Cooked Food Integrity**: Raw nutrient values must never be presented as cooked values. Cooked foods require verified cooked laboratory data or documented recipe yield calculations; unverified cooked foods are excluded from Phase 1.
- Real-time aggregation of consumed calories and macros against daily estimated targets.
- **Historical Snapshot Rule**: When meals are logged, nutrient values are snapshotted on the meal log item so later catalog corrections never silently alter historical nutrition totals.

### 6. Basic Nutrition Education
- Integrated tips and insights displayed within the nutrition hub:
  - Importance of adequate dietary protein for satiety and tissue repair.
  - Role of dietary fiber and complex carbohydrates in energy stability.
  - Role of healthy fats in hormonal balance.

---

## 🚫 Explicitly Out of Scope

- **AI Meal Recognition**: Automated computer vision food photo recognition, barcode-scanning AI, or conversational LLM meal loggers are strictly out of scope.
- **Unapproved Gamification**: Points, XP values, streak badges, and league rewards for nutrition remain non-binding examples and are not approved for implementation.

---

## 📝 Planned Decisions / TODOs

The following items are not yet decided and remain **TODO / UNDECIDED**:

- [x] **IMPLEMENTED & TESTED: [Food Catalog v1]**: Implemented read-only Food Catalog backend endpoints (`GET /api/v1/nutrition/foods`, `GET /api/v1/nutrition/foods/{id}`), `food_items` model, Alembic migration (`dd5a613843df_create_food_items`), deterministic idempotent seed process (`backend/scripts/seed_food_catalog.py`), strict conditional serving validation, draft filtering, and deterministic nutrient calculations. Production dataset contains 50 verified USDA FoodData Central CC0 1.0 foods.
- [ ] **TODO: [Equation Selection]**: Review applicability of candidate BMR/energy expenditure equations to Indian users (e.g., ICMR-NIN guidelines vs. Mifflin-St Jeor / Schofield / FAO/WHO) and select age-appropriate equations for adults and teenagers.
- [ ] **TODO: [Undisclosed Sex Handling]**: Finalize calculation strategy when biological sex is `prefer_not_to_say` (e.g., sex-neutral midpoint constant, conservative lower bound, or prompting for voluntary metabolic baseline).
- [ ] **TODO: [Activity Classification]**: Define baseline physical activity multipliers/tiers (Sedentary, Light, Moderate, Heavy) and their application to teenagers and adults.
- [ ] **TODO: [Personalized Calorie Targets]**: Finalize rules for calculating personalized calorie deficits and surpluses for adults versus teenagers (e.g., avoiding deficits for growing adolescents).
- [ ] **BLOCKED: [IFCT Licensing]**: Confirm licensing and redistribution permissions for ICMR-NIN IFCT 2017 before embedding data in the production catalog. Permissive CC0 1.0 data from USDA FoodData Central is utilized for Phase 1. IFCT data remains excluded until permissions are formally resolved.
- [ ] **TODO: [Indian Cooked Dishes Verification]**: Secure verified cooked-food laboratory values or standard composite recipe calculations; Indian-specific cooked dishes without permitted source data or reviewed recipe calculations are excluded from Phase 1.
- [ ] **TODO: [Meal Logging & Snapshots]**: Implement meal logging endpoints (`POST /api/v1/nutrition/meals`) with immutable nutrient snapshots preserving logged food name, quantity, unit, reference basis, calories, protein, carbs, and fat.
- [ ] **TODO: [Custom Meal Categories]**: Decide whether users can define custom meal categories beyond the 4 approved standard slots (Breakfast, Lunch, Dinner, Snacks).
- [ ] **TODO: [Micronutrient Tracking]**: Decide whether micronutrient tracking (fiber, sodium, sugar) should be displayed in Phase 1 or deferred to Phase 2.
