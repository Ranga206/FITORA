# Project Status: Fitora

This document tracks the current development status, phase roadmap, completed deliverables, and pending architectural decisions for the **Fitora** wellness platform.

---

## 📍 Current Phase

**Phase 1: Project Scaffolding, Documentation & Architecture Planning**

*Current Status*: **In Progress (Scaffolding & Architecture Complete)**

> **Note**: Application source code (React, Spring Boot, database schema execution) has intentionally not been started. The current milestone is dedicated to defining requirements, product architecture, documentation, and interface specifications.

---

## 📊 Component Status Summary

| Area | Status | Notes |
| :--- | :--- | :--- |
| **Project Documentation** | 🟢 Complete (Baseline) | Comprehensive docs covering project, architecture, features, database, api, ui, and development. |
| **Folder Scaffolding** | 🟢 Complete | Clean root structure with `frontend/`, `backend/`, `database/`, and `docs/`. |
| **Core Pillar 1: Nutrition** | 🟡 Specified / Planned | Requirements and feature docs drafted. Formula and food database decisions pending. |
| **Core Pillar 2: Fitness** | 🟡 Specified / Planned | Requirements and feature docs drafted. Exercise library taxonomy pending. |
| **Core Pillar 3: Awareness** | 🟡 Specified / Planned | Content structure and educational concept tracking drafted. |
| **Supporting Systems (Habits/Progress/Gamification)**| 🟡 Specified / Planned | Core mechanics (XP, Streaks, Levels, Leagues) documented. Exact values pending. |
| **Frontend Application** | ⚪ Not Started | Placeholder folder created (`frontend/.gitkeep`). |
| **Backend API Service** | ⚪ Not Started | Placeholder folder created (`backend/.gitkeep`). |
| **Database Implementation** | ⚪ Not Started | Placeholder folder created (`database/.gitkeep`, `docs/database/schema.sql`). |
| **AI & Intelligent Features** | 🟣 Future Scope | Explicitly deferred. Not part of initial release or current milestone. |

*Legend*: 🟢 Completed | 🟡 In Specification / Planned | ⚪ Not Started | 🟣 Deferred / Future Scope

---

## 🎯 Scope Boundaries

### In Current Scope (Initial Milestone & Release)
- **Three Core Pillars**:
  1. **Nutrition**: Profiles, BMI screening context, calorie estimation, meal planning, meal logging, and basic education.
  2. **Fitness**: Exercise library, workout guidance, workout tracking, history, and consistency tracking.
  3. **Awareness**: Educational lessons, lifestyle wellness concepts (sleep, hydration, recovery), explaining the "why".
- **Supporting Systems**:
  - Daily habit tracking with streaks
  - Progress tracking with daily, weekly, and monthly analytics
  - Gamification: XP, levels, streaks, badges/achievements, challenges, and competitive leagues.
- **Foundations**: Clean layered REST architecture, responsive web UI, and relational database persistence.

### Explicitly Out of Current Scope (Future Roadmap)
- ❌ **Artificial Intelligence / Machine Learning**: Personalized AI meal generation, automated computer vision food logging, or AI fitness coaches. (Marked as future optional extension).
- ❌ **Wearable Hardware Integrations**: Direct Bluetooth/syncing with smartwatches (Apple Watch, Garmin, Fitbit).
- ❌ **Social Network Feed**: Public user posts, comments, or multimedia social timelines.
- ❌ **Smart Contracts / Blockchain**: No decentralized ledger or cryptocurrency integration.

---

## ⏳ Key Pending Decisions (Decisions Needed Before Implementation)

1. **Database Engine Choice**: Finalize between PostgreSQL or MySQL for the relational persistence layer.
2. **Nutrition Formula**: Finalize between Mifflin-St Jeor or Harris-Benedict equation for Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).
3. **Food Database Strategy**: Choose between an embedded starter dataset vs. an external food nutrition API.
4. **Gamification Balance**: Calibrate XP progression curves, level thresholds, and streak freeze rules.
5. **Authentication Mechanism**: Finalize token strategy (JWT stateless vs session-backed tokens).

---

## 🚀 Next Milestone

Once all documentation, specifications, and pending decisions are finalized and signed off by the team:
1. Initialize the backend Spring Boot skeleton in `backend/`.
2. Finalize and execute the SQL schema in `database/`.
3. Initialize the frontend Vite/React application in `frontend/`.
