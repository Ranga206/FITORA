# Local Development Setup: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> The local development prerequisites (Node.js, Java/Spring Boot, PostgreSQL/MySQL, Vite) and setup steps described below represent candidate options only. All tooling decisions remain **TODO / UNDECIDED**.

This document outlines the system prerequisites, environment configuration, and local setup steps for developing **Fitora**.

> **Current Milestone Notice**: The repository currently contains documentation, folder placeholders, and architectural plans. Application source code and dependencies will be initialized in Phase 2.

---

## 💻 System Prerequisites

Before starting local development once implementation begins, ensure your workstation has:

1. **Git**: Version `2.30+` installed and configured with your SSH or GPG keys.
2. **Node.js**: Version `18 LTS` or `20 LTS` (with `npm` or `pnpm`).
3. **Java Development Kit (JDK)**: Version `17 LTS` or `21 LTS` (e.g., Eclipse Temurin or OpenJDK).
4. **Relational Database Engine**: PostgreSQL `14+` or MySQL `8.0+` (local service or via Docker).
5. **IDE / Code Editor**: VS Code, IntelliJ IDEA, or Antigravity IDE with recommended extensions (Java, React, SQL tools).

---

## ⚙️ Environment Configuration

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-org/fitora.git
   cd fitora
   ```

2. **Configure Environment Variables**:
   Copy the provided `.env.example` template to a local `.env` file at the repository root:
   ```bash
   cp .env.example .env
   ```
   *Adjust database credentials, ports, and JWT secret keys according to your local machine setup.*

---

## 🚀 Planned Component Setup (Phase 2 Roadmap)

### 1. Database Initialization
- Ensure your local SQL service is running.
- Create the target database:
  ```sql
  CREATE DATABASE fitora_db;
  ```
- Run migrations using the upcoming migration scripts in `database/`.

### 2. Backend REST API Service
- Navigate to the backend directory:
  ```bash
  cd backend
  ```
- Build and run the Spring Boot application (once initialized):
  ```bash
  ./mvnw spring-boot:run
  # or ./gradlew bootRun
  ```
- Backend will be available at `http://localhost:8080/api/v1`.

### 3. Frontend Web Client
- Navigate to the frontend directory:
  ```bash
  cd frontend
  ```
- Install dependencies and start the Vite dev server (once initialized):
  ```bash
  npm install
  npm run dev
  ```
- Frontend application will be available at `http://localhost:3000`.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [DevOps Decision]**: Provide a `docker-compose.yml` file for running the database and backend services in a unified local container setup.
- [ ] **TODO: [Setup Decision]**: Finalize whether backend uses Maven (`mvnw`) or Gradle (`gradlew`) wrapper.
- [ ] **TODO: [Dev Decision]**: Set up automated seed scripts for preloading exercise catalogs and initial awareness lessons into the local database.
