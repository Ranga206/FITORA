# Project Status: Fitora

This document tracks the current development status, phase roadmap, completed deliverables, and pending architectural decisions for the **Fitora** wellness platform.

---

## 📍 Current Phase

**Phase 1: Foundations & Core Pillar Implementation**

*Current Status*: **In Progress**
- Working Profile management service and responsive dashboard UI completed.
- **Approved Direction**: **Nutrition logging is the first implementation milestone.**

---

## 📊 Component Status Summary

| Area | Status | Notes |
| :--- | :--- | :--- |
| **Project Documentation** | 🟢 Complete (Baseline) | Comprehensive docs covering project, architecture, features, database, API, UI, and development. |
| **Core Architecture & UI Shell** | 🟢 Complete | FastAPI backend (PostgreSQL + Alembic) and Vite/React frontend dashboard with Light & Dark themes. |
| **User Profile Feature** | 🟢 Operational | Working biometrics profile integration (GET, POST, PATCH) connected to backend database. |
| **Core Pillar 1: Nutrition** | 🟡 In Progress | Food Catalog v1 (read-only, 50 verified USDA CC0 foods, deterministic query/pagination endpoints, strict conditional validation) is **implemented and tested**. Energy equations and meal logging remain pending decisions / planned. |
| **Core Pillar 2: Fitness** | ⚪ Specified / Planned | Requirements and feature docs drafted. Implementation to follow Nutrition. |
| **Core Pillar 3: Awareness** | ⚪ Specified / Planned | Content structure and educational concept tracking drafted. |
| **Supporting Systems (Habits/Progress/Gamification)** | ⚪ Specified / Planned | Core concepts documented. Unapproved gamification rules remain out of current milestone. |
| **AI & Intelligent Features** | 🟣 Future Scope | Explicitly deferred. Not part of initial release or current milestone. |

*Legend*: 🟢 Completed / Operational | 🟡 In Progress / Approved Milestone | ⚪ Specified / Planned | 🟣 Deferred / Future Scope

---

## 🎯 Scope Boundaries

### Approved Direction: Nutrition Logging (First Implementation Milestone)
- **Milestone Focus**: Nutrition logging is the first core pillar feature being implemented.
- **Target Audience**: Intended for **adults and teenagers**.
- **Meal Structure**: Support for 4 standard meal slots: **Breakfast, Lunch, Dinner, and Snacks**.
- **Tracked Nutrients**: Track **calories, protein, carbohydrates, and fats** from logged foods.
- **Energy Estimation**:
  - All calculated energy requirements must be explicitly identified as **estimates**.
  - Estimation must use **age-appropriate approaches** suitable for adults and teenagers.
  - Applicability to **Indian users** must be reviewed before selecting final equations.
- **Contract & Schema Preservation**:
  - The existing profile API (`/api/v1/profile`) and database schema (`profiles`) must remain **unchanged**.
  - Nutrition features consume existing profile biometrics read-only and manage meal logs independently.

### Explicitly Out of Current Scope
- ❌ **AI Meal Recognition**: Automated computer vision food photo recognition, barcode-scanning AI, or conversational LLM meal loggers.
- ❌ **Unapproved Gamification**: Points, XP values, streak badges, and league rewards for nutrition remain non-binding examples and are not approved for implementation.
- ❌ **Wearable Hardware Integrations**: Direct Bluetooth/syncing with smartwatches (Apple Watch, Garmin, Fitbit).
- ❌ **Social Network Feed**: Public user posts, comments, or multimedia social timelines.
- ❌ **Smart Contracts / Blockchain**: No decentralized ledger or cryptocurrency integration.

---

## ⏳ Key Pending Decisions (TODO / UNDECIDED)

The following items are not yet decided and remain **TODO / UNDECIDED**:

1. **Equation Selection**: Review applicability to Indian users (e.g., ICMR-NIN guidelines vs. Mifflin-St Jeor / Schofield / FAO/WHO) and select age-appropriate energy estimation equations for adults and teenagers.
2. **Undisclosed Sex Handling**: Finalize calculation strategy when biological sex is `prefer_not_to_say`.
3. **Physical Activity Classification**: Define baseline activity multipliers and tiers (Sedentary, Light, Moderate, Heavy) for adults and teenagers.
4. **Personalized Calorie-Target Rules**: Finalize deficit, maintenance, and surplus recommendation rules for adults versus teenagers.
5. **Food Database Strategy (Phase 1 Implemented)**: Food Catalog v1 implemented with a curated local dataset of 50 verified USDA FoodData Central CC0 1.0 records with official FDC IDs, explicit provenance, deterministic IDs, and strict conditional validation. Redistribution permissions for IFCT 2017 remain unresolved and blocked; IFCT data is not included in Phase 1.
6. **Authentication Mechanism**: Finalize token strategy (JWT stateless vs session-backed tokens) for multi-user production authentication.

---

## 🚀 Next Milestone

1. Finalize human sign-off on energy equations (with Indian population review) and food catalog source strategy.
2. Implement backend database migration for food items and meal logs (keeping `profiles` schema unchanged).
3. Implement Nutrition backend endpoints (`GET /api/v1/nutrition/today`, `GET /api/v1/nutrition/foods`, `POST /api/v1/nutrition/meals`).
4. Implement frontend Nutrition logging interface on the dashboard.
