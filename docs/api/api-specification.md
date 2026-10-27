# API Specification: Fitora

> **GOVERNANCE NOTICE: PROPOSED / CANDIDATE — NOT APPROVED**  
> The RESTful API endpoints, request/response envelopes, and status codes described below represent candidate proposals only. Final API specifications remain **TODO / UNDECIDED**.

This document defines the REST API architectural standards, data serialization envelopes, error schemas, and endpoint specifications for **Fitora**.

---

## 🌐 API Conventions & Protocol

- **Protocol**: HTTPS (TLS 1.2+)
- **Base URI**: `/api/v1`
- **Data Format**: `application/json` for both request and response payloads.
- **Authentication**: Bearer token passed in the `Authorization` header:
  ```http
  Authorization: Bearer <jwt_access_token>
  ```
- **Date/Time Standard**: ISO 8601 UTC strings (e.g., `2026-09-14T12:00:00Z`).

---

## 📦 Standard Response Envelope

All API responses follow a consistent JSON envelope to ensure uniform client-side handling:

### Successful Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Resource retrieved successfully",
  "timestamp": "2026-09-14T12:00:00Z"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Validation failed for one or more fields",
    "details": [
      {
        "field": "currentWeightKg",
        "issue": "Weight must be greater than 0"
      }
    ]
  },
  "timestamp": "2026-09-14T12:00:00Z"
}
```

---

## 🚦 HTTP Status Codes

- `200 OK`: Request succeeded, returning payload.
- `201 Created`: Resource successfully created.
- `204 No Content`: Action executed successfully, no response body returned.
- `400 Bad Request`: Malformed syntax or invalid request format.
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: Authenticated user lacks permission to access resource.
- `404 Not Found`: Resource does not exist.
- `422 Unprocessable Entity`: Request body failed domain validation rules.
- `500 Internal Server Error`: Unhandled server exception.

---

## 📋 Planned Endpoint Catalog

### 1. Authentication & Session (`/api/v1/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user account |
| `POST` | `/auth/login` | Authenticate user credentials and return JWT |
| `POST` | `/auth/refresh` | Refresh an expiring access token |
| `POST` | `/auth/logout` | Invalidate current session/token |

### 2. User Profile (`/api/v1/profile`)
> **Approved Direction**: The existing Profile API (`/api/v1/profile`) is operational and **must remain unchanged**.
> It provides `GET`, `POST`, and `PATCH` for core user biometrics (`age`, `height`, `weight`, `sex`).

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/profile` | Retrieve existing user biometrics profile | Operational |
| `POST` | `/api/v1/profile` | Create initial user biometrics profile | Operational |
| `PATCH` | `/api/v1/profile` | Partially update user biometrics profile | Operational |

### 3. Pillar 1: Nutrition (`/api/v1/nutrition`)
> **Approved Direction**: Nutrition logging is the first implementation milestone.
> - Audience: Adults and teenagers.
> - Meal slots: 4 standard slots (**Breakfast, Lunch, Dinner, Snacks**).
> - Tracked metrics: **Calories, Protein, Carbohydrates, Fats** from logged foods.
> - All energy requirements are explicitly identified as **estimates**.
> - Energy estimation must use age-appropriate approaches; review applicability to Indian users before finalizing equations.
> - Final equations, undisclosed sex handling, activity tiers, and personalized calorie targets remain **TODO / UNDECIDED**.
> - AI meal recognition and unapproved gamification remain **out of scope**.
> - Every food item has an explicit `nutrition_reference_basis` (`per_100g`, `per_100ml`, or `per_serving`).

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/nutrition/today` | None | Fetch today's logged meals and estimated energy budget |
| `GET` | `/nutrition/foods` | `q` (string, optional)<br>`category` (string, optional)<br>`limit` (int, default 20, max 100)<br>`offset` (int, default 0) | Search foods catalog with deterministic sorting (`LOWER(name) ASC, id ASC`) |
| `GET` | `/nutrition/foods/{id}` | Path: `id` (UUID) | Retrieve single food item details by UUID |
| `POST` | `/nutrition/meals` | None (Request Body) | Log a meal item into one of the 4 slots (Breakfast, Lunch, Dinner, Snack) |
| `PUT` | `/nutrition/meals/{id}` | Path: `id` (UUID) | Update logged meal or items |
| `DELETE` | `/nutrition/meals/{id}` | Path: `id` (UUID) | Remove a logged meal |

### 4. Pillar 2: Fitness (`/api/v1/fitness`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/fitness/exercises` | List exercises with category/muscle filter |
| `GET` | `/fitness/exercises/{id}` | Get exercise details and execution cues |
| `POST` | `/fitness/workouts` | Save a completed workout session |
| `GET` | `/fitness/workouts/history` | Get chronological workout history |
| `GET` | `/fitness/workouts/{id}` | Get specific workout details and set logs |

### 5. Pillar 3: Awareness (`/api/v1/awareness`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/awareness/lessons` | List available lessons with completion status |
| `GET` | `/awareness/lessons/{id}` | Fetch full lesson content and takeaways |
| `POST` | `/awareness/lessons/{id}/complete` | Mark lesson read and claim XP |

### 6. Supporting System: Habits (`/api/v1/habits`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/habits/today` | Get today's scheduled habits and completion status |
| `POST` | `/habits` | Create a custom habit |
| `POST` | `/habits/{id}/toggle` | Check or uncheck a habit for today |
| `PUT` | `/habits/{id}` | Edit habit title or frequency |
| `DELETE` | `/habits/{id}` | Archive or delete a habit |

### 7. Supporting System: Progress (`/api/v1/progress`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/progress/summary` | Get aggregated dashboard metrics |
| `GET` | `/progress/nutrition?range={range}` | Get calorie/macro trend data |
| `GET` | `/progress/fitness?range={range}` | Get workout volume and consistency trends |
| `GET` | `/progress/habits?range={range}` | Get habit completion rates and streak heatmap |

### 8. Supporting System: Gamification & Leagues (`/api/v1/gamification`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/gamification/status` | Get user level, current XP, streaks, freezes |
| `GET` | `/gamification/achievements` | List unlocked and locked badges |
| `GET` | `/leagues/active` | Get current weekly league standings and rank |
| `GET` | `/challenges` | List active personal and community challenges |

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [API Decision]**: Finalize pagination standard for history endpoints (Page/Size query params vs. Cursor-based tokens).
- [ ] **TODO: [API Decision]**: Define rate-limiting thresholds (e.g., 60 requests/minute for general API, 5 requests/minute for login).
- [ ] **TODO: [API Decision]**: Determine whether batch-logging meals (multiple food items in one payload) requires a dedicated bulk endpoint.
