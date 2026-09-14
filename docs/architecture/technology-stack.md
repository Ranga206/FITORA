# Technology Stack: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> The technologies, frameworks, runtimes, and libraries listed below represent exploratory candidate options only. None have been approved or finalized by the human project team. All technology choices remain **TODO / UNDECIDED**.

This document outlines the planned technology stack, architectural evaluation criteria, and tooling ecosystem for **Fitora**.

---

## 🎯 Technology Selection Principles

1. **Simplicity & Maintainability**: Favor established, robust, well-documented technologies over experimental or bleeding-edge frameworks.
2. **Decoupled Architecture**: Maintain a clean boundary between the presentation tier (frontend) and business logic (backend REST API).
3. **No Unnecessary Dependencies**: Every library or dependency must have a clear, justified purpose.
4. **No Premature AI Integration**: AI frameworks and ML dependencies are strictly excluded from the initial technology footprint.

---

## 💻 Stack Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND CLIENT                        │
│  • Framework: React (Single Page Application)               │
│  • Build Tool: Vite                                         │
│  • Styling: Vanilla CSS / CSS Modules (Flexible & Clean)    │
│  • HTTP Client: Fetch API / Axios                           │
│  • State: Modern React Hooks / Context                      │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API / JSON over HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND REST API                        │
│  • Platform: Java                                           │
│  • Framework: Spring Boot                                   │
│  • Security: Spring Security + JWT Authentication           │
│  • ORM / Data Access: Spring Data JPA / Hibernate           │
│  • API Documentation: OpenAPI / Swagger (Planned)           │
└──────────────────────────────┬──────────────────────────────┘
                               │ JDBC / Connection Pool
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     PERSISTENCE LAYER                       │
│  • Engine: Relational Database (PostgreSQL or MySQL)        │
│  • Migrations: Liquibase or Flyway (Planned)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Detailed Component Analysis

### 1. Presentation Tier (Frontend) — PROPOSED / CANDIDATE
- **Candidate Framework (PROPOSED — NOT APPROVED)**: React (Single Page Application).
- **Candidate Tooling (PROPOSED — NOT APPROVED)**: Vite for fast local development and optimized production bundling.
- **Candidate Styling Strategy (PROPOSED — NOT APPROVED)**: Vanilla CSS with modern CSS custom properties (design tokens) and responsive layouts.
- **Candidate Data Visualization (PROPOSED — NOT APPROVED)**: Lightweight SVG or modular charting library for rendering nutrition and habit progress curves.

### 2. Application Tier (Backend) — PROPOSED / CANDIDATE
- **Candidate Platform (PROPOSED — NOT APPROVED)**: Java (LTS version, e.g., Java 17 or 21).
- **Candidate Framework (PROPOSED — NOT APPROVED)**: Spring Boot (providing dependency injection, layered MVC structure, transactional management, and enterprise security).
- **Candidate Security (PROPOSED — NOT APPROVED)**: Stateless JWT-based authentication filter validating bearer tokens on protected endpoints.
- **Candidate Data Persistence (PROPOSED — NOT APPROVED)**: Spring Data JPA repositories abstracting SQL transactions and domain model persistence.

### 3. Data Tier (Database) — PROPOSED / CANDIDATE
- **Database Model**: Relational Database Management System (RDBMS).
- **Candidate Engines Under Evaluation (TODO / UNDECIDED)**:
  - *PostgreSQL*: Superior JSON handling, strict ACID adherence, analytical query capabilities.
  - *MySQL*: Widespread familiarity, robust performance for standard web read/write loads.

---

## 🔮 Future Technology Considerations (Out of Scope for Phase 1)

- **AI/ML Runtime**: Python microservice (e.g., FastAPI with PyTorch/TensorFlow) or specialized inference API if machine learning features are developed in future phases.
- **Caching**: Redis for distributed session caching or high-frequency leaderboard computation.
- **Mobile Native**: React Native or Flutter when expanding beyond responsive web.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Tech Stack]**: Finalize choice of database engine (PostgreSQL vs. MySQL).
- [ ] **TODO: [Tech Stack]**: Finalize build tool for Java backend (Maven vs. Gradle).
- [ ] **TODO: [Tech Stack]**: Select preferred charting library for frontend progress analytics (e.g., lightweight Chart.js wrapper vs. custom SVG components).
- [ ] **TODO: [Tech Stack]**: Choose database migration tool (Flyway vs. Liquibase).
