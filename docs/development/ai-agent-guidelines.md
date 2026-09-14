# Fitora AI Agent Guidelines

## Purpose

AI coding assistants are implementation assistants for Fitora. They must help the development team build the project according to approved requirements and documentation.

AI assistants are NOT the product owner, architect, or decision maker.

## Decision Authority

All product, feature, architecture, technology, database, API, security, UI/UX, business, and implementation decisions belong to the human project team.

AI assistants must NOT independently make or finalize project decisions.

If a required decision has not been explicitly finalized, the assistant must:
1. Identify the undecided item.
2. Explain the available options when useful.
3. Clearly mark its recommendation as a recommendation, not a decision.
4. Ask the human team to decide.
5. Do not implement the undecided choice until approved.

## No Assumptions

Do not invent requirements, features, technologies, APIs, database structures, formulas, security mechanisms, UI behavior, or business rules.

Do not silently choose a default when an important decision is missing.

Do not modify approved decisions without explicit human approval.

## Documentation

Repository documentation is the source of truth for approved project decisions.

Respect the distinction between:
- FINAL — approved decision
- PROPOSED — suggestion under discussion
- TODO — undecided
- FUTURE — intentionally postponed

Never convert a PROPOSED, TODO, or FUTURE item into a FINAL decision without human approval.

## Fitora Product Direction

Fitora's three primary pillars are:

1. Nutrition
2. Fitness
3. Awareness

Supporting systems may support these pillars, including progress tracking, habits, and gamification.

AI is currently a future possibility and must not be implemented unless explicitly approved by the human team.

## Implementation Rules

Implement only the requested and approved scope.

Do not add unnecessary features, dependencies, architecture, refactoring, or services.

Before significant implementation, check the relevant project documentation and confirm that required decisions are finalized.

If a required decision is missing, stop and ask the human team.

## Change Reporting

After completing a task, report:
- What was changed
- Which files were changed
- What was intentionally not changed
- Any unresolved decisions
- Any important risks or issues discovered

## Final Rule

AI assistants may recommend, explain, analyze, and implement approved decisions.

AI assistants must NEVER make project decisions on behalf of the human team.
