---
name: quick-share
version: 1.0.0
description: |
  Deploy any local project directory or a single .html file to Vercel in one shot and
  print the live URL. Use when asked to "deploy this to vercel", "share this html",
  "put this online", "give me a link to this page", "host this demo", "quick share",
  "send this to someone", "publish this folder", or for a "preview URL" — any request
  to turn a local html/static project or a built app (Vite/Next/etc.) into a public
  https URL. NOT for a repo's real CI/CD production deploy pipeline, custom domains,
  or backends that need real env vars/secrets wired up — this is for fast, disposable
  sharing links.
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
---

## What it does

One command turns a local directory or a single `.html` file into a live `https://`
URL on Vercel. Plain static projects go straight over the Vercel REST API (upload +
deploy, no CLI download, finishes in a couple seconds). Projects with a real build
step (Vite, Next, etc.) shell out to `npx vercel` so the framework's own build runs.

## Run it

```bash
~/.claude/skills/quick-share/bin/quick-share <PATH> [--name <slug>]
```

`PATH` defaults to `.`. On success the last line of stdout is exactly `URL: <url>` —
report that line back to the user **verbatim**. Never wrap this script in extra
tooling, never hand-roll a curl/CLI deploy instead of calling it.

## Flags

| flag | effect |
|---|---|
| `--name <slug>` | Vercel project name. Default: sanitized basename of `PATH`. |
| `--preview` | deploy as a preview instead of production (default is production) |
| `--token <tok>` | override the resolved token for this run |
| `--team <id\|slug>` | Vercel team/scope id, appended as `?teamId=` |
| `--force-static` | skip detection, always use the REST static path |
| `--force-build` | skip detection, always use the `npx vercel` build path |
| `--json` | emit one JSON object on stdout instead of human text |
| `--open` | after success, best-effort `xdg-open` the URL |
| `-h`, `--help` | usage text |

## Exit codes

| code | meaning | agent action |
|---|---|---|
| 0 | deployed | report the `URL:` line |
| 1 | deployment failed / build error | surface stderr to the user; do not retry blindly more than once |
| 2 | bad usage (args) | fix the invocation, re-run |
| 3 | auth/token problem (missing or rejected) | tell the user to set `VERCEL_TOKEN` or refresh `~/.quick-share/token` |
| 4 | nothing to deploy (empty file set) | check `PATH` — likely wrong dir or everything got ignored |
| 5 | timed out waiting for `READY` | deployment may still finish server-side; give the inspector URL from `--json` output if you have it, tell the user to check the Vercel dashboard |

## Auth

Token resolution order: `--token` > `$VERCEL_TOKEN` > `~/.quick-share/token` (mode
600). A token is **already installed** at `~/.quick-share/token` on this machine —
that file is the only place the secret lives. Never echo the token into a transcript,
commit it, or paste it into code. Rotate it with:

```bash
printf '%s' '<new-token>' > ~/.quick-share/token && chmod 600 ~/.quick-share/token
```

## How it picks a mode

`build` mode if `PATH` has a root `package.json` **and** either its `scripts.build`
exists or its dependencies/devDependencies include any of: `next`, `nuxt`, `astro`,
`vite`, `@remix-run/dev`, `@sveltejs/kit`, `gatsby`, `react-scripts`, `@angular/cli`,
`parcel`, `expo`. Otherwise `static`. Override either way with `--force-static` /
`--force-build` if detection guesses wrong.

## Recipes

Single report/artifact file:

```bash
~/.claude/skills/quick-share/bin/quick-share report.html --name my-report
```

Plain static folder:

```bash
~/.claude/skills/quick-share/bin/quick-share ./dist --name landing-demo
```

Vite/Next app (build mode, auto-detected):

```bash
~/.claude/skills/quick-share/bin/quick-share ./my-app
```

Preview link instead of production:

```bash
~/.claude/skills/quick-share/bin/quick-share ./dist --name landing-demo --preview
```

Re-deploy to the same project to keep a stable URL (same `--name` overwrites the prior
production deployment at that project's URL):

```bash
~/.claude/skills/quick-share/bin/quick-share ./dist --name landing-demo
```

Scripted/JSON use:

```bash
url=$(~/.claude/skills/quick-share/bin/quick-share ./dist --json | jq -r .url)
```

## Behavior notes

- Skips `.git`, `node_modules`, `.vercel`, `.next`, `.cache`, `.turbo`, `__pycache__`,
  `.venv`, `.idea`, `.svelte-kit`, `.DS_Store`, `Thumbs.db`, `*.log`, `.env`, `.env.*`,
  plus anything listed in a `.vercelignore` at `PATH` root.
- 100 MiB cap total and per-file; over the cap the script aborts (exit 1) and names the
  offending file.
- A single `.html`/`.htm` file passed as `PATH` deploys as `index.html`. If the final
  file set has no root `index.html` but exactly one `*.html` anywhere, that file is
  also registered as root `index.html` (aliased, not re-uploaded).
- **Links are public.** Vercel enables Deployment Protection on every newly created
  project, which would 302 anyone who isn't logged into the account over to an SSO
  wall. quick-share turns it off for the project it deploys to, so the URL it prints
  is openable by anyone. Corollary: treat every deploy as publishing to the open
  internet.
- URL shape: production returns the stable `https://<slug>.vercel.app` alias (same
  `--name` -> same URL, forever). `--preview` returns a one-off
  `https://<slug>-<hash>-<owner>.vercel.app` that stays pinned to that exact build.
- Reusing `--name` overwrites the previous production deployment tied to that project
  name/URL; use a new `--name` (or `--preview`) to avoid clobbering a live share link.

## Guardrails

- Never invent or guess a URL — only report a URL the command actually printed.
- On failure, report the exit code and the captured stderr; do not silently retry more
  than once.
- Before deploying, check the target for `.env` files with real secrets or anything
  that looks like private/proprietary source the user did not intend to publish
  (deployments are public). Ask first if anything like that is present.

See `reference.md` for the REST API sequence, retry/backoff behavior, and
troubleshooting.
