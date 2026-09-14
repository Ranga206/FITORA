# Fitora Project Audit

---

## 1. Audit Purpose

This audit report records the actual, verified state of the **Fitora** repository, including documentation, governance adherence, file structure, established decisions, and unresolved items. It provides the human project team with an evidence-based assessment of the project before any technical architecture or application development begins.

---

## 2. Audit Scope

The audit inspected all areas of the local repository:

- **Root Files**: [`README.md`](../../README.md), [`CONTRIBUTING.md`](../../CONTRIBUTING.md), [`PROJECT_STATUS.md`](../../PROJECT_STATUS.md), [`.gitignore`](../../.gitignore), [`.env.example`](../../.env.example)
- **AI Governance**: [`AGENTS.md`](../../AGENTS.md), [`docs/development/ai-agent-guidelines.md`](ai-agent-guidelines.md)
- **Project Documentation**: [`docs/project/`](../project/README.md) (`overview.md`, `problem-statement.md`, `objectives.md`, `scope.md`, `requirements.md`, `mvp-scope.md`, `product-requirements.md`)
- **Architecture Documentation**: [`docs/architecture/`](../architecture/README.md) (`system-architecture.md`, `application-flow.md`, `technology-stack.md`, `security-architecture.md`)
- **Feature Documentation**: [`docs/features/`](../features/README.md) (`nutrition.md`, `fitness.md`, `awareness.md`, `progress.md`, `habits.md`, `gamification.md`)
- **Database Documentation**: [`docs/database/`](../database/README.md) (`database-design.md`, `er-diagram.md`, `schema.sql`)
- **API Documentation**: [`docs/api/`](../api/README.md) (`api-specification.md`)
- **UI Documentation**: [`docs/ui/`](../ui/README.md) (`design-system.md`, `navigation.md`, `screens.md`)
- **Development Documentation**: [`docs/development/`](README.md) (`setup.md`, `git-workflow.md`, `coding-guidelines.md`, `team-roles.md`)
- **Scaffolding Placeholders**: `frontend/.gitkeep`, `backend/.gitkeep`, `database/.gitkeep`
- **Git Version Control State**: Inspected via `git status`, `git log`, and `git ls-files`.

---

## 3. Current Repository State

Based on direct Git inspection (`git status -uall`):

| Area / Path | Current State | Notes |
| :--- | :--- | :--- |
| **`.gitignore`** | Modified (Tracked) | Updated to ignore fullstack artifacts (Node, Java, SQL, IDEs). |
| **`README.md`** | Modified (Tracked) | Updated with the Big 3 pillars, supporting systems, and docs index. |
| **`AGENTS.md`** | Untracked (New) | Entry-point governance file establishing human team authority. |
| **`CONTRIBUTING.md`** | Untracked (New) | Guidelines for branch naming, commits, and PR standards. |
| **`PROJECT_STATUS.md`** | Untracked (New) | Milestone tracking, scope boundaries, and pending decision list. |
| **`.env.example`** | Untracked (New) | Configuration template with ports and credential placeholders. |
| **`frontend/`** | Untracked (`.gitkeep`) | Empty placeholder directory. Zero application code. |
| **`backend/`** | Untracked (`.gitkeep`) | Empty placeholder directory. Zero application code. |
| **`database/`** | Untracked (`.gitkeep`) | Empty placeholder directory. Zero migration scripts executed. |
| **`docs/project/`** | Untracked (8 files) | Project vision, problem, scope, requirements, MVP scope, PRD. |
| **`docs/architecture/`**| Untracked (5 files) | N-Tier model, flows, tech stack evaluation, security principles. |
| **`docs/features/`** | Untracked (7 files) | Feature specs for Big 3 pillars and 3 supporting systems. |
| **`docs/database/`** | Untracked (4 files) | Relational design, ER diagram, and placeholder `schema.sql`. |
| **`docs/api/`** | Untracked (2 files) | API envelopes, HTTP status codes, and endpoint catalog. |
| **`docs/ui/`** | Untracked (4 files) | Design system tokens, navigation mapping, and screen specs. |
| **`docs/development/`** | Untracked (6 files) | Guidelines, setup, git workflow, team roles, AI guidelines. |

**Summary**: 2 modified tracked files, 43 untracked files across 8 directories. Zero application code files exist.

---

## 4. Work Completed So Far

