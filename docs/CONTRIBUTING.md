# Contributing

## Branching

Work on short-lived branches off `main`:

```bash
git checkout -b feat/<short-description>
```

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Scope | Example |
|------|-------|---------|
| `feat` | new capability | `feat(events): add filter by category` |
| `fix` | bug fix | `fix(build): resolve missing splash asset reference` |
| `refactor` | behavior-preserving change | `refactor(theme): replace hardcoded hex with tokens` |
| `chore` | tooling / housekeeping | `chore(tooling): add eslint flat config` |
| `docs` | documentation | `docs(sdd): add change artifacts` |

Keep each commit a single reviewable work unit. Do not add AI attribution or `Co-Authored-By` trailers.

## Verification Gates

Run both before every commit and PR:

```bash
npm run typecheck   # tsc --noEmit — zero errors
npm run lint        # eslint . --max-warnings 0 — zero warnings
```

## Pull Requests

- One coherent change per PR; prefer small PRs under ~400 changed lines.
- Reference the SDD change (`openspec/changes/<change-name>/`) when applicable.
- Include a short summary of what changed and why.

## SDD Workflow

Spec-driven development artifacts live in `openspec/`:

- `openspec/specs/<domain>/spec.md` — source-of-truth specs
- `openspec/changes/<change-name>/` — active change: proposal, spec, design, tasks, apply-progress, verify-report

Phases: `explore → propose → spec → design → tasks → apply → verify → archive`. Completed changes move to `openspec/changes/archive/` and are never modified.

## Do / Don't

- **Do** use theme tokens, the `Screen` scaffold, and hooks-as-data-access.
- **Don't** add backend/auth/database logic while the project is in the prototype phase.
- **Don't** hardcode hex colors, add dead props/buttons, or nest animation wrappers.
- **Don't** commit directly to `main` for feature work.