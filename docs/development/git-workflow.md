# Git Workflow: Fitora

This document defines the Git branching model, commit conventions, pull request procedures, and code review standards for **Fitora**.

---

## 🌿 Branching Strategy

Fitora uses a structured **Git Flow** variant optimized for continuous integration and stability:

```text
    main (Production Releases)
     ▲
     │  Release Tag (e.g., v0.1.0)
     │
    develop (Integration Branch)
     ▲        ▲           ▲
     │        │           │
feature/*   fix/*       docs/*
```

### Primary Branches
- **`main`**: Always represents production-ready, stable, and verified releases. Direct commits to `main` are strictly blocked.
- **`develop`**: The primary staging and integration branch. All feature branches merge into `develop` via approved pull requests.

### Supporting Branches
Created off `develop` and named according to intent:
- **`feature/<name>`**: New feature additions (e.g., `feature/workout-logger`, `feature/streak-freeze`).
- **`fix/<name>`**: Bug fixes (e.g., `fix/bmi-rounding`, `fix/macro-chart-overflow`).
- **`docs/<name>`**: Documentation additions or modifications (e.g., `docs/api-contracts`).
- **`refactor/<name>`**: Code refactoring with no behavioral change (e.g., `refactor/nutrition-service`).
- **`chore/<name>`**: Tooling, build scripts, or dependency updates.

---

## ✍️ Commit Message Guidelines: Conventional Commits

All commits must adhere to the **Conventional Commits 1.0.0** specification:

```text
<type>(<optional scope>): <subject in imperative mood>

[optional detailed body explaining why and what]

[optional footer(s) such as Closes #123]
```

### Commit Types:
- `feat`: A new feature for the user.
- `fix`: A bug fix.
- `docs`: Documentation updates.
- `style`: Formatting, semicolons, whitespace (no production code change).
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: Code change that improves performance.
- `test`: Adding or updating test suites.
- `chore`: Build tasks, package updates, repository maintenance.

### Examples:
- `feat(nutrition): calculate TDEE based on activity multiplier`
- `fix(habits): prevent duplicate habit logs on same calendar date`
- `docs(api): document error response envelope for 422 Unprocessable Entity`
- `chore(deps): update vite build configuration`

---

## 📬 Pull Request (PR) Lifecycle

1. **Keep PRs Focused**: A PR should address a single logical change or feature. Avoid bundling multiple unrelated changes together.
2. **Sync with Develop**: Rebase or merge `develop` into your feature branch before opening a PR:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/your-feature
   git merge develop
   ```
3. **Run Pre-Flight Checks**: Ensure linting passes, tests execute cleanly, and documentation is updated.
4. **Open PR**: Target `develop`. Provide a descriptive title following conventional commit naming.
5. **PR Description Checklist**:
   - [ ] Summary of changes
   - [ ] Motivation & context
   - [ ] Linked Issue (e.g., `Fixes #42`)
   - [ ] Documentation updated in `docs/`
   - [ ] Automated tests added/updated
6. **Code Review**: Obtain at least one approval from a designated module owner.
7. **Merge Strategy**: Use **Squash and Merge** to maintain a linear and clean Git history on `develop`.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [CI Decision]**: Set up GitHub Actions CI workflow to automatically enforce commit linting and test execution on PRs.
- [ ] **TODO: [Branch Decision]**: Configure GitHub branch protection rules on `main` and `develop` requiring status checks to pass before merging.
