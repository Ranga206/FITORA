# Coding Guidelines: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> Specific framework guidelines (React, Spring Boot) represent candidate proposals only. Coding standards will be finalized once the human team approves the technology stack (**TODO / UNDECIDED**).

This document outlines the engineering standards, naming conventions, architectural boundaries, and code quality expectations for **Fitora**.

---

## 🏛️ General Engineering Principles

1. **Clarity Over Cleverness**: Code should be readable and self-documenting. Avoid obscure one-liners or esoteric syntax.
2. **Separation of Concerns**: Strictly respect architectural layers. Do not mix database queries into controllers, and do not embed business calculations into UI presentation components.
3. **Fail Fast & Explicitly**: Validate all inputs at domain boundaries and throw meaningful, descriptive domain exceptions.
4. **Consistency**: Follow the established patterns of the codebase. Consistency trumps personal style preferences.

---

## 💻 Frontend Guidelines (React & Vanilla CSS)

### 1. Component Architecture
- Place components in feature-driven folders (e.g., `features/nutrition/components/MealCard.jsx`).
- Keep components focused and modular: A single component should render a single cohesive part of the UI.
- Prefer functional components with standard React Hooks.
- Do not make direct HTTP requests inside presentational components; use dedicated API client services.

### 2. Styling (Vanilla CSS / CSS Modules)
- Use standard Vanilla CSS with custom properties (CSS variables defined in the design system).
- Avoid ad-hoc inline styles.
- Follow `kebab-case` for CSS class names (e.g., `.meal-card-header`, `.progress-bar-fill`).
- Maintain responsive behavior with mobile-first media queries (`@media (min-width: 768px)`).

### 3. Naming Conventions (Frontend)
- **Component files & functions**: `PascalCase` (e.g., `WorkoutTimer.jsx`, `NutritionSummary.jsx`).
- **Hook files**: `camelCase` prefixed with `use` (e.g., `useActiveWorkout.js`).
- **Utility & helper files**: `camelCase` (e.g., `calculateBmr.js`, `formatDate.js`).
- **Variables & properties**: `camelCase` (e.g., `targetCalories`, `isLoggingComplete`).

---

## ☕ Backend Guidelines (Java & Spring Boot)

### 1. Layered Responsibilities
- **Controllers (`@RestController`)**:
  - Accept HTTP requests, validate incoming DTOs (`@Valid`), call domain services, and return standardized response envelopes.
  - Controllers must contain **zero** business or persistence logic.
- **Services (`@Service`)**:
  - Encapsulate all business rules, calculations (e.g., BMR, XP awards, streak progression), and transaction boundaries (`@Transactional`).
- **Repositories (`@Repository`)**:
  - Encapsulate database interactions using Spring Data JPA. No HTTP or presentation logic allowed.
- **DTOs (`Data Transfer Objects`)**:
  - Decouple internal database entities from external API request/response payloads.

### 2. Naming Conventions (Backend)
- **Classes & Interfaces**: `PascalCase` (e.g., `MealService`, `UserRepository`, `CreateWorkoutRequestDto`).
- **Methods & Variables**: `camelCase` (e.g., `calculateDailyCalories()`, `userStreakCount`).
- **Constants & Enums**: `UPPER_SNAKE_CASE` (e.g., `MAX_STREAK_FREEZES`, `MEAL_TYPE_BREAKFAST`).
- **Package Names**: All lowercase, dot-separated (e.g., `com.fitora.nutrition.service`).

---

## 🗄️ Database Guidelines

- **Table Names**: Plural `snake_case` (e.g., `food_items`, `workout_sets`, `habit_logs`).
- **Column Names**: Singular `snake_case` (e.g., `created_at`, `current_weight_kg`, `user_id`).
- **Foreign Keys**: Named `<singular_referenced_table>_id` (e.g., `user_id`, `meal_id`).
- **Parameterized Queries Only**: Always use prepared statements or JPA query methods. Never concatenate user input into SQL queries.

---

## 🧪 Testing Standards

- **Unit Tests**:
  - Every calculation engine (BMR, TDEE, XP formulas, streak logic) must have comprehensive unit tests covering edge cases.
- **Integration Tests**:
  - Validate core API endpoints with database test containers (verifying transaction rollbacks, authentication rejections, and correct status codes).

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Linter Decision]**: Finalize ESLint and Prettier configurations for the frontend repository.
- [ ] **TODO: [Linter Decision]**: Finalize Checkstyle / Spotless configuration for the Java backend.
- [ ] **TODO: [Testing Decision]**: Determine target unit test coverage threshold (e.g., minimum 80% line coverage for service layer).
