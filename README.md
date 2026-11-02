# Skills Library

> A curated, categorized collection of **281 agent skills** for Claude Code, Kiro, Codex, OpenCode, Hermes and other `SKILL.md`-compatible agents.

![skills](https://img.shields.io/badge/skills-281-blue) ![categories](https://img.shields.io/badge/categories-13-green)

## Categories

| | Category | Skills | Covers |
|---|---|---:|---|
| 🎨 | [Frontend & Design](#frontend-and-design) | 36 | UI engineering, visual design styles, design systems, Tailwind, layouts |
| 👻 | [Kiro Crew Platform](#kiro-crew-platform) | 31 | Skills specific to operating or developing the Kiro Crew platform itself (dashboard, widgets, crons, conductors, pets) |
| 🤖 | [AI Agents & LLM](#ai-agents-and-llm) | 28 | Agent harnesses, context engineering, prompts, multi-agent orchestration, MLOps, evals, memory |
| 📝 | [Docs & Writing](#docs-and-writing) | 27 | Docs, ADRs, papers, LaTeX, writing style, presentations, explanations |
| 🚀 | [DevOps & Release](#devops-and-release) | 26 | CI/CD, deploys, shipping, git workflow, observability, monitoring, dependency/PR babysitting |
| ☁️ | [Cloud AWS](#cloud-aws) | 25 | AWS services, IaC (CDK/CloudFormation), cloud auth and cost |
| 🧪 | [Testing & Code Quality](#testing-and-code-quality) | 23 | Tests, TDD, debugging, code review, refactoring/simplification, performance |
| 🧭 | [Planning & Product](#planning-and-product) | 22 | Specs, plans, brainstorming, ideation, strategy, task breakdown, app store/product |
| 🔌 | [Productivity & Integrations](#productivity-and-integrations) | 22 | Slack, GitHub, email, meetings, reminders, notes, scheduling, personal assistants |
| 🌐 | [Browser & QA](#browser-and-qa) | 19 | Browser automation, web QA, screenshots, previews, simulators |
| 🎬 | [Creative & Media](#creative-and-media) | 13 | Images, music, video, generative art, brand |
| 🗄️ | [Backend & Data](#backend-and-data) | 6 | APIs, databases, Postgres, data modeling, backend SDK usage |
| 🛡️ | [Security](#security) | 3 | Security reviews, hardening, auth, secrets, policy |

## Using a skill

Each skill is a folder with a `SKILL.md` (YAML front matter `name` + `description`, then instructions) and optional `scripts/`, `references/` and `templates/`. Copy or symlink a folder into your agent's skills directory:

```bash
# Claude Code
cp -r devops-and-release/ship ~/.claude/skills/
# Generic agents
cp -r devops-and-release/ship ~/.agents/skills/
```


## 🎨 Frontend & Design
<a id="frontend-and-design"></a>

_UI engineering, visual design styles, design systems, Tailwind, layouts._

| Skill | Description |
|---|---|
| [`agency-grid-layout-minimal`](frontend-and-design/agency-grid-layout-minimal/) | Create a minimal agency design system with a disciplined editorial grid, oversized typography, quiet uppercase utility labels, restrained image… |
| [`architecture-diagram`](frontend-and-design/architecture-diagram/) | Dark-themed SVG architecture/cloud/infra diagrams as HTML. |
| [`beautiful-shadows`](frontend-and-design/beautiful-shadows/) | Apply exact Tailwind arbitrary shadow utilities for polished, layered neutral elevation. Use when compact cards, controls, panels, popovers, hero… |
| [`brand-guidelines`](frontend-and-design/brand-guidelines/) | Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it… |
| [`build-awwwards-quality-sites`](frontend-and-design/build-awwwards-quality-sites/) | Art-direct and implement distinctive, motion-rich marketing, editorial, portfolio, and landing websites with original reference-inspired imagery,… |
| [`ce-polish`](frontend-and-design/ce-polish/) | Start the dev server, inspect the feature in browser, and iterate on polish. |
| [`claude-design`](frontend-and-design/claude-design/) | Design one-off HTML artifacts (landing, deck, prototype). |
| [`clean-minimal-beige-light-mode`](frontend-and-design/clean-minimal-beige-light-mode/) | Create a clean minimal beige light-mode design system with warm neutral shells, quiet process grids, restrained accent color, and elegant… |
| [`container-lines`](frontend-and-design/container-lines/) | Add vertical container-size guide lines with mini corner squares for precise, structured web layouts. Use when asked for container lines, measured… |
| [`design-consultation`](frontend-and-design/design-consultation/) | Design consultation: understands your product, researches the landscape, proposes a complete design system (aesthetic, typography, color, layout,… |
| [`design-first-ui-prompting`](frontend-and-design/design-first-ui-prompting/) | Use when you need design-first, spec-driven, skimmable prompts for UI generation. Covers prompt structure, constraints, variations,… |
| [`design-md`](frontend-and-design/design-md/) | Author/validate/export Google's DESIGN.md token spec files. |
| [`design-taste-frontend`](frontend-and-design/design-taste-frontend/) | Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships… |
| [`editorial-tech`](frontend-and-design/editorial-tech/) | Blend editorial magazine composition with precision product-tech detailing using asymmetrical grids, cinematic media bands, mono utility labels,… |
| [`framed-grid-layout`](frontend-and-design/framed-grid-layout/) | Create minimal framed grid layouts with thin visible boundary lines, L-shaped corner brackets, subtle diagonal line texture, and strict section… |
| [`frontend-design`](frontend-and-design/frontend-design/) | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components,… |
| [`frontend-design-workflow`](frontend-and-design/frontend-design-workflow/) | Workflow for frontend features and visual/product design changes — present mockup options before code, build on the project's design system,… |
| [`frontend-ui-engineering`](frontend-and-design/frontend-ui-engineering/) | Builds production-quality UIs. Use when building or modifying user-facing interfaces. Use when creating components, implementing layouts, managing… |
| [`high-end-visual-design`](frontend-and-design/high-end-visual-design/) | Teaches the AI to design like a high-end agency. Defines the exact fonts, spacing, shadows, card structures, and animations that make a website… |
| [`image-to-code`](frontend-and-design/image-to-code/) | Elite website image-to-code skill for Codex. For visually important web tasks, it must first generate the design image(s) itself, deeply analyze… |
| [`imagegen-frontend-mobile`](frontend-and-design/imagegen-frontend-mobile/) | Elite mobile app image-generation skill for creating premium, app-native screen concepts and flows. Designed for iOS, Android, and cross-platform… |
| [`imagegen-frontend-web`](frontend-and-design/imagegen-frontend-web/) | Elite frontend image-direction skill for generating premium, conversion-aware website design references. CRITICAL OUTPUT RULE — generate ONE… |
| [`light-mode-paper-technical`](frontend-and-design/light-mode-paper-technical/) | Create a light-mode technical design system with warm paper surfaces, dark outer framing, subtle diagonal texture, precise bracketed geometry, and… |
| [`living-ui`](frontend-and-design/living-ui/) | Use when building an animated or interactive widget, explainer or dashboard page: how motion feels, where the eye goes, where words sit, reduced… |
| [`minimalist-ui`](frontend-and-design/minimalist-ui/) | Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows. |
| [`nested-container-clean-agency`](frontend-and-design/nested-container-clean-agency/) | Create a clean agency design system built from nested containers, with an outer editorial shell, inset dark feature blocks, rounded premium cards,… |
| [`number-details`](frontend-and-design/number-details/) | Add decorative 01, 02, 03 numeric detail markers. |
| [`operational-enterprise-ai`](frontend-and-design/operational-enterprise-ai/) | Create or redesign enterprise AI, automation, security, and operations product pages that explain system boundaries, approvals, auditability,… |
| [`popular-web-designs`](frontend-and-design/popular-web-designs/) | 54 real design systems (Stripe, Linear, Vercel) as HTML/CSS. |
| [`redesign-existing-projects`](frontend-and-design/redesign-existing-projects/) | Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, and applies high-end design… |
| [`site-remix`](frontend-and-design/site-remix/) | Tear down any reference website into a documented design system, then remix that system into a new page. Use when asked to "copy this site's… |
| [`sketch`](frontend-and-design/sketch/) | Throwaway HTML mockups: 2-3 design variants to compare. |
| [`split-layout-technical`](frontend-and-design/split-layout-technical/) | Create a technical split-screen design system with dual panels, fine frame lines, mono metadata, quiet editorial typography, and premium inset… |
| [`stitch-design-taste`](frontend-and-design/stitch-design-taste/) | Semantic Design System Skill for Google Stitch. Generates agent-friendly DESIGN.md files that enforce premium, anti-generic UI standards — strict… |
| [`tailwind-patterns`](frontend-and-design/tailwind-patterns/) | Tailwind CSS v4 principles. CSS-first configuration, container queries, modern patterns, design token architecture. |
| [`web-design-guidelines`](frontend-and-design/web-design-guidelines/) | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or… |

## 👻 Kiro Crew Platform
<a id="kiro-crew-platform"></a>

_Skills specific to operating or developing the Kiro Crew platform itself (dashboard, widgets, crons, conductors, pets)._

| Skill | Description |
|---|---|
| [`artifacts`](kiro-crew-platform/artifacts/) | Persist, version, and iterate on LLM-generated UI (widgets, HTML, markdown). Load for Dynamic Dashboards on long workflows and conductor runs, or… |
| [`cron-cost-optimize`](kiro-crew-platform/cron-cost-optimize/) | Audit a user's registered cron jobs and recommend a cheaper mode for each — a zero-token script/command job, or an agent job with minimal context.… |
| [`crystallize`](kiro-crew-platform/crystallize/) | Capture the current session as a reusable skill — staged as a candidate by default, or live only when the user explicitly asks for a live/active… |
| [`dashboard`](kiro-crew-platform/dashboard/) | Build or change a crewmate's Dashboard tab: a page worth returning to, with real work woven into its design. dashboard_save stores it;… |
| [`dashboard-template`](kiro-crew-platform/dashboard-template/) | Kiro Crew repo only: load this when a task will author or change a dashboard page. A page never ships alone: the same PR carries its TypedDict… |
| [`debug-gateway`](kiro-crew-platform/debug-gateway/) | Load this before concluding a change did not land, and to read what the kirocrew-debug tools actually answered - which question to ask first, the… |
| [`feature-request`](kiro-crew-platform/feature-request/) | Conversational workflow for gathering user feedback and filing GitHub Issues on the Kiro Crew repository. Load when the user clicks "Request a… |
| [`goal-conductor`](kiro-crew-platform/goal-conductor/) | Own a goal too large for one session ('clear the flaky-test backlog', 'push N PRs green') end to end via the work ledger — decompose into items,… |
| [`goal-ledger-conductor`](kiro-crew-platform/goal-ledger-conductor/) | Deprecated alias of goal-conductor, removed next release. The work-ledger conducting procedure now lives in goal-conductor; read that skill instead. |
| [`kirocrew-commands`](kiro-crew-platform/kirocrew-commands/) | Complete CLI reference for Kiro Crew commands. Use for help, commands, setup, how to, what can you do, getting started, onboarding. |
| [`kirocrew-prepare-pr`](kiro-crew-platform/kirocrew-prepare-pr/) | LOAD THIS FOR EVERY KIRO CREW PR you open or update (Kiro Crew repo only; not other repos or CRs). Runs the whole loop — issue + tier, commit,… |
| [`kirocrew-worktree-dev`](kiro-crew-platform/kirocrew-worktree-dev/) | HARD RULE for developing the Kiro Crew source repo ITSELF (not users' projects): develop, build and verify in a git worktree, never against the… |
| [`meetings`](kiro-crew-platform/meetings/) | Context for the Meetings app's data — where a meeting's notes, diagram, transcript-derived tasks and calendar cache live, what the lifecycle… |
| [`mochi-plan`](kiro-crew-platform/mochi-plan/) | INTERNAL pet queue — generates the pet's upcoming-window behavior schedule (moves, moods, notifications). NOT for user task or calendar planning. |
| [`mochi-replan`](kiro-crew-platform/mochi-replan/) | INTERNAL pet queue — partial adjustment of the pet's behavior schedule. NOT for user task or calendar planning. |
| [`mochi-tips`](kiro-crew-platform/mochi-tips/) | Feature tips catalog for new users. Plan skill loads this to pick a tip during the first week. |
| [`mochi-watch`](kiro-crew-platform/mochi-watch/) | Check one or more watch items, compare with last known status, suggest actions, and update the watchlist. |
| [`pipeline-conductor`](kiro-crew-platform/pipeline-conductor/) | Operating procedure for the kirocrew-pipeline-conductor agent. Use when a pipeline conductor session is seeded, inspected or debugged. You MANAGE… |
| [`pull-all`](kiro-crew-platform/pull-all/) | Pull the latest changes for every git repo in a directory (default: cwd), in parallel. Use when asked to "pull all the repos", "sync all repos",… |
| [`quick-share`](kiro-crew-platform/quick-share/) | Deploy any local project directory or a single .html file to Vercel in one shot and print the live URL. Use when asked to "deploy this to vercel",… |
| [`remote-crew-microvm`](kiro-crew-platform/remote-crew-microvm/) | Drive the AWS Lambda MicroVM remote-crew lane: check whether it is configured, hand the operator the cloud.json block when it is not, launch a… |
| [`retro`](kiro-crew-platform/retro/) | Weekly engineering retrospective. Analyzes commit history, work patterns, and code quality metrics with persistent history and trend tracking.… |
| [`review`](kiro-crew-platform/review/) | Pre-landing PR review. Analyzes diff against the base branch for SQL safety, LLM trust boundary violations, conditional side effects, and other… |
| [`sdlc-review`](kiro-crew-platform/sdlc-review/) | Review Kanban handoffs and route verified outcomes. |
| [`security-conductor`](kiro-crew-platform/security-conductor/) | Operating procedure for the kirocrew-security-conductor agent. Use when a security conductor session is seeded, inspected or debugged. Run… |
| [`session-librarian`](kiro-crew-platform/session-librarian/) | Organize sessions by prompt: find, rename, archive, prune. |
| [`session-summaries`](kiro-crew-platform/session-summaries/) | What the chat right-panel session summary shows, what it costs, and how to make a session summarize well. Load when the user asks about the… |
| [`spec-workflow`](kiro-crew-platform/spec-workflow/) | Drive the Kiro CLI v3 spec workflow (Requirements → Design → Tasks → Execution) for the Spec Builder app. Load when authoring a spec inside a… |
| [`team-lead`](kiro-crew-platform/team-lead/) | Run a goal as a team when you can also do the work yourself: decide what you keep, dispatch the rest, and keep the status board honest. The delta… |
| [`theme-pack-authoring`](kiro-crew-platform/theme-pack-authoring/) | Build, validate, and install Kiro Crew theme packs -- pack anatomy, the 56-variable palette, role-tagged fonts, the overrides.css allowlist (what… |
| [`widgets`](kiro-crew-platform/widgets/) | Render rich HTML inline via `<mcwidget>` tags with theme-aware styling. Load when emitting an mcwidget so the iframe inherits the dashboard theme… |

## 🤖 AI Agents & LLM
<a id="ai-agents-and-llm"></a>

_Agent harnesses, context engineering, prompts, multi-agent orchestration, MLOps, evals, memory._

| Skill | Description |
|---|---|
| [`app-builder`](ai-agents-and-llm/app-builder/) | Main application building orchestrator. Creates full-stack applications from natural language requests. Determines project type, selects tech… |
| [`ce-compound-refresh`](ai-agents-and-llm/ce-compound-refresh/) | Refresh the repo's captured learnings against the current codebase. Use when auditing stale, overlapping, superseded, or drifted learnings; avoid… |
| [`ce-handoff`](ai-agents-and-llm/ce-handoff/) | Create a session handoff for another agent, or resume, find, and read any user-selected continuity source. Use when work or conversation must… |
| [`ce-retune`](ai-agents-and-llm/ce-retune/) | Retune a skill corpus for a new model, measurement-first: mine the run archive for a baseline, establish a noise floor, audit the corpus… |
| [`claude-code`](ai-agents-and-llm/claude-code/) | Delegate coding to Claude Code CLI (features, PRs). |
| [`codex`](ai-agents-and-llm/codex/) | Delegate coding to OpenAI Codex CLI (features, PRs). |
| [`context-engineering`](ai-agents-and-llm/context-engineering/) | Optimizes agent context setup. Use when starting a new session, when agent output quality degrades, when switching between tasks, or when you need… |
| [`context-fundamentals`](ai-agents-and-llm/context-fundamentals/) | This skill should be used to explain or reason about the foundational concepts of context engineering: what context is, the anatomy of a context… |
| [`context-optimization`](ai-agents-and-llm/context-optimization/) | This skill should be used for improving context efficiency: context budgeting, observation masking, prefix or KV-cache strategy, partitioning,… |
| [`evaluating-llms-harness`](ai-agents-and-llm/evaluating-llms-harness/) | lm-eval-harness: benchmark LLMs (MMLU, GSM8K, etc.). |
| [`evaluation`](ai-agents-and-llm/evaluation/) | This skill should be used when building agent evaluation systems: deterministic checks, regression suites, multi-dimensional rubrics, quality… |
| [`find-skills`](ai-agents-and-llm/find-skills/) | Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...",… |
| [`full-output-enforcement`](ai-agents-and-llm/full-output-enforcement/) | Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns, and handles token-limit splits cleanly.… |
| [`harness-engineering`](ai-agents-and-llm/harness-engineering/) | This skill should be used when designing autonomous agent harnesses: research loops, evaluation scaffolds, locked and editable surfaces, durable… |
| [`hermes-agent`](ai-agents-and-llm/hermes-agent/) | Use, configure, theme, extend, and orchestrate Hermes Agent. |
| [`hermes-agent-skill-authoring`](ai-agents-and-llm/hermes-agent-skill-authoring/) | Author in-repo SKILL.md files: frontmatter and structure. |
| [`huggingface-hub`](ai-agents-and-llm/huggingface-hub/) | HuggingFace hf CLI: search/download/upload models, datasets. |
| [`llama-cpp`](ai-agents-and-llm/llama-cpp/) | llama.cpp local GGUF inference + HF Hub model discovery. |
| [`llm-council`](ai-agents-and-llm/llm-council/) | Convene a cross-vendor LLM council — the session is Chairman and spawns subagents each pinned to a DIFFERENT model family… |
| [`memory-systems`](ai-agents-and-llm/memory-systems/) | This skill should be used for persistent semantic memory in agent systems: cross-session knowledge retention, entity tracking, temporal validity,… |
| [`multi-agent-patterns`](ai-agents-and-llm/multi-agent-patterns/) | This skill should be used when designing multi-agent systems that need context isolation, supervisor or swarm coordination, explicit handoffs,… |
| [`opencode`](ai-agents-and-llm/opencode/) | Delegate coding to OpenCode CLI (features, PR review). |
| [`prompt-engineering`](ai-agents-and-llm/prompt-engineering/) | Expert guide on prompt engineering patterns, best practices, and optimization techniques. Use when user wants to improve prompts, learn prompting… |
| [`self-improvement-loops`](ai-agents-and-llm/self-improvement-loops/) | This skill should be used when the harness, scaffold, workflow, or optimizer itself is the optimization target: recursive self-improvement (RSI)… |
| [`serving-llms-vllm`](ai-agents-and-llm/serving-llms-vllm/) | vLLM: high-throughput LLM serving, OpenAI API, quantization. |
| [`tool-design`](ai-agents-and-llm/tool-design/) | This skill should be used for the tool-interface layer of an agent system specifically: writing tool descriptions agents can route on, designing… |
| [`using-agent-skills`](ai-agents-and-llm/using-agent-skills/) | Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the… |
| [`weights-and-biases`](ai-agents-and-llm/weights-and-biases/) | W&B: log ML experiments, sweeps, model registry, dashboards. |

## 📝 Docs & Writing
<a id="docs-and-writing"></a>

_Docs, ADRs, papers, LaTeX, writing style, presentations, explanations._

| Skill | Description |
|---|---|
| [`arxiv`](docs-and-writing/arxiv/) | Search arXiv papers by keyword, author, category, or ID. |
| [`ce-compound`](docs-and-writing/ce-compound/) | Document a recently solved problem as a durable repo learning, or capture project vocabulary in CONCEPTS.md. Use when capturing a learning after work. |
| [`ce-explain`](docs-and-writing/ce-explain/) | Create a durable, visual teaching artifact — plus an optional check-in (predict-then-reveal for diffs, corrected exercises) that makes it stick —… |
| [`ce-promote`](docs-and-writing/ce-promote/) | Draft launch or promotion copy for a shipped feature. |
| [`ce-proof`](docs-and-writing/ce-proof/) | Publish, read, comment on, or edit markdown in Proof. Use for Proof links, sharing specs/plans/drafts, or publish handoffs from planning… |
| [`codemap`](docs-and-writing/codemap/) | Generate comprehensive hierarchical codemaps for UNFAMILIAR repositories. Expensive operation - only use when explicitly asked for codebase… |
| [`document-release`](docs-and-writing/document-release/) | Post-ship documentation update. Reads all project docs, cross-references the diff, updates README/ARCHITECTURE/CONTRIBUTING/CLAUDE.md to match… |
| [`documentation-and-adrs`](docs-and-writing/documentation-and-adrs/) | Records decisions and documentation. Use when making architectural decisions, changing public APIs, shipping features, or when you need to record… |
| [`docx`](docs-and-writing/docx/) | Create, read, edit, template, and review Word .docx files. |
| [`excalidraw`](docs-and-writing/excalidraw/) | Hand-drawn Excalidraw JSON diagrams (arch, flow, seq). |
| [`explain-for`](docs-and-writing/explain-for/) | Explain a topic, code, error or design decision for one named audience (a 5-year-old, a manager, a designer, a grad student, a parent). Resolves… |
| [`grounded-citations`](docs-and-writing/grounded-citations/) | Ground answers and documents in cited, verifiable sources. |
| [`humanizer`](docs-and-writing/humanizer/) | Humanize text: strip AI-isms and add real voice. |
| [`llm-wiki`](docs-and-writing/llm-wiki/) | Karpathy's LLM Wiki: build/query interlinked markdown KB. |
| [`nano-pdf`](docs-and-writing/nano-pdf/) | Edit text in existing PDFs via natural-language prompts. |
| [`no-ai-slop`](docs-and-writing/no-ai-slop/) | Edit drafts into sharper, more human writing while preserving the writer's personal voice, or detect AI-slop patterns without rewriting. Use when… |
| [`ocr-and-documents`](docs-and-writing/ocr-and-documents/) | Extract text from PDFs/scans (pymupdf, marker-pdf). |
| [`papyrus-diagnose-compilation`](docs-and-writing/papyrus-diagnose-compilation/) | Diagnose and fix LaTeX compilation failures. Use when the document does not compile, pdflatex/bibtex/biber/tectonic errors out, the PDF is stale,… |
| [`papyrus-latex-comments`](docs-and-writing/papyrus-latex-comments/) | Set up and use a non-destructive COMMENT layer in a LaTeX document — margin/inline notes tagged by type next to the author's text, without… |
| [`papyrus-latex-suggestions`](docs-and-writing/papyrus-latex-suggestions/) | Propose inline replacement text (old -> new) as accept/reject suggestions, LaTeX 'suggesting mode' / track changes, rendered in the PDF. Use when… |
| [`papyrus-make-fluent`](docs-and-writing/papyrus-make-fluent/) | Polish the English of a LaTeX passage — fluency, grammar, and clarity — as tracked suggestions, without changing structure or meaning. Use when… |
| [`papyrus-writing`](docs-and-writing/papyrus-writing/) | Base skill for the Papyrus writing assistant — conduct, paper-quality principles and LaTeX house style every Papyrus edit builds on. Load first… |
| [`pdf`](docs-and-writing/pdf/) | Create, read, merge, fill, and secure PDF files. |
| [`powerpoint`](docs-and-writing/powerpoint/) | Create, read, edit .pptx decks with python-pptx. |
| [`pptx-maker`](docs-and-writing/pptx-maker/) | Generate or restyle a PowerPoint deck. Use when the user wants to create or edit a .pptx presentation, build slides from text or a URL, or design… |
| [`research-paper-writing`](docs-and-writing/research-paper-writing/) | Write ML papers for NeurIPS/ICML/ICLR: design→submit. |
| [`youtube-content`](docs-and-writing/youtube-content/) | YouTube transcripts to summaries, threads, blogs. |

## 🚀 DevOps & Release
<a id="devops-and-release"></a>

_CI/CD, deploys, shipping, git workflow, observability, monitoring, dependency/PR babysitting._

| Skill | Description |
|---|---|
| [`babysit`](devops-and-release/babysit/) | Use when a user asks to babysit, monitor, keep checking, keep an eye on, or report when a pull request, CI run, ticket, deployment, or other… |
| [`ce-babysit-pr`](devops-and-release/ce-babysit-pr/) | Babysits or watches an open GitHub PR until merge-ready, continuously reacting to review comments, CI failures, and routine base movement… |
| [`ce-commit`](devops-and-release/ce-commit/) | Create a git commit with a clear, value-communication message. Use when the user asks to commit/save staged or unstaged changes with a… |
| [`ce-commit-push-pr`](devops-and-release/ce-commit-push-pr/) | Commit, push, and open a PR. Use when asked to ship/open a PR, or for PR-description-only flows like writing, rewriting, or describing a PR body. |
| [`ce-resolve-pr-feedback`](devops-and-release/ce-resolve-pr-feedback/) | Resolve PR review feedback. Use when addressing review comments, resolving review threads, or fixing code-review feedback. |
| [`ce-setup`](devops-and-release/ce-setup/) | Check Compound Engineering health and repo-local config. |
| [`ce-work`](devops-and-release/ce-work/) | Execute a plan or concrete work prompt end-to-end. Use when implementing from a plan document, a spec path, or a clear build request; use ce-debug… |
| [`ce-worktree`](devops-and-release/ce-worktree/) | Set up isolated git worktrees — create a new branch for fresh work, or attach a worktree to an existing branch/PR/commit to work on it in… |
| [`ci-cd-and-automation`](devops-and-release/ci-cd-and-automation/) | Automates CI/CD pipeline setup. Use when setting up or modifying build and deployment pipelines. Use when you need to automate quality gates,… |
| [`debtap-deb-to-arch`](devops-and-release/debtap-deb-to-arch/) | Convert a vendor .deb package to a pacman package with debtap and install it on Arch/Manjaro, wiring up a user-level CLI command and desktop… |
| [`deprecation-and-migration`](devops-and-release/deprecation-and-migration/) | Manages deprecation and migration. Use when removing old systems, APIs, or features. Use when migrating users from one implementation to another.… |
| [`git-workflow-and-versioning`](devops-and-release/git-workflow-and-versioning/) | Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, or when you need to… |
| [`github-auth`](devops-and-release/github-auth/) | GitHub auth setup: HTTPS tokens, SSH keys, gh CLI login. |
| [`github-code-review`](devops-and-release/github-code-review/) | Review PRs: diffs, inline comments via gh or REST. |
| [`github-issue-to-pr`](devops-and-release/github-issue-to-pr/) | Carry a GitHub issue to a verified PR with honest CI state. |
| [`github-pr-workflow`](devops-and-release/github-pr-workflow/) | GitHub PR lifecycle: branch, commit, open, CI, merge. |
| [`github-repo-management`](devops-and-release/github-repo-management/) | Clone/create/fork repos; manage remotes, releases. |
| [`gstack`](devops-and-release/gstack/) | Fast headless browser for QA testing and site dogfooding. Navigate any URL, interact with elements, verify page state, diff before/after actions,… |
| [`gstack-upgrade`](devops-and-release/gstack-upgrade/) | Upgrade gstack to the latest version. Detects global vs vendored install, runs the upgrade, and shows what's new. |
| [`lfg`](devops-and-release/lfg/) | Run the full autonomous shipping pipeline end-to-end, hands-off with no check-ins: plan, implement, review and fix, commit, push a branch, open a… |
| [`merge-reconciler`](devops-and-release/merge-reconciler/) | Neutral third-party resolution of agent merge conflicts. |
| [`observability-and-instrumentation`](devops-and-release/observability-and-instrumentation/) | Instruments code so production behavior is visible and diagnosable. Use when adding logging, metrics, tracing, or alerting. Use when shipping any… |
| [`ops-mission-control`](devops-and-release/ops-mission-control/) | Investigate and triage operational signals — alarms, pages, monitors, and ops issues — using the Ops Mission Control incident board and knowledge… |
| [`pre-push-ci`](devops-and-release/pre-push-ci/) | Verify CI will pass BEFORE pushing. Use when pushing to git, opening a PR, or merging. Reads the project's CI config, runs the equivalent steps… |
| [`ship`](devops-and-release/ship/) | Ship workflow: detect + merge base branch, run tests, review diff, bump VERSION, update CHANGELOG, commit, push, create PR. |
| [`shipping-and-launch`](devops-and-release/shipping-and-launch/) | Prepares production launches. Use when preparing to deploy to production. Use when you need a pre-launch checklist, when setting up monitoring,… |

## ☁️ Cloud AWS
<a id="cloud-aws"></a>

_AWS services, IaC (CDK/CloudFormation), cloud auth and cost._

| Skill | Description |
|---|---|
| [`amazon-bedrock`](cloud-aws/amazon-bedrock/) | Builds generative AI applications on Amazon Bedrock. Covers model invocation (Converse API, InvokeModel), RAG with Knowledge Bases, Bedrock… |
| [`artifact-deploy`](cloud-aws/artifact-deploy/) | One-click deploy a user's pre-built app/artifact into their OWN AWS account and get a global public HTTPS link (Vercel-like), with a default TTL… |
| [`aws-ai-ml`](cloud-aws/aws-ai-ml/) | Selects, deploys, and customizes AI models on Amazon SageMaker. Training or Processing jobs, fine-tuning (SFT/DPO/RLVR/RLAIF), model selection,… |
| [`aws-auth`](cloud-aws/aws-auth/) | Adds user authentication to web and mobile apps with Amazon Cognito (user pools and identity pools) and the AWS Amplify client auth libraries.… |
| [`aws-billing-and-cost-management`](cloud-aws/aws-billing-and-cost-management/) | Analyze AWS costs, find savings, manage budgets, evaluate Savings Plans and Reserved Instances, right-size EC2/Lambda/RDS/EBS with Compute… |
| [`aws-blocks`](cloud-aws/aws-blocks/) | Guides building full-stack applications with AWS Blocks — an Infrastructure-from-Code framework. Applies when creating APIs, selecting Building… |
| [`aws-cdk`](cloud-aws/aws-cdk/) | Authors, deploys, and troubleshoots AWS infrastructure using CDK with TypeScript or Python. Covers best practices, stack architecture, and… |
| [`aws-cloudformation`](cloud-aws/aws-cloudformation/) | Authors, validates, and troubleshoots AWS CloudFormation templates. Covers template authoring with secure defaults, local validation with either… |
| [`aws-compute`](cloud-aws/aws-compute/) | Provisions, scales, and operates Amazon EC2 virtual-machine workloads: instance-type selection (Graviton/Arm64, burstable T credits, GPU, instance… |
| [`aws-containers`](cloud-aws/aws-containers/) | Builds, deploys, debugs, and optimizes containerized workloads on Amazon EKS, ECS, Fargate, ECR, and Elastic Beanstalk. Covers EKS operations and… |
| [`aws-database`](cloud-aws/aws-database/) | Routes any task involving AWS databases — choosing, comparing, recommending, getting started with, or operating a database — to the correct… |
| [`aws-deployment`](cloud-aws/aws-deployment/) | Configures CI/CD pipelines using AWS CodePipeline, CodeBuild, CodeDeploy, CodeConnections, and CodeArtifact. Covers CodePipeline V2 (triggers,… |
| [`aws-iam`](cloud-aws/aws-iam/) | Provides verified corrections for IAM behaviors that AI agents frequently get wrong — policy evaluation edge cases, trust policy gotchas, STS… |
| [`aws-messaging-and-streaming`](cloud-aws/aws-messaging-and-streaming/) | Guides general use of AWS messaging and streaming services. Covers Amazon SQS, Amazon SNS, Amazon EventBridge, Amazon MQ, Amazon Kinesis Data… |
| [`aws-networking`](cloud-aws/aws-networking/) | Routes AWS networking requests to the correct service skill for implementation. Covers Route 53 (DNS, health checks, routing policies, Resolver,… |
| [`aws-observability`](cloud-aws/aws-observability/) | Investigates root causes on the Omni context graph (service dependencies) and Intelligence insights; builds, configures, debugs, tunes AWS… |
| [`aws-sdk-js-v3-usage`](cloud-aws/aws-sdk-js-v3-usage/) | AWS SDK for JavaScript v3 development patterns. Use when writing JavaScript or TypeScript code that uses AWS services via @aws-sdk/* packages… |
| [`aws-sdk-python-usage`](cloud-aws/aws-sdk-python-usage/) | AWS SDK for Python (boto3/botocore) development patterns. You MUST use this skill when writing Python code that uses AWS services via boto3 or… |
| [`aws-sdk-swift-usage`](cloud-aws/aws-sdk-swift-usage/) | AWS SDK for Swift development patterns. Use when writing Swift code that uses AWS services via aws-sdk-swift package. |
| [`aws-serverless`](cloud-aws/aws-serverless/) | Routes serverless requests to a compute form factor and the skill that owns it. Applies first to Lambda, API Gateway, EventBridge, Step Functions… |
| [`aws-storage`](cloud-aws/aws-storage/) | Selects, investigates, and compares AWS object, file, and block storage services, and answers cost, performance, configuration, security, and… |
| [`aws-well-architected-review`](cloud-aws/aws-well-architected-review/) | Performs a full AWS Well-Architected Framework review evaluating every framework question across all pillars discovered from the live AWS… |
| [`deploy-web`](cloud-aws/deploy-web/) | Publish a Kiro Crew artifact (HTML / markdown / widget) to a public HTTPS URL on the user's own AWS account (private S3 + CloudFront + OAC). Use… |
| [`launch-with-aws`](cloud-aws/launch-with-aws/) | Migrates vibe-coded web applications to AWS. Handles the full workflow from analysis through migration to deployment, producing deployable AWS… |
| [`signing-in-to-aws`](cloud-aws/signing-in-to-aws/) | Gets AWS credentials for CLI/SDK access via `aws login`. Activates when a developer needs to authenticate to AWS for local development, when an… |

## 🧪 Testing & Code Quality
<a id="testing-and-code-quality"></a>

_Tests, TDD, debugging, code review, refactoring/simplification, performance._

| Skill | Description |
|---|---|
| [`ce-code-review`](testing-and-code-quality/ce-code-review/) | Structured code review for bugs, regressions, tests, and standards. Use before PRs or when asked for review; report-only by default, with explicit… |
| [`ce-debug`](testing-and-code-quality/ce-debug/) | Diagnosis loop for bugs and failing behavior. Use for errors, stack traces, regressions, failed tests, issue-tracker bugs, stuck investigations… |
| [`ce-optimize`](testing-and-code-quality/ce-optimize/) | Run metric-driven optimization loops. Use when improving measurable outcomes such as search relevance, clustering quality, build performance,… |
| [`ce-riffrec-feedback-analysis`](testing-and-code-quality/ce-riffrec-feedback-analysis/) | Analyze Riffrec feedback captures from bundles or standalone recordings. Always load for `riffrec-*.zip`, `session.json` + `events.json` +… |
| [`ce-simplify-code`](testing-and-code-quality/ce-simplify-code/) | Simplify recently changed code for clarity, reuse, quality, and efficiency while preserving behavior. Use for tidy/refactor passes; use ce-debug… |
| [`clonedeps`](testing-and-code-quality/clonedeps/) | Clone important project dependency source code into an ignored local workspace so OpenCode can inspect library internals. Use when the user asks… |
| [`code-review-and-quality`](testing-and-code-quality/code-review-and-quality/) | Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, another agent, or a human. Use when… |
| [`code-simplification`](testing-and-code-quality/code-simplification/) | Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. Use when code works but is harder to read, maintain,… |
| [`codebase-inspection`](testing-and-code-quality/codebase-inspection/) | Inspect codebases w/ pygount: LOC, languages, ratios. |
| [`debugging-and-error-recovery`](testing-and-code-quality/debugging-and-error-recovery/) | Guides systematic root-cause debugging. Use when tests fail, builds break, behavior doesn't match expectations, or you encounter any unexpected… |
| [`doubt-driven-development`](testing-and-code-quality/doubt-driven-development/) | Subjects every non-trivial decision to a fresh-context adversarial review before it stands. Use when correctness matters more than speed, when… |
| [`learn-from-sage`](testing-and-code-quality/learn-from-sage/) | Detection-gap (miss) analysis for Code Review Sage. Learn from shipped fixes, acted-on human comments, and design outcomes to close reviewer blind… |
| [`node-inspect-debugger`](testing-and-code-quality/node-inspect-debugger/) | Debug Node.js via --inspect + Chrome DevTools Protocol CLI. |
| [`performance-optimization`](testing-and-code-quality/performance-optimization/) | Optimizes application performance. Use when performance requirements exist, when you suspect performance regressions, or when Core Web Vitals or… |
| [`python-debugpy`](testing-and-code-quality/python-debugpy/) | Debug Python: pdb REPL + debugpy remote (DAP). |
| [`requesting-code-review`](testing-and-code-quality/requesting-code-review/) | Pre-commit review: security scan, quality gates, auto-fix. |
| [`sage-review`](testing-and-code-quality/sage-review/) | Deep, platform-neutral code review for PRs and CRs in ONE thorough single pass — design reasoning (Problem Worth Solving & Solution Fit) as one… |
| [`simplify`](testing-and-code-quality/simplify/) | Simplifies code for clarity without changing behavior. Use for readability, maintainability, and complexity reduction after behavior is understood. |
| [`simplify-code`](testing-and-code-quality/simplify-code/) | Parallel 4-agent cleanup of recent code changes. |
| [`source-driven-development`](testing-and-code-quality/source-driven-development/) | Grounds every implementation decision in official documentation. Use when you want authoritative, source-cited code free from outdated patterns.… |
| [`systematic-debugging`](testing-and-code-quality/systematic-debugging/) | 4-phase root cause debugging: understand bugs before fixing. |
| [`test-driven-development`](testing-and-code-quality/test-driven-development/) | TDD: enforce RED-GREEN-REFACTOR, tests before code. |
| [`writing-tests`](testing-and-code-quality/writing-tests/) | Kiro Crew repo only: how to write a backend pytest test with NO side effects that does not flake. Use when adding, editing, reviewing or debugging… |

## 🧭 Planning & Product
<a id="planning-and-product"></a>

_Specs, plans, brainstorming, ideation, strategy, task breakdown, app store/product._

| Skill | Description |
|---|---|
| [`app-store-optimization`](planning-and-product/app-store-optimization/) | Complete App Store Optimization (ASO) toolkit for researching, optimizing, and tracking mobile app performance on Apple App Store and Google Play… |
| [`ce-brainstorm`](planning-and-product/ce-brainstorm/) | Explore vague or ambitious ideas into a right-sized requirements-only unified plan. Use when the user wants to brainstorm, think through scope,… |
| [`ce-doc-review`](planning-and-product/ce-doc-review/) | Review requirements, plans, or specs with role-specific lenses. Use when the user wants to improve an existing planning document. |
| [`ce-ideate`](planning-and-product/ce-ideate/) | Generate and evaluate grounded ideas. Use when the user asks for ideas, improvements, surprising options, or AI-generated directions before… |
| [`ce-plan`](planning-and-product/ce-plan/) | Create structured plans for multi-step work, including software and non-software tasks. Use when asked to plan, break down implementation, plan… |
| [`ce-pov`](planning-and-product/ce-pov/) | Give a decisive, project-grounded point of view in the subject's own shape: a graded verdict on an external-adoption question, a holistic take on… |
| [`ce-product-pulse`](planning-and-product/ce-product-pulse/) | Generate time-windowed product pulse reports from configured signals. |
| [`ce-strategy`](planning-and-product/ce-strategy/) | Create or update STRATEGY.md. Use when starting a product, changing direction or roadmap, or when ce-ideate, ce-brainstorm, or ce-plan need… |
| [`five-whys`](planning-and-product/five-whys/) | Guided dive-deep research mode. 5 Whys is the default engine — one focused question at a time along What-it-is -> Example -> Why-not-alternatives… |
| [`high-converting-landing-pages`](planning-and-product/high-converting-landing-pages/) | Create, rewrite, or audit landing pages for conversion. Use when building a new landing page, rewriting an underperforming one, reviewing landing… |
| [`idea-refine`](planning-and-product/idea-refine/) | Refines raw ideas into sharp, actionable concepts through structured divergent and convergent thinking. Use when an idea is still vague, when you… |
| [`incremental-implementation`](planning-and-product/incremental-implementation/) | Delivers changes incrementally. Use when implementing any feature or change that touches more than one file. Use when you're about to write a… |
| [`interview-me`](planning-and-product/interview-me/) | Extracts what the user actually wants instead of what they think they should want. Achieves this through one-question-at-a-time interview until… |
| [`plan`](planning-and-product/plan/) | Write a markdown plan to .hermes/plans/; no execution. |
| [`plan-ceo-review`](planning-and-product/plan-ceo-review/) | CEO/founder-mode plan review. Rethink the problem, find the 10-star product, challenge premises, expand scope when it creates a better product.… |
| [`plan-design-review`](planning-and-product/plan-design-review/) | Designer's eye review of a live site. Finds visual inconsistency, spacing issues, hierarchy problems, interaction feel, AI slop patterns,… |
| [`plan-eng-review`](planning-and-product/plan-eng-review/) | Eng manager-mode plan review. Lock in the execution plan — architecture, data flow, diagrams, edge cases, test coverage, performance. Walks… |
| [`planning-and-task-breakdown`](planning-and-product/planning-and-task-breakdown/) | Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementable tasks. Use when a task… |
| [`spec-driven-development`](planning-and-product/spec-driven-development/) | Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when… |
| [`spike`](planning-and-product/spike/) | Throwaway experiments to validate an idea before build. |
| [`templates`](planning-and-product/templates/) | Project scaffolding templates for new applications. Use when creating new projects from scratch. Contains 12 templates for various tech stacks. |
| [`weekly-review-planning`](planning-and-product/weekly-review-planning/) | Weekly reset: commitments, stalled work, next-week plan. |

## 🔌 Productivity & Integrations
<a id="productivity-and-integrations"></a>

_Slack, GitHub, email, meetings, reminders, notes, scheduling, personal assistants._

| Skill | Description |
|---|---|
| [`apple-notes`](productivity-and-integrations/apple-notes/) | Manage Apple Notes via memo CLI: create, search, edit. |
| [`apple-reminders`](productivity-and-integrations/apple-reminders/) | Apple Reminders via remindctl: add, list, complete. |
| [`blogwatcher`](productivity-and-integrations/blogwatcher/) | Monitor blogs and RSS/Atom feeds via blogwatcher-cli tool. |
| [`box`](productivity-and-integrations/box/) | Box manages cloud files, sharing, search, and metadata. |
| [`ce-sweep`](productivity-and-integrations/ce-sweep/) | Sweep configured feedback sources (Slack, GitHub Issues; email experimental) for new items: acknowledge at source, analyze recordings, verify… |
| [`competitor-news-monitor`](productivity-and-integrations/competitor-news-monitor/) | Watch named companies for material news; cited digests. |
| [`document-to-action-items`](productivity-and-integrations/document-to-action-items/) | Extract cited obligations, deadlines, tasks from documents. |
| [`email-inbox-triage`](productivity-and-integrations/email-inbox-triage/) | Triage an inbox: prioritize threads, draft replies safely. |
| [`findmy`](productivity-and-integrations/findmy/) | Track Apple devices/AirTags via FindMy.app on macOS. |
| [`github-issues`](productivity-and-integrations/github-issues/) | Create, triage, label, assign GitHub issues via gh or REST. |
| [`google-workspace`](productivity-and-integrations/google-workspace/) | Gmail, Calendar, Drive, Docs, Sheets via gws CLI or Python. |
| [`himalaya`](productivity-and-integrations/himalaya/) | Himalaya CLI: IMAP/SMTP email from terminal. |
| [`imessage`](productivity-and-integrations/imessage/) | Send and receive iMessages/SMS via the imsg CLI on macOS. |
| [`meeting-action-items`](productivity-and-integrations/meeting-action-items/) | Turn meeting notes into cited decisions, owners, tickets. |
| [`mochi-remind`](productivity-and-integrations/mochi-remind/) | Handle due reminders — notify the user with natural language and mark them done. |
| [`mochi-slack`](productivity-and-integrations/mochi-slack/) | Slack awareness — unread mentions, channel digests, topic radar, thread summaries. Load when user asks about Slack. |
| [`notion`](productivity-and-integrations/notion/) | Notion API + ntn CLI: pages, databases, markdown, Workers. |
| [`obsidian`](productivity-and-integrations/obsidian/) | Read, search, create, and edit notes in the Obsidian vault. |
| [`openhue`](productivity-and-integrations/openhue/) | Control Philips Hue lights, scenes, rooms via OpenHue CLI. |
| [`product-price-monitor`](productivity-and-integrations/product-price-monitor/) | Watch product, flight, or listing prices; alert on target. |
| [`teams-meeting-pipeline`](productivity-and-integrations/teams-meeting-pipeline/) | Teams meeting summaries, job replay, Graph subscriptions. |
| [`xurl`](productivity-and-integrations/xurl/) | X/Twitter via xurl CLI: raw post search, posting, DM, media. |

## 🌐 Browser & QA
<a id="browser-and-qa"></a>

_Browser automation, web QA, screenshots, previews, simulators._

| Skill | Description |
|---|---|
| [`agent-browser`](browser-and-qa/agent-browser/) | Browser automation CLI for AI agents. Use when the user needs to interact with websites, including navigating pages, filling forms, clicking… |
| [`blocked-page-recovery`](browser-and-qa/blocked-page-recovery/) | Recover blocked/paywalled/WAF'd pages via fallbacks. |
| [`browse`](browser-and-qa/browse/) | Fast headless browser for QA testing and site dogfooding. Navigate any URL, interact with elements, verify page state, diff before/after actions,… |
| [`browser-auth`](browser-and-qa/browser-auth/) | Browse sites that need a logged-in session with playwright-cli, using attach mode, saved storage state, or individual cookies. Use when a page is… |
| [`browser-recording`](browser-and-qa/browser-recording/) | Record a browser flow as video/GIF evidence for animations, transitions and multi-step interactions a still screenshot cannot prove. Uses the… |
| [`ce-dogfood`](browser-and-qa/ce-dogfood/) | Hands-off, diff-scoped browser QA of the active branch: maps user flows, drives a real browser, autonomously fixes small breakages with regression… |
| [`ce-test-browser`](browser-and-qa/ce-test-browser/) | Run browser tests for pages affected by the current branch or PR. |
| [`ce-test-xcode`](browser-and-qa/ce-test-xcode/) | Build and test iOS apps on simulator with XcodeBuildMCP. |
| [`computer-use`](browser-and-qa/computer-use/) | Read and drive native desktop apps through the accessibility layer — list apps, snapshot a window as a numbered element tree, then… |
| [`dogfood`](browser-and-qa/dogfood/) | Exploratory QA of web apps: find bugs, evidence, reports. |
| [`inspecting-hermes-desktop-dom`](browser-and-qa/inspecting-hermes-desktop-dom/) | Read the live Hermes desktop DOM/CSS over CDP. |
| [`ios-simulator-preview`](browser-and-qa/ios-simulator-preview/) | Show a live iOS Simulator in the dashboard's Browser side panel while building or testing an iOS app. Use when the user asks to preview an… |
| [`qa`](browser-and-qa/qa/) | Systematically QA test a web application and fix bugs found. Runs QA testing, then iteratively fixes bugs in source code, committing each fix… |
| [`qa-design-review`](browser-and-qa/qa-design-review/) | Designer's eye QA: finds visual inconsistency, spacing issues, hierarchy problems, AI slop patterns, and slow interactions — then fixes them.… |
| [`qa-only`](browser-and-qa/qa-only/) | Report-only QA testing. Systematically tests a web application and produces a structured report with health score, screenshots, and repro steps —… |
| [`setup-browser-cookies`](browser-and-qa/setup-browser-cookies/) | Import cookies from your real browser (Comet, Chrome, Arc, Brave, Edge) into the headless browse session. Opens an interactive picker UI where you… |
| [`web-browse`](browser-and-qa/web-browse/) | Open a REAL external web page in Kiro Crew's Browser panel. Primary path is the `browser` MCP tool (native panel); playwright-cli is the fallback… |
| [`web-preview`](browser-and-qa/web-preview/) | Emit a hidden preview marker so the right-panel Browser tab opens a Load-preview card for a local server URL. Use whenever you start a dev or… |
| [`web-verify`](browser-and-qa/web-verify/) | Use after a user-visible UI edit to verify your OWN change on an isolated loopback server. Capture, read and show real screenshots. Backends:… |

## 🎬 Creative & Media
<a id="creative-and-media"></a>

_Images, music, video, generative art, brand._

| Skill | Description |
|---|---|
| [`ascii-art`](creative-and-media/ascii-art/) | ASCII art: pyfiglet, cowsay, boxes, image-to-ascii. |
| [`ascii-video`](creative-and-media/ascii-video/) | ASCII video: convert video/audio to colored ASCII MP4/GIF. |
| [`baoyu-infographic`](creative-and-media/baoyu-infographic/) | Infographics: 21 layouts x 21 styles (信息图, 可视化). |
| [`brandkit`](creative-and-media/brandkit/) | Premium brand-kit image generation skill for creating high-end brand-guidelines boards, logo systems, identity decks, and visual-world… |
| [`comfyui`](creative-and-media/comfyui/) | Generate images, video, and audio via diffusion workflows. |
| [`gif-search`](creative-and-media/gif-search/) | Search/download GIFs from Tenor via curl + jq. |
| [`image-authoring`](creative-and-media/image-authoring/) | Author images and diagrams as code — SVG, Pillow, Excalidraw, mermaid. Load when asked to draw, illustrate, or make an image, icon, logo, poster,… |
| [`manim-video`](creative-and-media/manim-video/) | Manim CE animations: 3Blue1Brown math/algo videos. |
| [`p5js`](creative-and-media/p5js/) | p5.js sketches: gen art, shaders, interactive, 3D. |
| [`pretext`](creative-and-media/pretext/) | Build creative browser demos with DOM-free text layout. |
| [`songsee`](creative-and-media/songsee/) | Audio spectrograms/features (mel, chroma, MFCC) via CLI. |
| [`songwriting-and-ai-music`](creative-and-media/songwriting-and-ai-music/) | Songwriting craft and Suno AI music prompts. |
| [`touchdesigner-mcp`](creative-and-media/touchdesigner-mcp/) | Control TouchDesigner via twozero MCP. |

## 🗄️ Backend & Data
<a id="backend-and-data"></a>

_APIs, databases, Postgres, data modeling, backend SDK usage._

| Skill | Description |
|---|---|
| [`airtable`](backend-and-data/airtable/) | Airtable REST API via curl. Records CRUD, filters, upserts. |
| [`api-and-interface-design`](backend-and-data/api-and-interface-design/) | Guides stable API and interface design. Use when designing APIs, module boundaries, or any public interface. Use when creating REST or GraphQL… |
| [`maps`](backend-and-data/maps/) | Geocode, POIs, routes, timezones via OpenStreetMap/OSRM. |
| [`polymarket`](backend-and-data/polymarket/) | Query Polymarket: markets, prices, orderbooks, history. |
| [`supabase-postgres-best-practices`](backend-and-data/supabase-postgres-best-practices/) | Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema… |
| [`xlsx`](backend-and-data/xlsx/) | Create, read, edit Excel .xlsx workbooks and CSVs. |

## 🛡️ Security
<a id="security"></a>

_Security reviews, hardening, auth, secrets, policy._

| Skill | Description |
|---|---|
| [`aws-security`](security/aws-security/) | Covers AWS security services and workflows — Security Hub V2 (OCSF) findings, connectors, aggregators, automation rules, and security posture… |
| [`blocked-by-policy`](security/blocked-by-policy/) | What to do when a Kiro Crew safety policy blocks a tool call — tell a policy block from a user refusal, then take the sanctioned path for its… |
| [`security-and-hardening`](security/security-and-hardening/) | Hardens code against vulnerabilities. Use when handling user input, authentication, data storage, or external integrations. Use when building any… |

## Sources & credits

Skills were gathered from these installed locations (duplicates collapsed to the newest copy):

- Kiro Crew (built-in + imported) — 149 skills
- Shared agent skills (`~/.agents/skills`) — 44 skills
- Oh My Pi plugins (compound-engineering, context-engineering) — 33 skills
- Pi agent — 24 skills
- Claude Code (incl. gstack) — 14 skills
- Hermes agent — 14 skills
- OpenCode — 3 skills

Third-party skills keep their upstream `LICENSE` files where provided (e.g. [gstack](https://github.com/garrytan/gstack), [Kiro Crew](https://github.com/kirodotdev/KiroCrew), Anthropic skills). Binary assets, `node_modules` and files over 300 KB were not copied.