| Work Item | File / Area | Status | Evidence / Notes |
| :--- | :--- | :--- | :--- |
| **Initial Commit** | Root repository | Complete | Git commit `0f7d6a8` and `49ad385` (early README update). |
| **Scaffolding** | `frontend/`, `backend/`, `database/` | Complete | Scaffolding created with `.gitkeep` placeholders only. |
| **Documentation Setup** | `docs/` (35 initial files) | Complete | Comprehensive baseline documentation suite created. |
| **AI Governance Setup** | `AGENTS.md`, `ai-agent-guidelines.md` | Complete | Established human decision authority and AI restrictions. |
| **MVP Scope Definition** | `docs/project/mvp-scope.md` | Proposed | Concise 5-minute MVP scope definition awaiting human review. |
| **Product Requirements** | `docs/project/product-requirements.md` | Proposed | User-centric PRD covering all features; corrected in Phase 2. |

---

## 5. Governance Audit

Adherence to [`AGENTS.md`](../../AGENTS.md) and [`docs/development/ai-agent-guidelines.md`](ai-agent-guidelines.md):

| Governance Check | Status | Finding / Evidence |
| :--- | :--- | :--- |
| **AI Decision-Making Authority** | **PASS** | No architectural, technical, or product choices have been declared `FINAL` by the AI. |
| **Unapproved Assumptions** | **WARNING** | Early documentation drafts (e.g., `technology-stack.md`, `design-system.md`) contain candidate suggestions (e.g., React, Spring Boot, color hex codes) created before Strict Human-Instruction Mode. These remain suggestions, but must be reviewed by the human team. |
| **Status Taxonomy Usage** | **PASS** | All unapproved features are marked `PROPOSED`; undecided items are marked `TODO / UNDECIDED`; AI is marked `FUTURE`. |
| **Undecided Item Preservation** | **PASS** | No `TODO / UNDECIDED` formulas, schemas, or rules have been resolved or implemented. |
| **AI Scope Enforcement** | **PASS** | AI is strictly cataloged as `FUTURE` across all documentation. Zero AI code or APIs exist. |
| **Scope Expansion Control** | **PASS** | Zero application source code, database implementations, or unauthorized packages have been added. |
| **Cross-Document Consistency** | **WARNING** | Minor wording differences exist between earlier baseline documents (e.g., `README.md` retaining the tagline) and the corrected `product-requirements.md`. |

---

## 6. Product Definition Audit

| Product Dimension | Status | Notes |
| :--- | :--- | :--- |
| **Core Pillar 1: Nutrition** | **CLEAR** | Consistently documented as primary pillar across all files. |
| **Core Pillar 2: Fitness** | **CLEAR** | Consistently documented as primary pillar across all files. |
| **Core Pillar 3: Awareness** | **CLEAR** | Consistently documented as primary pillar focusing on the "WHY". |
| **Supporting: Progress** | **CLEAR** | Correctly identified as supporting system. |
| **Supporting: Habits** | **CLEAR** | Correctly identified as supporting system. |
| **Supporting: Gamification** | **CLEAR** | Correctly identified as supporting system (not a fourth primary pillar). |
| **Future: Artificial Intelligence** | **CLEAR** | Excluded from MVP; categorized as `FUTURE` optional extension. |

---

## 7. MVP Audit

Current status of all proposed MVP feature areas from [`docs/project/mvp-scope.md`](../project/mvp-scope.md) and [`docs/project/product-requirements.md`](../project/product-requirements.md):

| Feature Area | Pillar / System | Documented Status | Clearly Defined? | Human Approval Needed? |
| :--- | :--- | :--- | :--- | :--- |
| **Nutrition Profile** | Nutrition | `PROPOSED` | Partially (fields undecided) | Yes |
| **BMI Context** | Nutrition | `PROPOSED` | Yes (screening only) | Yes |
| **Calorie Estimation** | Nutrition | `PROPOSED` | Partially (formula undecided) | Yes |
| **Meal Planning** | Nutrition | `PROPOSED` | Yes (4 standard slots) | Yes |
| **Meal Logging** | Nutrition | `PROPOSED` | Partially (data source undecided)| Yes |
| **Nutrition Tracking** | Nutrition | `PROPOSED` | Yes (calories & macros) | Yes |
| **Nutrition Education** | Nutrition | `PROPOSED` | Yes (practical tips) | Yes |
| **Exercise Library** | Fitness | `PROPOSED` | Partially (catalog list undecided)| Yes |
| **Workout Guidance** | Fitness | `PROPOSED` | Yes (baseline routines) | Yes |
| **Workout Logging** | Fitness | `PROPOSED` | Yes (sets, reps, weight) | Yes |
| **Workout History** | Fitness | `PROPOSED` | Yes (chronological logs) | Yes |
| **Fitness Education** | Fitness | `PROPOSED` | Yes (safety & warmup tips) | Yes |
| **Consistency Tracking** | Fitness | `PROPOSED` | Yes (weekly frequency) | Yes |
| **Nutrition Awareness** | Awareness | `PROPOSED` | Yes (energy & macros) | Yes |
| **Fitness Awareness** | Awareness | `PROPOSED` | Yes (hypertrophy & recovery)| Yes |
| **Lifestyle Awareness** | Awareness | `PROPOSED` | Yes (sleep, water, stress) | Yes |
| **Educational Lessons** | Awareness | `PROPOSED` | Partially (curriculum undecided)| Yes |
| **Healthy Lifestyle Concepts**| Awareness | `PROPOSED` | Yes (core concept explainers)| Yes |
| **Explain "WHY", Not "WHAT"**| Awareness | `PROPOSED` | Yes (foundational philosophy)| Yes |
| **Progress Tracking** | Progress | `PROPOSED` | Partially (charting undecided) | Yes |
| **Habit Tracking** | Habits | `PROPOSED` | Partially (freeze rules undecided)| Yes |
| **Gamification: XP** | Gamification | `PROPOSED` | Partially (points undecided) | Yes |
| **Gamification: Levels** | Gamification | `PROPOSED` | Partially (curve math undecided) | Yes |
| **Gamification: Streaks** | Gamification | `PROPOSED` | Partially (freeze math undecided)| Yes |
| **Gamification: Badges** | Gamification | `PROPOSED` | Partially (badge list undecided)| Yes |
| **Gamification: Challenges**| Gamification | `PROPOSED` | Partially (event rules undecided)| Yes |
| **Gamification: Leagues** | Gamification | `PROPOSED` | Partially (cohort math undecided)| Yes |

