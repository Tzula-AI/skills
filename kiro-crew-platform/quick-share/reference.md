# quick-share reference

Implementation details and troubleshooting for `bin/quick-share`. SKILL.md is the
contract agents should read first; this file is for debugging failures.

## Static path (REST) sequence

1. Walk `PATH`, applying the skip rules from SKILL.md's Behavior notes.
2. Hash each kept file with sha1 over its raw bytes; de-dupe by hash.
3. For each unique sha1: `POST https://api.vercel.com/v2/files` with
   `Authorization: Bearer <token>`, `Content-Length`, `x-vercel-digest: <sha1>`, body =
   raw bytes. Up to 8 uploads in flight at once.
4. `POST https://api.vercel.com/v13/deployments?skipAutoDetectionConfirmation=1` with
   `{"name": <slug>, "files": [{"file": <posix relpath>, "sha": <sha1>, "size": <bytes>}],
   "target": "production", "projectSettings": {"framework": null}}` — `target` is
   omitted entirely for `--preview`.
5. Poll `GET https://api.vercel.com/v13/deployments/<id>` every 1.5s until
   `readyState`/`status` is `READY` (done), `ERROR`/`CANCELED` (exit 1, message from the
   API surfaced), or 300s elapse (exit 5).
6. Pick the URL. For `--preview`, that is `https://` + the deployment's `url`. For a
   production deploy the stable project alias is preferred, so polling continues past
   `READY` for up to 20s until `aliasAssigned` is set and `alias` is non-empty, then:
   exact `<slug>.vercel.app` > shortest `*.vercel.app` alias > shortest alias > raw
   `url`. If the alias never lands, it falls back to `url` and warns on stderr — it
   never fails for this.

Before the deployment is created, `ensureProjectPublic()` POSTs
`https://api.vercel.com/v11/projects` (HTTP 409 / `conflict` means it already exists,
which is fine) and then PATCHes `https://api.vercel.com/v9/projects/<name>` with
`{"ssoProtection": null, "passwordProtection": null}`. Vercel turns on Deployment
Protection (`ssoProtection.deploymentType: "all_except_custom_domains"`) for every
newly created project, which makes per-deployment hostnames — i.e. every `--preview`
URL — 302-redirect to `vercel.com/sso-api` for anyone who isn't logged into the
account. Disabling it is what makes a shared link openable. The PATCH is best-effort:
if it fails the deploy still completes, with a stderr warning that the link may
require Vercel auth.

## Build path (CLI) sequence

Same `ensureProjectPublic()` step first — required here because the CLI's `--project`
flag only *targets* an existing project (it 404s otherwise); unlike the removed
`--name` flag it will not create one.

Then spawns `npx --yes vercel@latest deploy --cwd <abs PATH> --project <slug> --token
<tok> --yes`, plus `--prod` (production) and `--scope <team>` (if `--team` /
`$VERCEL_TEAM_ID` is set). Both stdout and stderr are piped; stderr is forwarded live
to our stderr so build output still streams, and both streams are buffered for URL
scraping — this CLI writes its `Inspect` / `Production` / `Aliased` lines to **stderr**
in non-interactive mode, so capturing stdout alone finds nothing useful.

URL precedence from the combined output, each candidate stripped of trailing
`.,"'`)]` punctuation: the URL on an `Aliased` line > `https://<slug>.vercel.app` if it
appears anywhere (production only) > the URL on the last `Production` line > the last
URL that is not an inspector link (`https://vercel.com/...` is never returned as the
deploy URL). Non-zero child exit is exit 1.

## Edge-readiness probe

Both paths end with a bounded GET loop against the chosen URL (700ms cadence, 10s
cap, `redirect: manual`, any status < 400 counts as serving). Vercel assigns the alias
a beat before every edge node serves it, so a URL printed the instant a deployment
goes `READY` can 404 for about a second. If the cap elapses the URL is still printed,
with a stderr warning — the probe never changes the exit code.

## HTTP retry behavior

Every REST call (upload, deployment create, poll) retries on network error, `429`, or
`5xx` up to 3 attempts with `500ms * 2^n` backoff. `401` always exits 3 immediately
with `token rejected by Vercel (401)`. `403` exits 3 with the API's own error message
(often a scope/team mismatch).

## Team/scope

`--team <id|slug>` (or `$VERCEL_TEAM_ID`) appends `?teamId=<team>` (or `&teamId=` if
the URL already has a query string) to every API call, and becomes `--scope` in the
CLI path. The seeded token on this machine is personal-scope (no team) — omit `--team`
unless the user has explicitly given a team id/slug.

## Troubleshooting

| symptom | likely cause | fix |
|---|---|---|
| exit 3, "no Vercel token" | `~/.quick-share/token` missing/unreadable and no `--token`/`$VERCEL_TOKEN` | rotate/create the token file per SKILL.md Auth section |
| exit 3, `401` | token expired or revoked | rotate the token (Auth section), re-run |
| exit 3, `403` with a team-related message | token doesn't have access to the given `--team` | drop `--team` or confirm the correct scope with the user |
| exit 4 | every file in `PATH` got skipped, or `PATH` is empty | check for an overzealous `.vercelignore`, or that `PATH` isn't `.git`/`node_modules` itself |
| exit 1, "file too large" | a single file over 100 MiB | exclude it via `.vercelignore` or point at a smaller subdirectory |
| exit 1, build error (build mode) | the framework's own `vercel build` failed | read the streamed stderr from `npx vercel`; fix the app's build, not this script |
| exit 5 | deployment stuck in `BUILDING`/`QUEUED` past 300s | usually transient Vercel-side load; re-run, or check the inspector URL from `--json` |
| deployed but wrong mode (static vs build) | detection guessed wrong (e.g. `package.json` present but not actually a framework app) | pass `--force-static` or `--force-build` explicitly |
| URL 404s after "success" | reused `--name` on a project with different routing (e.g. static -> build or vice versa) | pick a fresh `--name`, or confirm the old deployment aliasing on the Vercel dashboard |
