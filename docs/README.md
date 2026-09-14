# Fitora Project Documentation

Welcome to the **Fitora Documentation Suite**. This directory contains the architectural plans, product requirements, system designs, feature specifications, and development guidelines for Fitora.

---

## 🧭 Philosophy & Structure

Fitora is structured around **The Big 3** core pillars:
1. **[Nutrition](features/nutrition.md)**: Fueling the body through balanced nutrition, calorie understanding, and meal tracking.
2. **[Fitness](features/fitness.md)**: Moving the body with structured workouts, exercise directory, and progress logs.
3. **[Awareness](features/awareness.md)**: Educating the mind on the *why* behind health, fitness, and lifestyle choices.

These pillars are reinforced by three **Supporting Systems**:
- **[Habit Tracking](features/habits.md)**: Sustaining daily consistency.
- **[Progress Analytics](features/progress.md)**: Visualizing historical trends across all dimensions.
- **[Gamification](features/gamification.md)**: Driving long-term engagement via XP, levels, streaks, badges, and competitive leagues.

> **AI Status Note**: Artificial Intelligence is **NOT** included in the initial implementation. AI features are cataloged strictly as a future optional extension.

---

## 📁 Documentation Roadmap

| Section | Description | Key Documents |
| :--- | :--- | :--- |
| **[`project/`](project/README.md)** | Product vision, problem definition, objectives, and scope boundaries. | [Overview](project/overview.md), [Problem Statement](project/problem-statement.md), [Objectives](project/objectives.md), [Scope](project/scope.md), [Requirements](project/requirements.md) |
| **[`architecture/`](architecture/README.md)** | System topology, data flow, tech stack evaluation, and security concepts. | [System Architecture](architecture/system-architecture.md), [Application Flow](architecture/application-flow.md), [Tech Stack](architecture/technology-stack.md), [Security Architecture](architecture/security-architecture.md) |
| **[`features/`](features/README.md)** | Detailed functional specifications for the Big 3 pillars and supporting systems. | [Nutrition](features/nutrition.md), [Fitness](features/fitness.md), [Awareness](features/awareness.md), [Progress](features/progress.md), [Habits](features/habits.md), [Gamification](features/gamification.md) |
| **[`database/`](database/README.md)** | Entity relationships, data modeling, normalization, and SQL schema placeholder. | [Database Design](database/database-design.md), [ER Diagram](database/er-diagram.md), [schema.sql](database/schema.sql) |
| **[`api/`](api/README.md)** | REST API conventions, URL routing, status codes, and endpoint specifications. | [API Specification](api/api-specification.md) |
| **[`ui/`](ui/README.md)** | Design tokens, color system, navigation structure, and screen specifications. | [Design System](ui/design-system.md), [Navigation](ui/navigation.md), [Screens](ui/screens.md) |
| **[`development/`](development/README.md)** | Local environment setup, Git conventions, coding standards, and team roles. | [Setup Guide](development/setup.md), [Git Workflow](development/git-workflow.md), [Coding Guidelines](development/coding-guidelines.md), [Team Roles](development/team-roles.md) |

---

## 📌 Documentation Conventions

- **Clear Scope Separation**: Current milestone features are documented with explicit specifications; upcoming or future features are marked clearly.
- **`TODO: [Decision Needed]` Markers**: Unfinalized implementation details (such as exact mathematical formulas, third-party vendor integrations, or database table field constraints) are denoted with actionable `TODO:` tags.
- **No Unimplemented Source Code**: This documentation outlines systems prior to implementation. Source code generation takes place only after documentation and design approval.
