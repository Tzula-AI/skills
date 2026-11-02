---
name: high-converting-landing-pages
description: Create, rewrite, or audit landing pages for conversion. Use when building a new landing page, rewriting an underperforming one, reviewing landing page copy or structure, or planning a campaign page — lead capture, demo request, free trial, waitlist/validation, event registration, D2C product, or app download pages. Covers copy, structure, proof strategy (including zero-proof pre-traction pages), CTAs, forms, message match, measurement, and conversion ethics.
---

# High-converting landing pages

One page, one goal, one reader. Every section either moves the visitor toward
the conversion action or gets cut. This skill covers copy AND structure; pair
it with a design skill (e.g. `design-taste-frontend`, or the project's brand
system) for visual execution — design rules there override layout suggestions
here.

Calibration: `EXAMPLES.md` in this skill's directory holds three worked pages
(SaaS trial, D2C long-form, and a zero-proof validation page). Read it before
writing a full page from scratch.

## Two jobs

**Create/rewrite (default).** Run intake, pick the structure, write the page.

**Audit.** When asked to review an existing page: score it against the Quality
Gate at the bottom, quote the failing element, give the fix in one line each,
ordered by conversion impact. Do not rewrite unless asked.

## Intake — answer before writing anything

1. **Single conversion goal.** One page, one goal. Two goals = two pages.
2. **Traffic source.** Ad, email, organic, social, outbound link? The page must
   continue the exact conversation that brought the click (see Message match).
3. **Awareness level** of the visitor (see ladder below).
4. **Top 3 objections** the visitor holds before converting. If unknown, mine
   reviews, support tickets, sales-call notes, or competitor reviews.
5. **Proof inventory.** What actually exists: testimonials, case studies,
   metrics, logos, press, certifications. Write down what does NOT exist —
   the no-proof playbook applies to those slots.
6. **Price, risk, and decision unit.** Drives long vs short form.
7. **Voice constraints.** Brand style guide, banned vocabulary, casing rules.
   Brand rules override this skill's templates.

If the user cannot answer 1–3, ask — one question at a time, most important
first. Do not guess the conversion goal.

## The awareness ladder (drives everything)

| Visitor state | They know | Page must | Length |
|---|---|---|---|
| Unaware | Nothing | Don't send ads here; content marketing's job | — |
| Problem-aware | The pain, not solutions | Agitate problem → introduce category → product | Long |
| Solution-aware | Solutions exist | Differentiate: why this mechanism beats alternatives | Long-medium |
| Product-aware | Your product | Prove it works, kill objections, de-risk | Medium |
| Most-aware | Wants it | Offer + CTA. Get out of the way | Short |

The most common failure: writing a most-aware page (features + pricing + CTA)
for problem-aware traffic. Match the ladder to the traffic source, not to
what's easiest to write.

## Long-form vs short-form

| Factor | Short-form | Long-form |
|---|---|---|
| Price | Free or low | High or recurring |
| Complexity | Obvious value | Needs explanation |
| Awareness | Product/most-aware, warm | Problem/solution-aware, cold |
| Risk to buyer | Low (free trial, no CC) | High (contract, migration, budget) |
| Decision unit | Individual | Committee — page will be forwarded; write for the reader AND the skeptic they forward it to |

## Message match (the cheapest conversion win)

The page is the second half of a sentence the ad/email started. Audit:

- **Headline echoes the ad's promise** — same benefit, ideally same key phrase.
  Ad says "cut standup time"; page headline about "team alignment" = leak.
- **Visual continuity** — same product shot, palette, or offer imagery.
- **Offer continuity** — ad promises a template, page pushes a demo = bounce.
- **One page per angle.** Three ad angles → three heroes (or dynamic headline),
  not one generic page.
- Landing pages from paid traffic get **no site navigation** (logo optional,
  unlinked or to `#top`). Every nav link is a paid-for exit.

