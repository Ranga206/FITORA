# Supporting System: Gamification & Leagues

This document outlines the design, economy, progression curves, and rules of the **Gamification** and **League** systems in **Fitora**.

---

## 🏆 Core Philosophy: Positive Consistency

Fitora’s gamification system is designed with a strict ethical foundation:

> **Gamification encourages healthy, balanced daily consistency. It must never reward extreme dieting, excessive caloric restriction, or dangerous overtraining.**

Points and rankings are driven by positive health behaviors: logging nutritious meals, showing up for scheduled workouts, learning via awareness lessons, and maintaining daily habits.

---

## 🔄 The Gamification Progression Hierarchy

```text
       Daily Actions
             ↓
            XP
             ↓
           Level
             ↓
        Achievements
             ↓
         Challenges
             ↓
      Competitive League
```

---

## ⚡ XP (Experience Points) Economy

> **NOTICE: EXAMPLE ONLY — NOT A FITORA RULE**  
> All numerical values, XP award amounts, formulas, challenge durations, and league cohort sizes in this document are non-binding illustrative examples. The human project team has NOT finalized any gamification numbers or rules. All gamification values remain **TODO / UNDECIDED**.

XP represents the unit of effort and engagement across all Fitora activities:

| Action Category | Specific Action | Illustrative XP Award (EXAMPLE ONLY — NOT A FITORA RULE) |
| :--- | :--- | :--- |
| **Nutrition** | Log a single meal (Breakfast, Lunch, Dinner, Snack) | +15 XP (Example Only) |
| **Nutrition** | Log all 3 main meals in a single calendar day | +30 Bonus XP (Example Only) |
| **Fitness** | Complete and log a workout session | +50 XP (Example Only) |
| **Fitness** | Hit personal exercise volume milestone | +25 Bonus XP (Example Only) |
| **Awareness** | Read and complete an educational lesson | +20 XP (Example Only) |
| **Awareness** | Read 3 lessons in a single week | +30 Bonus XP (Example Only) |
| **Habits** | Check off a scheduled daily habit | +10 XP (Example Only) |
| **Habits** | Complete 100% of daily scheduled habits | +25 Bonus XP (Example Only) |
| **Streaks** | Maintain 7-day master streak | +50 Bonus XP (Example Only) |
| **Streaks** | Maintain 30-day master streak | +200 Bonus XP (Example Only) |

---

## 📈 Levels & Level Progression

User levels reflect cumulative, all-time effort. Level progression follows an escalating curve to maintain challenge:

$$\text{XP Required for Level } n = \text{Base} \times n^{1.5} \quad \text{(EXAMPLE ONLY — NOT A FITORA RULE)}$$

- Users never lose levels or experience points once earned.
- Leveling up triggers visual celebration animations and unlocks cosmetic profile badges.

---

## 🔥 Daily Streaks

- **Master Streak**: Incremented every calendar day the user logs at least one core action (meal, workout, lesson, or habit).
- **Streak Protection**: Users can earn or unlock "Streak Freezes" to protect their streak during illness, holidays, or rest days.

---

## 🎖️ Achievements & Badges

Achievements celebrate key behavioral milestones:

- **First Step**: Log your first meal and workout.
- **Hydration Master**: Complete the hydration habit 14 days in a row.
- **Iron Consistency**: Complete 12 workouts in a single calendar month.
- **The Scholar**: Read 15 awareness lessons.
- **Century Club**: Reach a 100-day master streak.

---

## ⚔️ Challenges

Time-limited personal and community events that encourage team spirit and focused effort:
- **Duration**: Typically 7-day, 14-day, or 30-day challenges.
- **Examples**:
  - *"Spring Awakening"*: Complete 16 workouts and read 8 awareness lessons in 30 days.
  - *"Hydration Sprint"*: Hit hydration goals 7 days straight.
- **Rewards**: Exclusive limited-time badges and bonus league XP.

---

## 🛡️ Competitive Leagues

Users are partitioned into weekly competitive cohorts to add friendly motivation:

```text
┌──────────────────────────────────────────────┐
│           LEAGUE TIERS (CONCEPTUAL)          │
│                                              │
│               [ Diamond Tier ]               │
│               [ Platinum Tier ]              │
│                 [ Gold Tier ]                │
│                [ Silver Tier ]               │
│                [ Bronze Tier ]               │
└──────────────────────────────────────────────┘
```

### League Mechanics (EXAMPLE ONLY — NOT A FITORA RULE):
1. **Cohort Size**: 25 to 30 active users (Example Only).
2. **Scoring Metric**: Weekly consistency XP earned during the active 7-day window (Example Only).
3. **Promotion & Demotion Zone**:
   - Top 20% of cohort: Promoted to next tier (Example Only).
   - Middle 60%: Retain current tier (Example Only).
   - Bottom 20%: Demoted to previous tier (Example Only).
4. **End of Week**: Sunday 23:59 UTC, standings finalize, rewards/badges are distributed, and cohorts reset for the new week.

---

## 📝 Planned Decisions / TODOs

- [ ] **TODO: [Game Balance]**: Finalize exact numerical coefficient for the level progression formula ($\text{Base}$ XP multiplier).
- [ ] **TODO: [League Decision]**: Finalize tier naming scheme (e.g., Bronze, Silver, Gold, Platinum, Diamond, Champion).
- [ ] **TODO: [League Decision]**: Determine whether new users enter an unranked "Rookie" placement pool before entering Bronze League.
- [ ] **TODO: [Anti-Cheat Decision]**: Define daily maximum XP cap to prevent users from artificially spamming habit checkboxes or rapid meal logs.
