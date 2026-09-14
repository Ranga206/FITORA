# Project Objectives: Fitora

This document outlines the core objectives, success metrics, and design targets for **Fitora**.

---

## 🎯 Primary Product Objectives

1. **Unified Wellness Experience**:
   - Provide a frictionless single platform that addresses Nutrition, Fitness, and Awareness without requiring third-party companion apps.
2. **Actionable Awareness & Education**:
   - Deliver high-yield, bite-sized wellness concepts that empower users to understand the physiological and behavioral reasons behind their health habits.
3. **Sustainable Habit Formation**:
   - Achieve higher 30-day and 90-day user retention compared to industry averages by combining intuitive tracking with encouraging, non-punitive gamification.
4. **Accessible, Responsible Guidance**:
   - Offer responsible baseline health context (such as BMI screening context and standard caloric equations) while explicitly disclaiming medical diagnosis.

---

## 📊 Key Results & Success Metrics (KPIs)

| Metric Area | Target Metric | Description |
| :--- | :--- | :--- |
| **Consistency** | 70%+ Weekly Logging Rate | Percentage of active users who log at least one meal, workout, or habit 5 days a week. |
| **Awareness Engagement** | 3+ Lessons Read / Week | Average educational articles read per active user weekly. |
| **Streak Retention** | 40%+ 30-Day Streak Retention | Users who maintain or recover a daily active streak over a 30-day window. |
| **League Participation** | 60%+ League Engagement | Active users who check their weekly league standings and strive for promotion. |

---

## 💻 Technical Objectives

1. **Decoupled, Maintainable Architecture**:
   - Separate client presentation completely from backend REST API services and database persistence to support rapid evolution.
2. **Sub-200ms Core API Latency**:
   - Ensure primary endpoints (dashboard load, meal log, workout log, habit check) respond in under 200 milliseconds under standard load.
3. **Responsive, Accessible Interface**:
   - Maintain WCAG 2.1 AA accessibility standards, responsive desktop and mobile web layouts, and smooth micro-interactions.
4. **Data Integrity & Security**:
   - Protect user profiles and health metrics with secure credential storage, strict authorization, and sanitized inputs.

---

## 🚫 Non-Objectives for Initial Phase

- **AI-Powered Diagnostics**: Fitora does not provide medical diagnoses, predictive illness modeling, or automated machine-learning meal planners in Phase 1.
- **Wearable Device SDK Integrations**: Phase 1 will not build custom hardware drivers or Bluetooth device sync.
- **Public Social Networking**: No open comments, messaging feeds, or unmoderated public user walls in early phases.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Product]**: Define explicit target benchmarks for Day-1, Day-7, Day-30 retention rates.
- [ ] **TODO: [Engineering]**: Define baseline automated load-testing targets before release.