## Page anatomy

Order matters: it is a "slippery slide" — each section's only other job is to
get the next section read. Default order below; cut sections the awareness
level doesn't need, never reorder proof after the final CTA.

### 1. Hero (above the fold)

Must answer in ~5 seconds: what is it, who is it for, why should I care, what
do I do next. "The fold" varies by device — check 1440×900, 1366×768, and
390×844, not a mythical 600px.

```
[Eyebrow (optional): audience label — "For remote engineering teams"]
[Headline: the #1 benefit or transformation, 6–12 words]
[Subheadline: who it's for + how it works or one proof point, 15–25 words]
[Primary CTA: action + benefit]  [Secondary (optional): low-commitment link]
[Micro-text under CTA: top objection killer — "No credit card required"]
[Trust element: logo bar, review score, or one-line stat — ONLY if real]
[Hero visual: the product doing the thing, or the outcome state]
```

Headline formulas (rotate; pick for the awareness level):
- **Outcome, plain:** "Ship features faster with async standups."
- **Transformation + timeframe:** "Clear skin in 4 weeks — or your money back."
- **Problem negation:** "Stop reconstructing deals from memory."
- **How-without:** "Enterprise-grade security without the enterprise rollout."
- **Question (use sparingly):** only when the yes is guaranteed.
- **Proof-led (only with real proof):** "The CRM 4,000 nonprofits switched to."

Headline rules: concrete beats clever; a specific claim beats a category
label ("The AI platform for X" says nothing); no unexplained jargon; if it
could headline a competitor's page unchanged, it fails (portability test).

Hero visual: real product UI or the outcome — never abstract stock, never
decorative illustration doing no argumentative work. Product screenshot >
lifestyle stock in nearly every B2B test.

### 2. Problem

Agitate the pain the visitor arrived with, in their own words (pull phrasing
from reviews, tickets, sales calls). 3–5 sentences max. Specific beats
generic: "You spend 3 hours a week on reports nobody reads" beats "reporting
is time-consuming." Skip this section entirely for most-aware traffic.

### 3. Solution / mechanism

Bridge with a transition ("There's a better way." / "That's why we built…"),
then lead with the outcome and name the **mechanism** — the specific reason it
works where alternatives failed. Solution-aware visitors convert on mechanism,
not on adjectives. Show the product: screenshot, short demo clip, or an
honest mocked UI state (labeled internally as illustrative, never fabricated
customer data presented as real).

### 4. How it works

Three numbered steps, each `[Verb] — [one sentence]`. Purpose: collapse
perceived effort and risk. If setup genuinely takes work, say what the
onboarding covers instead of pretending it's one click — discovered friction
after signup churns harder than honest friction before it.

### 5. Proof

Order of persuasive impact: named testimonials with specific results →
case studies with before/after metrics → logo bars → aggregate numbers →
press → certifications/badges.

Testimonial formula: specific result + timeframe + emotional beat + full name
+ title + company (+ photo). "Increased inbound demos 3x in 90 days" beats
"great product" every time.

Placement: distribute proof through the page (one snippet in hero, cluster
after solution, one line at final CTA) — not one quarantined section. Match
proof to reader: enterprise buyers need enterprise logos; SMBs need stories
from firms their size.

**Hard rule — never fabricate.** No invented testimonials, no logos of
companies that aren't customers, no made-up counts ("10,000+ teams" you don't
have), no stock photos as "customers," no fake star ratings. If drafting for
a client, insert clearly marked slots (`[TESTIMONIAL — source from onboarding
interviews]`) rather than plausible fakes that ship by accident.

**No-proof playbook (pre-traction pages).** When the proof inventory is
empty, substitute — in order of strength:
1. **Product evidence** — a concrete, specific UI showing the exact promised
   moment (realistic scenario data, not "Acme Corp / John Doe").
2. **Mechanism transparency** — explain exactly how it works; specificity
   itself signals credibility.