---

## 8. Open Decisions

Consolidated list of unresolved items documented as `TODO / UNDECIDED`:

### 8.1. Product Decisions
- [ ] Finalize whether the product tagline (*"Eat Better • Move Better • Live Better"*) is officially approved or should be removed.
- [ ] Decide whether custom meal slots are permitted beyond the standard 4 slots (Breakfast, Lunch, Dinner, Snacks).
- [ ] Determine baseline habit list for new user onboarding.
- [ ] Finalize initial curriculum topics for Awareness educational lessons.

### 8.2. Calculation & Rule Decisions
- [ ] Select the BMR / calorie calculation formula (e.g., **Mifflin-St Jeor** vs. **Revised Harris-Benedict**).
- [ ] Define the mathematical formula for level progression thresholds.
- [ ] Establish daily XP award amounts per completed action.
- [ ] Formulate streak freeze mechanics (maximum freezes held, acquisition criteria, and reset timing).
- [ ] Define league cohort size (e.g., 25–30 users) and promotion/demotion percentage thresholds.

### 8.3. Data Decisions
- [ ] Select food database strategy: in-house curated seed catalog vs. integration with an external food API (e.g., Open Food Facts / USDA).
- [ ] Finalize initial exercise library catalog and taxonomy.

### 8.4. Technical Decisions
- [ ] Select relational database engine (**PostgreSQL** vs. **MySQL**).
- [ ] Choose backend build tooling (**Maven** vs. **Gradle**).
- [ ] Choose frontend chart rendering library for progress trends.
- [ ] Finalize authentication token transmission and storage mechanics (HTTP-only cookies vs. Authorization headers).
- [ ] Define primary key convention (UUID vs. BIGSERIAL).

---

## 9. Documentation Quality Audit

| Quality Attribute | Status | Evaluation |
| :--- | :--- | :--- |
| **Clarity** | **PASS** | Documentation uses simple, accessible English with clear headings and tables. |
| **Conciseness** | **PASS** | [`mvp-scope.md`](../project/mvp-scope.md) and [`product-requirements.md`](../project/product-requirements.md) are designed for fast reading (~5 mins). |
| **Consistency** | **WARNING** | The tagline and user journey were removed/simplified in `product-requirements.md` per human instructions, but still exist in earlier files (`README.md`, `mvp-scope.md`). |
| **Separation of Concerns** | **PASS** | Product requirements (`product-requirements.md`) are strictly separated from technical architecture (`docs/architecture/`). |
| **Taxonomy Correctness** | **PASS** | Strict adherence to `FINAL`, `PROPOSED`, `TODO / UNDECIDED`, and `FUTURE`. Nothing is prematurely marked `FINAL`. |

---

## 10. Unapproved or Potentially AI-Generated Decisions

The following items exist in early documentation drafts and require human team review:

1. **Product Tagline**: *"Eat Better • Move Better • Live Better"* (present in `README.md` and `mvp-scope.md`) — **Requires human review**.
2. **Technology Candidate Mentions**: Spring Boot, React, Vite, and PostgreSQL/MySQL in `docs/architecture/technology-stack.md` — **Requires human review**.
3. **UI Color Tokens**: Suggested hex codes (Emerald, Cyan, Violet, Obsidian) in `docs/ui/design-system.md` — **Requires human review**.
4. **Rest Timer Suggestion**: 60-second rest timer mention in `fitness.md` and `screens.md` — **Requires human review**.
5. **XP Economy Numbers**: Example numbers (e.g., +15 XP, +50 XP) in `features/gamification.md` — **Requires human review**.

