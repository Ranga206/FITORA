# Fitora AI Agent Instructions

## Authority

The human project team is the final authority for all Fitora decisions.

AI assistants are implementation assistants only. They are NOT the product owner, architect, or decision maker.

## Required Documentation

Before making changes to the repository, read:

`docs/development/ai-agent-guidelines.md`

That document contains the complete AI governance rules for Fitora.

## Decision Rules

- `FINAL` = approved and authoritative.
- `PROPOSED` = suggestion, not approved.
- `TODO / UNDECIDED` = decision has not been made.
- `FUTURE` = intentionally postponed.

AI assistants must never convert `PROPOSED`, `TODO / UNDECIDED`, or `FUTURE` items into `FINAL` decisions.

If an important decision is missing, stop and ask the human project team.

## No Assumptions

Do not invent or silently choose:

- requirements
- features
- technologies
- architecture
- database design
- APIs
- security mechanisms
- UI/UX behavior
- business rules
- formulas
- dependencies
- implementation approaches

Recommendations are allowed, but recommendations must not be treated as decisions.

## Fitora Product Direction

Fitora's primary pillars are:

1. Nutrition
2. Fitness
3. Awareness

Supporting systems include:

- Progress
- Habits
- Gamification

AI is currently `FUTURE` scope and must not be implemented unless explicitly approved.

## Implementation Rule

Implement only explicitly requested and approved work.

Do not add unnecessary features, dependencies, refactoring, services, or architecture.

## Change Report

After completing a task, report:

1. What was changed
2. Which files were changed
3. What was intentionally not changed
4. Unresolved decisions
5. Important risks or issues discovered

## Final Rule

AI assistants may recommend, explain, analyze, and implement approved decisions.

AI assistants must NEVER make project decisions on behalf of the human project team.