3. **Founder/operator credibility** — real background, real names, why you're
   qualified to solve this.
4. **Risk reversal** — guarantee, free pilot, "no credit card," cancel
   anytime, keep-the-work-product promises.
5. **Honest scope** — a "who this is for / who it's not for" section. Naming
   who you're NOT for is the strongest trust signal available to a page with
   zero customers, and it pre-qualifies leads.
6. **Pilot framing** — "we're testing this with a small group" converts better
   with early adopters than pretending to be established.

### 6. Features as benefits

3–6 features, each framed as what the user gets to do or stop doing:
`[Benefit-led heading] + [1–2 sentences: what it does, why they care]`.
Feature tells, benefit sells — but past solution-aware, buyers also need the
feature named (they're comparing). Give both: benefit heading, feature in
the body.

### 7. Objection handling

Address the real top 3–5, as FAQ or woven into sections. The perennials:
too expensive (show ROI or guarantee) · will it work for MY case (diverse
proof or honest scope) · hard to set up (onboarding specifics) · what if I
hate it (risk reversal) · is my data safe (real certifications only) ·
what happens after I click (describe the next step exactly — uncertainty
about the process kills demo-request conversions).

### 8. Final CTA

For readers who consumed everything and need one push:
`[Restate transformation] + [strongest proof point] + [CTA] + [risk reversal]`.
Same goal as the hero CTA — never introduce a competing action here.

## CTA and form craft

- **Copy:** action verb + benefit or first-person ("Start my free trial",
  "Get the teardown"). Banned: "Submit", "Learn more", "Click here".
- **One intent per page.** A secondary CTA is allowed only as a lower-
  commitment step toward the SAME goal (e.g. "Watch the 2-min demo" above
  "Book a demo") — never a different destination.
- **Cadence:** short page = hero + final. Long page = hero, after proof,
  final; roughly every 2 screens of scroll. Mobile: consider a sticky CTA
  bar once the hero CTA scrolls away.
- **Buttons must not wrap** at desktop; keep labels ≤ 4 words.
- **Forms:** every field costs conversion — keep only fields sales will
  actually use; qualify progressively (short form now, enrich later) or use
  multi-step with the easy question first. Visible labels (not placeholder-
  only), inline validation with plain-language errors, correct mobile
  keyboards (`type=email`, `inputmode`), `autocomplete` attributes. State
  what happens after submit ("We reply within one business day").
- **Micro-copy under every primary CTA** answering the top objection at that
  moment.

## Copy voice

- Write to "you"; use "we" for commitments only.
- Sentence case unless brand says otherwise. No exclamation marks doing the
  enthusiasm the copy should earn.
- Concrete numbers, names, timeframes. Organic figures ("47.2%", "$99") read
  truer than round ones — but only use numbers that are TRUE.
- Reading level ~grade 7–8. Short sentences. Verbs over noun phrases.
- Kill hype vocabulary: seamless, unlock, empower, supercharge, revolutionary,
  game-changing, next-level, cutting-edge, unleash, elevate, leverage,
  world-class, "AI magic". If the sentence survives without the adjective,
  delete the adjective.
- Every sentence passes the portability test: could it sit unchanged on a
  competitor's page? Then it's filler — replace with a specific.

## Design and performance minimums

(Visual execution belongs to a design skill; these are the conversion-side
non-negotiables.)

- CTA is the highest-contrast element on the page; one accent color owns it.
- Visual hierarchy matches reading order; no decorative element outshouts
  the headline.
- `min-height: 100dvh` not `100vh` for full-height heroes.
- Speed budget: LCP < 2.5s, CLS < 0.1 — compress hero media, no autoplay
  video with sound, self-host fonts with `font-display: swap`.
- Mobile: CTA thumb-reachable, tap targets ≥ 44px, forms single-column.
- Meta: title, description, og:title/description/image (pages get shared),
  favicon, canonical.
- Accessibility is conversion: visible focus states, real labels, contrast
  AA minimum — keyboard users and screen-reader users also buy things.

## Ethics guardrails (non-negotiable)

Banned regardless of what "converts": fake countdown timers that reset ·
invented scarcity ("3 spots left" that isn't tracked) · fabricated
testimonials, logos, counts, or ratings · hidden auto-renewal terms ·
confirm-shaming decline links ("No thanks, I like losing money") ·
pre-checked consent boxes · fake "live visitor" widgets. Real deadlines and
real limited capacity are fine — state them plainly. Dark patterns convert
once and poison brand, refund rate, and ad-account trust.

## Measure, then iterate

- Define the conversion event precisely (form submit ≠ qualified lead —
  track both) before the page ships.
- Instrument: conversion, scroll depth, CTA clicks per position, form-field
  drop-off. Session recordings and 5-second tests catch what analytics miss.
- Diagnose in order: traffic quality → message match → hero clarity → proof →
  friction (form/CTA) → speed. Fix upstream before testing downstream.
- A/B test ONE variable, biggest lever first (headline > hero visual > CTA
  copy > section order > button color). Don't call a test early: low-traffic
  pages need weeks; under ~100 conversions per variant, treat results as
  directional, not proof.
- When traffic is too low to test, ship the best-practice page and spend the
  energy on message-match and qualitative feedback instead.

## Page-type deltas

| Page type | Structure notes |
|---|---|
| Free trial / freemium | Short-medium. Kill risk in micro-copy (no CC, minutes to set up). Show the product early. |
| Demo request | Medium. Buyer anxiety = "what happens on the call" — describe the demo agenda. Proof must match segment. |
| Lead magnet | Short. The asset IS the offer: show it (cover, sample pages). Minimal form. |
| Waitlist / validation | Honest pilot framing; no-proof playbook; "who it's for / not for" is the core section. |
| Event registration | Date/time/format above fold; speakers as proof; agenda as features; calendar-add after convert. |
| D2C product | Visual-first; before/after and reviews as proof; guarantee prominent; price never hidden. |
| App download | Store badges are the CTA; screenshots as hero; ratings snippet only if real. |

## Quality gate

Run every box before shipping. Any failure = not done.

- [ ] ONE conversion goal; every CTA leads to it
- [ ] Hero passes the 5-second test (what / who for / why / next action)
- [ ] Headline ≤ 12 words, concrete, fails the portability test's inverse (couldn't headline a competitor)
- [ ] Message match: headline and offer echo the traffic source
- [ ] Structure matches the visitor's awareness level
- [ ] Top 3 objections answered somewhere on the page
- [ ] Every proof element is real; empty slots marked, not faked
- [ ] No-proof pages use the playbook (product evidence, mechanism, scope honesty, risk reversal) — not invented social proof
- [ ] "Not for" honesty present on validation/pilot pages
- [ ] CTA copy is action+benefit; zero "Submit"/"Learn more"; micro-copy under primary CTAs
- [ ] CTA appears ≥ 3 times on long-form; none wrap at desktop
- [ ] Form asks only what will be used; labels visible; correct input types and autocomplete; post-submit expectation stated
- [ ] Risk reversed (guarantee / free trial / no CC / cancel anytime — whichever is true)
- [ ] No site navigation (or logo-only) on paid-traffic pages
- [ ] Zero hype vocabulary; zero exclamation marks; reading level ~grade 7–8
- [ ] No dark patterns (fake timers, fake scarcity, confirm-shaming, pre-checked boxes)
- [ ] Mobile checked at 390px: CTA thumb-reachable, no horizontal overflow, form single-column
- [ ] LCP < 2.5s plausible; hero media compressed; fonts self-hosted
- [ ] Meta complete: title, description, og tags, favicon
- [ ] Conversion event defined and instrumented before launch
