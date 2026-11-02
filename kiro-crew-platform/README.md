# 👻 Kiro Crew Platform

Skills specific to operating or developing the Kiro Crew platform itself (dashboard, widgets, crons, conductors, pets).

[← Back to index](../README.md)

| Skill | Description |
|---|---|
| [`artifacts`](artifacts/SKILL.md) | Persist, version, and iterate on LLM-generated UI (widgets, HTML, markdown). Load for Dynamic Dashboards on long workflows and conductor runs, or… |
| [`cron-cost-optimize`](cron-cost-optimize/SKILL.md) | Audit a user's registered cron jobs and recommend a cheaper mode for each — a zero-token script/command job, or an agent job with minimal context.… |
| [`crystallize`](crystallize/SKILL.md) | Capture the current session as a reusable skill — staged as a candidate by default, or live only when the user explicitly asks for a live/active… |
| [`dashboard`](dashboard/SKILL.md) | Build or change a crewmate's Dashboard tab: a page worth returning to, with real work woven into its design. dashboard_save stores it;… |
| [`dashboard-template`](dashboard-template/SKILL.md) | Kiro Crew repo only: load this when a task will author or change a dashboard page. A page never ships alone: the same PR carries its TypedDict… |
| [`debug-gateway`](debug-gateway/SKILL.md) | Load this before concluding a change did not land, and to read what the kirocrew-debug tools actually answered - which question to ask first, the… |
| [`feature-request`](feature-request/SKILL.md) | Conversational workflow for gathering user feedback and filing GitHub Issues on the Kiro Crew repository. Load when the user clicks "Request a… |
| [`goal-conductor`](goal-conductor/SKILL.md) | Own a goal too large for one session ('clear the flaky-test backlog', 'push N PRs green') end to end via the work ledger — decompose into items,… |
| [`goal-ledger-conductor`](goal-ledger-conductor/SKILL.md) | Deprecated alias of goal-conductor, removed next release. The work-ledger conducting procedure now lives in goal-conductor; read that skill instead. |
| [`kirocrew-commands`](kirocrew-commands/SKILL.md) | Complete CLI reference for Kiro Crew commands. Use for help, commands, setup, how to, what can you do, getting started, onboarding. |
| [`kirocrew-prepare-pr`](kirocrew-prepare-pr/SKILL.md) | LOAD THIS FOR EVERY KIRO CREW PR you open or update (Kiro Crew repo only; not other repos or CRs). Runs the whole loop — issue + tier, commit,… |
| [`kirocrew-worktree-dev`](kirocrew-worktree-dev/SKILL.md) | HARD RULE for developing the Kiro Crew source repo ITSELF (not users' projects): develop, build and verify in a git worktree, never against the… |
| [`meetings`](meetings/SKILL.md) | Context for the Meetings app's data — where a meeting's notes, diagram, transcript-derived tasks and calendar cache live, what the lifecycle… |
| [`mochi-plan`](mochi-plan/SKILL.md) | INTERNAL pet queue — generates the pet's upcoming-window behavior schedule (moves, moods, notifications). NOT for user task or calendar planning. |
| [`mochi-replan`](mochi-replan/SKILL.md) | INTERNAL pet queue — partial adjustment of the pet's behavior schedule. NOT for user task or calendar planning. |
| [`mochi-tips`](mochi-tips/SKILL.md) | Feature tips catalog for new users. Plan skill loads this to pick a tip during the first week. |
| [`mochi-watch`](mochi-watch/SKILL.md) | Check one or more watch items, compare with last known status, suggest actions, and update the watchlist. |
| [`pipeline-conductor`](pipeline-conductor/SKILL.md) | Operating procedure for the kirocrew-pipeline-conductor agent. Use when a pipeline conductor session is seeded, inspected or debugged. You MANAGE… |
| [`pull-all`](pull-all/SKILL.md) | Pull the latest changes for every git repo in a directory (default: cwd), in parallel. Use when asked to "pull all the repos", "sync all repos",… |
| [`quick-share`](quick-share/SKILL.md) | Deploy any local project directory or a single .html file to Vercel in one shot and print the live URL. Use when asked to "deploy this to vercel",… |
| [`remote-crew-microvm`](remote-crew-microvm/SKILL.md) | Drive the AWS Lambda MicroVM remote-crew lane: check whether it is configured, hand the operator the cloud.json block when it is not, launch a… |
| [`retro`](retro/SKILL.md) | Weekly engineering retrospective. Analyzes commit history, work patterns, and code quality metrics with persistent history and trend tracking.… |
| [`review`](review/SKILL.md) | Pre-landing PR review. Analyzes diff against the base branch for SQL safety, LLM trust boundary violations, conditional side effects, and other… |
| [`sdlc-review`](sdlc-review/SKILL.md) | Review Kanban handoffs and route verified outcomes. |
| [`security-conductor`](security-conductor/SKILL.md) | Operating procedure for the kirocrew-security-conductor agent. Use when a security conductor session is seeded, inspected or debugged. Run… |
| [`session-librarian`](session-librarian/SKILL.md) | Organize sessions by prompt: find, rename, archive, prune. |
| [`session-summaries`](session-summaries/SKILL.md) | What the chat right-panel session summary shows, what it costs, and how to make a session summarize well. Load when the user asks about the… |
| [`spec-workflow`](spec-workflow/SKILL.md) | Drive the Kiro CLI v3 spec workflow (Requirements → Design → Tasks → Execution) for the Spec Builder app. Load when authoring a spec inside a… |
| [`team-lead`](team-lead/SKILL.md) | Run a goal as a team when you can also do the work yourself: decide what you keep, dispatch the rest, and keep the status board honest. The delta… |
| [`theme-pack-authoring`](theme-pack-authoring/SKILL.md) | Build, validate, and install Kiro Crew theme packs -- pack anatomy, the 56-variable palette, role-tagged fonts, the overrides.css allowlist (what… |
| [`widgets`](widgets/SKILL.md) | Render rich HTML inline via `<mcwidget>` tags with theme-aware styling. Load when emitting an mcwidget so the iframe inherits the dashboard theme… |
