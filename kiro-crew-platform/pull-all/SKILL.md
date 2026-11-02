---
name: pull-all
version: 1.1.0
description: |
  Pull the latest changes for every git repo in a directory (default: cwd), in parallel.
  Use when asked to "pull all the repos", "sync all repos", "update every repo in this
  folder", "get latest on everything", or before starting work across a multi-repo
  workspace. Fast-forward only by default — never rewrites history or discards work.
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
---

## What this does

Scans the *immediate* children of a root directory (plus the root itself if it is a
repo), then for each repo: `fetch --prune --tags`, compare `HEAD` to its upstream, and
fast-forward when it is strictly behind. Repos that need a human decision are reported
and left untouched.

Then it re-indexes: every repo whose `HEAD` actually moved gets a `codegraph sync` so
code intelligence is not answering from a stale index right after a pull.

One command, no per-repo babysitting:

```bash
~/.claude/skills/pull-all/bin/pull-all            # cwd
~/.claude/skills/pull-all/bin/pull-all /path/to/workspace
```

## Procedure

1. **Preview first when the workspace is unfamiliar** — `--dry-run` fetches and reports
   what would move without touching any `HEAD`.
2. **Run it.** Default settings are safe on a workspace you do not fully know.
3. **Report both tables verbatim** to the user — the pull table and the `codegraph`
   section — then act on the non-green rows (below). Do not paraphrase counts; the
   summary lines already have them.
4. **Never** loop over repos with ad-hoc `git pull` calls instead of this script; the
   script is the contract (parallel, uniform statuses, safe skips).

## Options

| flag | effect |
|---|---|
| `--dry-run` | fetch + report only; no `HEAD` moves |
| `--stash` | stash uncommitted **tracked** changes, fast-forward, re-apply |
| `--rebase` | rebase diverged local commits onto upstream (`--autostash`) |
| `--submodules` | `git submodule update --init --recursive` after a pull |
| `-j N` | parallel repos, default 8 |
| `--log N` | new commit subjects shown per pulled repo, default 5, `0` disables |
| `--no-codegraph` | skip the post-pull `codegraph sync` |

## Statuses

| status | meaning | follow-up |
|---|---|---|
| `PULLED` | fast-forwarded (or rebased) | none |
| `OK` | already current — possibly ahead of upstream | mention if ahead; unpushed work |
| `DRY` | `--dry-run`: this many commits pending | rerun without `--dry-run` |
| `SKIP` | needs a decision: uncommitted changes, diverged, detached, or no upstream | see below |
| `FAIL` | fetch, fast-forward, rebase, or stash-pop failed | read the detail; do not retry blindly |

The `codegraph` section below the pull table uses its own statuses:

| status | meaning | follow-up |
|---|---|---|
| `SYNCED` | index re-synced against the newly pulled commits | none |
| `SKIP` | no `.codegraph/` (never auto-initialised), or `codegraph` not on `PATH` | run `codegraph init <dir>` only if the user wants that repo indexed |
| `FAIL` | `sync` errored or timed out; the row carries the reason | read it — a corrupt index usually needs `codegraph init` to rebuild |

## Handling the rows that need a decision

- **uncommitted changes** — offer `--stash` (safe: it re-applies, and on conflict the
  repo is rewound to the clean pulled state with the work preserved in `git stash list`),
  or leave it and let the user commit first. Never `reset --hard` to force a pull.
- **diverged (N ahead / M behind)** — this is unpushed local work. Offer `--rebase`, but
  say what it does; if the branch is shared or the user is unsure, leave it alone.
- **detached HEAD** — report it, do not "fix" it silently. Someone was mid-bisect,
  mid-rebase, or pinned to a tag on purpose.
- **no upstream** — a local-only branch. Report the branch name; suggest
  `git push -u origin <branch>` only if the user wants it tracked.
- **`FAIL` on fetch** — usually auth or network. Surface git's message; if several repos
  fail identically, say so once (likely SSH agent / VPN) rather than repeating it.

## Guarantees

- Fast-forward only unless `--rebase` is passed. No merge commits, no history rewrite.
- Untracked files never block a pull and are never stashed; if git refuses because one
  would be overwritten, that surfaces as `FAIL` with git's own message.
- Exit code `1` if any repo failed, `0` otherwise. `SKIP` is not a failure.
- The re-index never runs on `--dry-run`, never touches a repo that did not move, and
  never creates an index that was not already there.
- A `codegraph sync` failure is reported but does **not** change the exit code. The
  pull is what this script promises; a stale index is not a failed pull.

## Notes

- Depth is one level. Nested repos below a child directory are not visited — point the
  script at that subdirectory instead.
- Worktrees are supported (`.git` file as well as directory).
- The script needs `git` and bash 4.3+ (`wait -n`).
- `codegraph sync` runs only where `.codegraph/` already exists, at the same `-j`
  concurrency, capped at 600s per repo. It is incremental, so it is cheap after a
  normal pull. Pass `--no-codegraph` to skip it entirely.
