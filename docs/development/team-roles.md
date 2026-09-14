# Team Roles & Module Ownership: Fitora

> **GOVERNANCE NOTICE: PROPOSED — NOT APPROVED**  
> Specific framework and technology assignments (React, Spring Boot) in this role matrix represent candidate proposals only. The technology stack remains **TODO / UNDECIDED**.

This document defines team responsibilities, code ownership boundaries, review assignments, and decision protocols for **Fitora**.

---

## 👥 Role Definitions & Responsibilities

```text
┌─────────────────────────────────────────────────────────────┐
│                      TEAM RESPONSIBILITIES                  │
├───────────────────┬─────────────────────┬───────────────────┤
│ Frontend Lead     │ Backend Lead        │ Database & DevOps │
│ • React UI / SPA  │ • Spring Boot APIs  │ • RDBMS & Schema  │
│ • Vanilla CSS     │ • Domain Services   │ • Migrations      │
│ • State & Routing │ • Security & Auth   │ • CI/CD Pipelines │
├───────────────────┼─────────────────────┼───────────────────┤
│ UI/UX Design      │ Product & Content   │ QA & Testing      │
│ • Design Tokens   │ • Three Pillars     │ • End-to-End Tests│
│ • Responsive UX   │ • Awareness Content │ • Edge Case Audits│
│ • Micro-anims     │ • Gamification Math │ • Bug Triage      │
└───────────────────┴─────────────────────┴───────────────────┘
```

---

## 📦 Module Ownership Matrix

| Domain Module | Primary Owner | Secondary Reviewer | Scope & Files |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Nutrition** | Product / Backend | Frontend | Caloric formulas, food catalog, meal logging UI/API |
| **Pillar 2: Fitness** | Backend / Product | Frontend | Exercise library, active workout tracker, volume math |
| **Pillar 3: Awareness** | Product / Content | Frontend | Curated lesson curriculum, reader UI, reading XP |
| **Supporting: Habits** | Frontend / Backend | Product | Habit scheduler, streak calculations, toggle API |
| **Supporting: Progress** | Frontend / Backend | Product | Aggregation queries, chart visualizations |
| **Supporting: Gamification** | Product / Backend | Frontend | XP economy, levels, league matchmaking, badges |
| **Security & Auth** | Backend Lead | DevOps | JWT filters, credential storage, RBAC |
| **Database Schema** | Database / DevOps | Backend Lead | DDL tables, indexes, migration scripts, integrity |

---

## 🔍 Code Review Expectations

1. **At Least One Approval**: Every Pull Request must receive at least one approval from the primary or secondary module owner before merging into `develop`.
2. **Review Checklist**:
   - Does this code respect the Three Core Pillars and supporting system boundaries?
   - Does this introduce unnecessary dependencies or premature AI features?
   - Are edge cases covered with automated tests?
   - Has the corresponding documentation under `docs/` been updated?
3. **Turnaround Time**: Team members aim to review open PRs within 24 business hours to prevent pipeline stagnation.

---

## 📜 Architectural Decision Records (ADRs)

For significant changes impacting the tech stack, persistence model, or core calculations:
- Document the proposal in a draft markdown file under `docs/architecture/`.
- Discuss asynchronously or in architecture review syncs.
- Once agreed upon, update the relevant documentation and remove the corresponding `TODO: [Decision Needed]` tag.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Process]**: Finalize team communication channels (e.g., Slack/Discord) and sprint cadence (e.g., 2-week sprints).
- [ ] **TODO: [Process]**: Establish release numbering schedule (Semantic Versioning: `v0.1.0-alpha` -> `v1.0.0`).
