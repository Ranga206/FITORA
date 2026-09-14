# Security Architecture: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> The authentication mechanisms (e.g., JWT vs. session tokens), authorization models, and validation patterns described below represent candidate proposals only. Final security architecture decisions remain **TODO / UNDECIDED**.

This document defines the security model, authentication strategy, data privacy protocols, and protection mechanisms for **Fitora**.

---

## 🛡️ Core Security Principles

1. **Defense in Depth**: Security controls are applied at multiple layers (network, gateway/controller, service, database).
2. **Principle of Least Privilege**: Users and system processes are granted only the minimum permissions required to perform their functions.
3. **Data Privacy First**: Biometric and wellness metrics are treated as sensitive personal data, isolated per authenticated user tenant.
4. **Zero Trust API Design**: Every non-public API endpoint strictly verifies identity, token validity, and resource ownership before executing business logic.

---

## 🔐 Authentication & Session Management

```text
┌──────────────┐                  ┌────────────────────────┐                  ┌──────────────┐
│ Client (Web) │                  │ Backend Security Layer │                  │   Database   │
└──────┬───────┘                  └───────────┬────────────┘                  └──────┬───────┘
       │                                      │                                      │
       │  1. POST /api/v1/auth/login          │                                      │
       │     {email, password}                │                                      │
       ├─────────────────────────────────────►│  2. Fetch hashed user credentials    │
       │                                      ├─────────────────────────────────────►│
       │                                      │◄─────────────────────────────────────┤
       │                                      │  3. Verify hash (BCrypt/Argon2)      │
       │                                      │  4. Generate JWT Access Token        │
       │  5. Return JWT + User Profile        │                                      │
       │◄─────────────────────────────────────┤                                      │
       │                                      │                                      │
       │  6. GET /api/v1/nutrition/today      │                                      │
       │     Header: Authorization: Bearer    │                                      │
       ├─────────────────────────────────────►│  7. Validate Token & Claims          │
       │                                      │  8. Extract User ID & Context        │
       │                                      │  9. Execute Query for User ID Only   │
       │                                      ├─────────────────────────────────────►│
       │                                      │◄─────────────────────────────────────┤
       │  10. Return User Data                │                                      │
       │◄─────────────────────────────────────┤                                      │
```

- **Stateless Tokens**: The backend issues a digitally signed JSON Web Token (JWT) containing user ID, role, and expiration timestamp.
- **Header Standard**: Clients transmit the token in the `Authorization: Bearer <token>` HTTP header.
- **Expiration Policy**: Access tokens will maintain a short expiration window (e.g., 24 hours), with planned refresh token rotation.

---

## 👥 Authorization & Role-Based Access Control (RBAC)

The initial system defines two primary roles:

| Role | Scope & Permissions |
| :--- | :--- |
| **`ROLE_USER`** | Can view and mutate their own profile, meals, workouts, habits, awareness completion, and view their league standings. Cannot access other users' private metrics. |
| **`ROLE_ADMIN`** | Can manage global exercise catalog, publish awareness lessons, configure league parameters, and review system health. |

### Resource Ownership Verification
All domain service methods verify that the entity being updated or retrieved belongs to the currently authenticated user (`entity.userId == authenticatedUserId`).

---

## 🔒 Sensitive Data Protection

1. **Password Storage**:
   - Passwords must be hashed using a salted cryptographic algorithm (e.g., BCrypt with work factor >= 12 or Argon2id). Plaintext passwords are never stored or logged.
2. **Transport Security**:
   - All client-server communication must occur over TLS/HTTPS in staging and production.
3. **Health Data Sensitivity**:
   - Height, weight, age, and nutritional logs are treated as private biometric metrics. They are never exposed to other users in public league rankings (leagues show only username/avatar and weekly consistency XP).
4. **Medical Disclaimer**:
   - Educational health metrics (such as BMI calculations) are explicitly labeled as informational screening metrics, never as medical diagnoses.

---

## 🌐 API Security & Defense Controls

- **CORS (Cross-Origin Resource Sharing)**: Restrict API access strictly to trusted frontend origins configured via environment variables (`CORS_ALLOWED_ORIGINS`).
- **Input Validation**: Use strong DTO validation (e.g., Jakarta Validation in Spring Boot: `@NotNull`, `@Min`, `@Max`, `@Size`, `@Email`) before data touches the business layer.
- **SQL Injection Prevention**: Utilize parameterized queries via JPA/Hibernate; raw unescaped SQL string concatenation is strictly prohibited.
- **Rate Limiting (Planned)**: Throttle authentication endpoints (`/auth/login`, `/auth/register`) to mitigate brute-force credential attacks.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Security]**: Finalize whether refresh tokens will be stored in secure HTTP-only cookies or transmitted in request payloads.
- [ ] **TODO: [Security]**: Determine rate limiting mechanism (e.g., Bucket4j in Spring Boot or reverse proxy rate limiting like Nginx/Cloudflare).
- [ ] **TODO: [Security]**: Finalize data retention and user account deletion policies (GDPR/CCPA compliance).
