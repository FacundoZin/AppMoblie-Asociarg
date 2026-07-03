---
name: design-to-screen
description: Convert Figma designs or UI mockups into high-quality React Native screens following the project's architecture and design system.
---

# Design to Screen

## Execution Control (HARD RULE)

This skill MUST NOT execute automatically.

It can ONLY be triggered into implementation mode when the user explicitly requests execution:
- "run design-to-screen"
- "execute design-to-screen"
- or a clear explicit instruction to build the screen

If the input is:
- screenshot
- Figma
- mockup
- wireframe
- UI description

👉 DO NOT generate code  
👉 DO NOT implement anything  
👉 ONLY analyze and request confirmation  

---

## Purpose

Transform a UI design into a production-ready React Native screen.

The output must strictly follow the project's architecture and design system without adding features not present in the input.

---

## Execution Flow (STATE MACHINE)

The skill operates in 3 states:

---

### STATE 1 — ANALYSIS (DEFAULT)

Always start here when any UI input is received.

Responsibilities:

- Understand the screen purpose
- Identify layout structure
- Identify UI components
- Detect reusable components
- Identify navigation elements

❌ Do not generate code  
❌ Do not implement UI  

End with a clear question:

"Do you want me to generate the React Native screen?"

Transition to STATE 2 only after analysis is complete.

---

### STATE 2 — WAITING FOR APPROVAL

In this state:

- Wait for explicit user confirmation
- Do not generate code
- Do not proceed automatically

If the user response is unclear or indirect:
→ remain in STATE 2

Only proceed to STATE 3 if confirmation is explicit.

---

### STATE 3 — IMPLEMENTATION

Only execute when user explicitly confirms.

Responsibilities:

- Generate React Native screen
- Follow design exactly
- Respect spacing, typography, colors, and layout
- Use reusable components when possible
- Avoid adding business logic or backend logic

---

## Strict Rules

Never:

- Execute without explicit confirmation
- Skip analysis phase
- Infer execution intent from UI input alone
- Modify unrelated files
- Add APIs, authentication, or backend logic
- Install dependencies without justification

Always:

- Start with analysis
- Require explicit confirmation before coding
- Keep implementation minimal and clean
- Follow existing project architecture
- Prefer reusable components