---

## 11. Recommended Next Step

> **RECOMMENDATION — NOT A DECISION**

Before moving into technical design, database implementation, or application coding, the human project team should:

1. **Review and Approve the Product Requirements**: Review [`docs/project/product-requirements.md`](../project/product-requirements.md) and [`docs/project/mvp-scope.md`](../project/mvp-scope.md). Formally approve or amend the proposed MVP scope.
2. **Decide Key Product Questions**: Formally decide the product tagline and food data strategy.
3. **Select Foundational Technologies**: Decide the database engine (PostgreSQL vs. MySQL) and backend build tool (Maven vs. Gradle).

---

## 12. Audit Summary

- **Complete**: Folder scaffolding, master documentation index, AI governance protocols, MVP scope proposal, and product requirements document.
- **Clean**: Zero application code written; zero unapproved packages installed; zero premature AI features introduced.
- **Needs Review**: Candidate tech stack suggestions, suggested UI color tokens, and product tagline.
- **Undecided**: BMR formulas, food catalog source, exercise list, and gamification mathematical values.
- **Readiness**: **READY FOR HUMAN REVIEW**. The documentation is organized, clean, and prepared for the human project team to review and make authoritative decisions.

---

## 13. Documentation Cleanup Audit (Post-Cleanup Verification)

*Audit Timestamp*: 2026-09-14 (Cleanup Execution)

### Warnings Resolved
1. **Warning 1 (Technical Candidates Labeled)**:
   - All early candidate technical choices (Spring Boot, React, Vite, Java, PostgreSQL, MySQL, Maven, Gradle, JWT, REST, UI color tokens, and navigation routes) in `technology-stack.md`, `system-architecture.md`, `security-architecture.md`, `database-design.md`, `api-specification.md`, `design-system.md`, `navigation.md`, `screens.md`, `setup.md`, `coding-guidelines.md`, and `team-roles.md` now carry prominent governance notices clearly labeling them as `PROPOSED / CANDIDATE — NOT APPROVED` and `TODO / UNDECIDED`.
2. **Warning 2 (Tagline Consistency)**:
   - The tagline (*"Eat Better • Move Better • Live Better"*) has been verified and consistently labeled across all retained locations (`README.md`, `docs/project/mvp-scope.md`, `docs/project/overview.md`) as `PROPOSED — NOT APPROVED`, resolving cross-document ambiguity.
3. **Warning 3 (Gamification Numbers Labeled as Non-Binding Examples)**:
   - All numerical examples for XP awards, level progression formulas, challenge durations, streak bonuses, and league cohort sizes across `docs/features/gamification.md`, `nutrition.md`, `fitness.md`, `awareness.md`, `habits.md`, `progress.md`, and `docs/ui/screens.md` are now explicitly labeled with `EXAMPLE ONLY — NOT A FITORA RULE`.

### Warnings Remaining
- None of the previous 3 warnings remain unresolved. All exploratory suggestions and non-binding examples have been explicitly classified so they cannot be mistaken for approved Fitora rules.

### Decisions NOT Made
This cleanup task was strictly administrative and documentation-focused. The AI did **NOT** make or select:
- Database engine (PostgreSQL vs. MySQL remains undecided)
- Build tool (Maven vs. Gradle remains undecided)
- Architectural pattern (N-Tier remains a candidate proposal)
- API design and contracts (endpoints remain candidate proposals)
- Security implementation (JWT vs. session tokens remains undecided)
- Calculation formulas (BMR / calorie equations remain undecided)
- Food data source (curated seed vs. external API remains undecided)
- Exercise catalog contents and media scope (remains undecided)
- Awareness curriculum topics and authoring workflow (remains undecided)
- Gamification formulas, numerical XP values, and league cohort sizes (remain undecided)

### Human Decisions Required
The following authoritative decisions are required from the human project team before implementation planning can proceed:
1. **Product Scope & Requirements**: Formally review and approve [`docs/project/mvp-scope.md`](../project/mvp-scope.md) and [`docs/project/product-requirements.md`](../project/product-requirements.md).
2. **Tagline Decision**: Formally approve, replace, or drop the proposed tagline (*"Eat Better • Move Better • Live Better"*).
3. **Calorie Equation**: Choose the mathematical formula for BMR / TDEE (e.g., Mifflin-St Jeor vs. Revised Harris-Benedict).
4. **Food Catalog Strategy**: Decide between building an internal seed dataset vs. integrating an external nutrition API.
5. **Technology Stack**: Formally select the backend framework/build tool (e.g., Spring Boot with Maven or Gradle), frontend framework, and relational database engine (PostgreSQL vs. MySQL).
