# Contributing to Fitora

Thank you for your interest in contributing to **Fitora**! Fitora is a wellness and lifestyle platform built around three core pillars—**Nutrition**, **Fitness**, and **Awareness**—supported by **Habit Tracking**, **Progress Analytics**, and **Gamification**.

To ensure consistency, quality, and maintainability across the codebase and documentation, please review the following guidelines before submitting any contributions.

---

## 🧭 Guiding Principles

1. **The Big 3 Core Pillars**: Nutrition, Fitness, and Awareness are central. All features should strengthen or connect these three pillars.
2. **Supportive Systems**: Habits, progress tracking, and gamification exist to encourage healthy daily consistency, not extreme or punitive behavior.
3. **Education First (The "Why")**: We do not just tell users what to do; we provide awareness to help them understand why healthy choices matter.
4. **Planning Before Code**: No major code or architectural changes should be submitted without an accepted proposal or design specification.
5. **No Premature AI Features**: Artificial intelligence is strictly designated as a **future optional extension**. Initial releases focus on robust core tracking, education, and gamification.

---

## 🌿 Git & Branching Workflow

We follow a structured Git workflow:

- `main`: Production-ready, stable releases.
- `develop`: Primary integration branch for ongoing work.
- Feature branches: Created from `develop` using the following naming conventions:
  - `feature/<feature-name>` (e.g., `feature/meal-tracking`)
  - `fix/<bug-description>` (e.g., `fix/streak-calculation`)
  - `docs/<documentation-topic>` (e.g., `docs/api-specifications`)
  - `refactor/<scope>` (e.g., `refactor/nutrition-service`)

### Commit Message Standards

We adopt the **Conventional Commits** specification:

```text
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

**Allowed types**:
- `feat`: A new user-facing feature
- `fix`: A bug fix
- `docs`: Documentation-only changes
- `style`: Code style/formatting changes (no production logic change)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or correcting tests
- `chore`: Maintenance, build tasks, dependency updates

*Example*: `feat(nutrition): add daily calorie intake calculator`

---

## 🛠️ Development & Documentation Rules

- **Documentation First**: When proposing a new feature or modifying an existing system, update the relevant markdown files under `docs/` before or alongside your implementation.
- **TODO Markers**: If an architectural, formulaic, or technical detail has not yet been agreed upon, tag it explicitly with `TODO: [Decision Needed]` rather than making unverified assumptions.
- **Clean Architecture**: Maintain clean separation between Presentation (Frontend), Business Logic (Backend Services), and Persistence (Database).
- **Zero Unused Dependencies**: Avoid introducing third-party packages or complex libraries without clear justification and discussion.

---

## 📬 Pull Request (PR) Process

1. Fork the repository and create your branch from `develop`.
2. Ensure your code passes all lint checks, unit tests, and adheres to the coding style guidelines.
3. Update any relevant documentation in `docs/` reflecting your changes.
4. Open a Pull Request pointing to `develop`.
5. Fill out the PR template completely:
   - Summary of changes
   - Motivation and context
   - Testing steps performed
   - Screenshots/recordings for UI updates
6. Request review from the relevant module owner (see [Team Roles](docs/development/team-roles.md)).
7. Address any feedback promptly. Once approved, PRs will be squashed and merged.

---

## 💬 Questions and Discussions

If you have questions about architecture or product direction, check the documentation in [docs/](docs/README.md) or open an issue for team discussion.
