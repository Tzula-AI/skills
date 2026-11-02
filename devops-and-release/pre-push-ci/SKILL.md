---
name: pre-push-ci
description: "Verify CI will pass BEFORE pushing. Use when pushing to git, opening a PR, or merging. Reads the project's CI config, runs the equivalent steps locally (lint, typecheck, test, build), and blocks the push if anything fails."
---

# Pre-Push CI Verification

Pushing without verifying CI is how broken code lands on main. CI takes
5-20 minutes to run on GitHub; running the same checks locally takes
seconds and catches failures before they waste a CI run, block a merge,
or deploy broken code.

## When to Activate

Activate this skill when:
- You are about to run `git push`
- You are preparing a PR
- You are merging or promoting between branches
- The user says "push", "ship", "deploy", "merge", or "promote"

**Do NOT push until this skill's checks pass.**

## Procedure

### Step 1 — Detect the project's CI pipeline

Read `.github/workflows/ci.yml` (or `.github/workflows/*.yml`) to see
exactly what CI runs. Map each CI step to its local equivalent:

| CI step | Local equivalent |
|---------|-----------------|
| `npm run format:check` | `npm run format:check` |
| `npm run typecheck` | `npm run typecheck` |
| `npm test` / `npm run test` | `npm test` |
| `npm run build` | `npm run build` |
| `npm run lint` | `npm run lint` |
| `pytest` / `python -m pytest` | `pytest` |
| `cargo test` | `cargo test` |
| `go test ./...` | `go test ./...` |

If no `.github/workflows/` exists, infer from `package.json` scripts or
the project's build system. Run at minimum: **lint, typecheck, test,
build** (whichever exist).

### Step 2 — Run checks via the pre-push script

Run the companion script, which auto-detects the project type and runs
the right checks:

```
bash ~/.omp/scripts/pre-push-ci.sh
```

This script:
1. Detects project type (Node/Python/Rust/Go)
2. Reads `.github/workflows/ci.yml` for the exact CI steps
3. Runs each step locally, stopping on first failure
4. On all-pass: creates a sentinel file (`.pre-push-verified`) valid
   for 5 minutes, then exits 0
5. On any failure: prints the failing step + output, exits non-zero

### Step 3 — Push only if checks pass

If the script exits 0 → push immediately (the pre-push-guard hook will
see the sentinel and allow it).

If the script exits non-zero → **fix the failure before pushing.** Do
NOT push with `--no-verify` or `--force` to bypass checks. Do NOT skip
steps. Fix the actual issue, re-run the script, then push.

### Step 4 — After push (optional)

If the project has a `gh` CLI and CI is running, you MAY check CI
status after pushing:

```
gh run list --limit 3
gh run watch <run-id>
```

This is optional — if local checks passed, CI should pass too (unless
CI has environment-specific steps like deployment that can't run locally).

## What to Check For

Beyond "did the command exit 0," look for:

- **New TypeScript errors** — `tsc --noEmit` catches type drift that
  runtime tests miss
- **Lint regressions** — `format:check` catches unused imports, missing
  deps, style violations
- **Skipped tests** — vitest may pass with 0 tests run if the test
  files moved; check the test count in output
- **Build artifact issues** — vite build may succeed but produce broken
  bundles; check for warnings about missing modules

## Project-Specific Notes

### Other projects
Read the project's own `ci.yml`. If none exists, run whatever
`package.json` / `Makefile` / `Cargo.toml` defines as test+build.

## Anti-Patterns

- ❌ Pushing then checking CI after (wastes a CI run, blocks merge queue)
- ❌ `git push --no-verify` to skip hooks
- ❌ Running only `npm test` but skipping `npm run build` (build catches
  things tests don't)
- ❌ Assuming "it worked on my machine" — CI runs on a clean Ubuntu
  container, your machine has cached state
- ❌ Pushing with known failures to "see what CI says"
