---
name: site-remix
description: Tear down any reference website into a documented design system, then remix that system into a new page. Use when asked to "copy this site's design", "extract the design system from a URL", "make a page that looks/feels like X", "steal the scroll effects from X", "teardown", "clone the look", or to build a themed page from a reference. Drives a real browser to measure tokens, type, motion, and scroll mechanics instead of guessing from screenshots.
---

# Site remix

Turn a live reference site into (1) a measured, documented design system and (2) a new page
built on that system. Never eyeball what you can measure: computed styles, resolved CSS
variables, and scroll-sampled transforms are the source of truth.

Proven end-to-end on lassie.ai → `gradien/brand-guidelines/inspiration/lassie/` +
`landing/pe-first-look/`. The scripts in `scripts/` are the exact extraction passes from
that run.

## Phase 0 — Load the agent browser (always first)

All measurement happens in a real Chromium tab. Load it before anything else:

- **Oh My Pi harness:** the browser is the `xd://browser` device. Read `xd://browser` for
  the schema, then open a named tab:
  ```json
  {"action":"open","url":"<SITE URL>","name":"ref","viewport":{"width":1440,"height":900},"wait_until":"networkidle2","timeout":60}
  ```
  Subsequent passes are `{"action":"run","name":"ref","code":"<js>"}`. `run` code has full
  Node access plus `tab`, `page`, `wait`, `display`. Tabs survive calls — open once, reuse.
- **Other harnesses:** read `skill://agent-browser` and use the agent-browser CLI
  (`agent-browser open <url>`, `agent-browser eval <js>`, `agent-browser screenshot`).

Also do a plain `read <url>` first — reader-mode gives you the content outline, headings,
copy voice, and meta description for free before you spend browser calls.

## Phase 1 — Measure the reference (4 passes)

Run each script in `scripts/` via the browser `run` action (paste the file body as `code`).
Each prints a compact JSON of findings; nothing else enters context.

1. `scripts/01-detect-stack.js` — animation libs (gsap/ScrollTrigger/Lenis/Framer/Next),
   `:root` custom properties, body/h1/h2 computed type, loaded fonts, section backgrounds,
   doc height. This tells you the *architecture* of the theme.
2. `scripts/02-resolve-colors.js` — resolves the primitive palette. Edit the `names` array
   to the var names discovered in pass 1. Cross-origin stylesheets block `cssRules`, but
   `getComputedStyle(documentElement).getPropertyValue()` always resolves.
3. `scripts/03-motion-vocab.js` — cubic-beziers, keyframe names, durations from inline
   `<style>` tags; button/nav/pill computed styles; video usage (autoplay/loop/lazy);
   sticky containers. Look for `will-change` and `[contain:...]` classes — they name the
   signature effects.
4. `scripts/04-screenshot-sweep.js` — full-page journey: scroll in ~900px stops, settle
   1200ms per stop (smooth-scroll engines + entrance animations need it), screenshot each,
   `fs.copyFileSync` into `<out>/shots/`. Then `read` the key frames as images.

**Then decode the mechanics** with `scripts/05-scroll-instrument.js`: pick the elements that
looked animated in the sweep, sample their computed `transform` / `clip-path` / `opacity`
every 300–400px of scroll, and read the numbers. A scale sequence like
`0.95 → 0.74 → 1.0` with translateY tells you exactly what to rebuild. This pass is what
separates a real remix from a vibe-alike.

**Then run the fine-grain audit** — the pass that catches everything CSS extraction misses.
Screenshots and computed styles will NOT show tween-driven detail; you must watch the DOM:
1. Dump `h1.innerHTML` and sample `[class*=line], [class*=char], [class*=word]` — split-text
   wrappers (per-word/per-line divs with inline transforms) mean staggered tweened reveals,
   not CSS class flips.
2. List elements with inline `style*="transform"`/`opacity`/`clip` — every one is a
   JS-animated actor (headers that ease in, hero content that fades OUT on scroll, veil
   overlays, custom scrollbars).
3. Attach a `MutationObserver` (`attributeFilter: ['class','style']`) to `body`, scroll
   through the page, dedupe the log. This reveals: state classes (`is-*`, `active`,
   `lenis-scrolling`), nav backdrop fades, scroll-progress indicators, and per-element
   tween traces (opacity/translate sequences with per-element stagger).
Write results to a temp FILE from inside the browser (`fs.writeFileSync`) — heavy pages can
kill the run's return channel; artifacts survive.

Reproduce this layer in the remix (word-split hero intro, staggered child reveals, hero
scroll-exit fade, nav backdrop toggle, idle-hiding scrollbar) — omitting it is the
difference between a clone that feels alive and one that feels like a screenshot.
When the reference hides the native scrollbar (check `innerWidth === clientWidth` and
`--scrollbar` vars), suppress it JS-gated (`html.js { scrollbar-width: none }` +
`::-webkit-scrollbar { display: none }`) with a proportional custom thumb
(`height = viewport/docHeight × track`); no-JS and reduced-motion keep the browser default.

Gotchas learned the hard way:
- Smooth-scroll libs (Lenis) hijack scrolling — use
  `window.scrollTo({top: y, behavior: 'instant'})`; it syncs.
- `tab.screenshot()` returns a temp path and never accepts one — copy it where you want it.
- Videos outside the viewport often have empty `currentSrc` (lazy by stage) — that itself is
  a finding worth documenting.
- Cross-origin `<link>` stylesheets throw on `cssRules`; inline `<style>` tags don't.

## Phase 2 — Document the system

Write three files under `inspiration/<site>/` (or the project's reference dir), using
`templates/DESIGN.md` and `templates/MOTION.md` as skeletons:

- `DESIGN.md` — primitives table (hex), semantic token layer, type system (faces, jobs,
  observed sizes/weights/tracking), spacing/grid scale, radii & elevation, component
  inventory, imagery direction, and a closing **"transferable principles"** list — what to
  steal, not copy.
- `MOTION.md` — stack (which engine, which properties animate), easing/duration vocabulary,
  each named effect with its **measured** curve, and reuse rules.
- `README.md` — index: what each doc holds, key screenshot frames by name, and a line
  stating this is inspiration, not a template.

Every number in the docs must come from a measurement. Mark anything inferred (e.g. an
effect prepared in the DOM but not observed changing) as `[INFERENCE]`.

## Phase 3 — Remix into a new page

Build the new page as a **self-contained namespace** (own prefix, own CSS files), not by
editing the host project's core kit — reference themes usually conflict with house rules.
Note the divergence in the CSS header comment.

Rules that made the last remix work:
- **Zero dependencies.** No Lenis/GSAP installs. Hand-roll scroll-linked motion:
  one `scroll` listener → `requestAnimationFrame` → write `transform`/`clip-path` only.
  Sticky stage = `position: sticky; height: 100svh` inside a tall wrapper
  (`height: N * 130vh`).
- **Reproduce measured curves.** e.g. sheet handoff: entrance progress `e ∈ [0,1]`,
  `translateY = (1-e) * 105vh`, scale dip `1 - 0.25 * sin(π·e)`, incoming card overlaps
  outgoing (translate = one viewport). Hero clip reveal:
  `clip-path: inset(p·24px round p·64px)` with `p = scrollY / (0.9·vh)`.
- **Local assets only.** Substitute commercial fonts with the closest local/system stack
  (serif display → Georgia stack); reuse the project's licensed imagery for ambient media.
- **Progressive enhancement.** Page complete without JS (`html.js` gates all layout
  changes); `prefers-reduced-motion` gets settled final states (remove the `js` class,
  skip listeners).
- **House constraints still apply** — file-size limits (≤200 lines/file: split theme /
  components / sections CSS), copy voice rules, form conventions. Copy states the
  mechanism, not invented claims: no fabricated metrics, pricing, or testimonials. Demo
  data lives only in obviously-illustrative UI cards.

### The unified body (what makes it feel expensive)

A remix that reads as stacked block sections fails even with perfect tokens. The page must
feel like ONE continuous world you travel through. Reference implementation:
`gradien/messaging-house/pe-first-look/topology/` (`surface.js` + `motion.js`).

1. **One persistent background world.** A single `position: fixed; inset: 0; z-index: 0`
   canvas (or media layer) behind the entire page, re-rendered every frame. Content
   sections are `position: relative; z-index: 1` and **transparent** — they float over the
   world instead of replacing it.
2. **Scroll-state interpolation.** Define palette/camera keystates (e.g. hero-light →
   editorial-dark → close-light) and lerp between them from scroll-derived progress inside
   the render loop (`state()` reads `scrollY` each frame — no scroll listener needed).
   Drift the camera (yaw/scale/peak positions) across full-page progress so the end of the
   page shows a different view of the same world: you traveled, you didn't flip slides.
3. **Soft seams, never hard cuts.** Opaque section backgrounds become tall gradient fades
   (`linear-gradient(to bottom, transparent, rgba(bg, .97) 16vh, … calc(100% - 22vh),
   transparent)`). The world shows through every seam. Verify text only sits where the
   overlay is ≥ ~.95 opaque — content padding must clear the fade zones.
4. **Depth parallax.** `data-px="<factor>"` on content wrappers; rAF loop translates each
   by `(viewportCenter − elementCenter) × factor` (positive = distant/slower). Cache
   untransformed centers on init/resize to avoid feedback loops. Keep factors subtle
   (0.04–0.2); hero copy gets the largest.
   - NEVER put the transform on a `reveal` element (transition conflict) or on an ancestor
     of anything `position: sticky`/`fixed` (transforms change their containing block).
5. **The field YIELDS to copy (big-smell check).** A generative background must never
   compete with display text. Reserve cleared zones behind every text block that sits on
   the world: scroll-aware ground fog (radial gradient of the CURRENT bg color, alpha
   ~0.6–0.8, anchored to the copy zone, faded in/out by the same scroll state that moves
   the palette), reduced field density under text, or both. QA every text-over-world
   state at every palette keystate — "legible but fighting the mesh" is a FAIL, not a pass.
6. **Immersion, not a plot.** If the world is a 3D field, the viewer must be INSIDE it:
   overfill the domain so no mesh edge is visible at any camera state (check the rotated
   inradius covers the viewport diagonal), fill the surface (height-binned quad fills),
   grade line weight/alpha by screen depth (near heavy, far light), and add an
   atmospheric haze gradient so the far field recedes. A bounded wireframe floating on
   flat background reads as a chart, not a place.
7. **Perf budget.** Full-viewport canvas worlds: cap `deviceScaleFactor` (~1.25), bin
   per-color geometry into `Path2D` buckets (12 strokes, not thousands), run ambient
   animation at half rate and full rate only while scrolling. Measure with a 1s rAF
   counter in headless — treat headless software-raster fps ×2 as the hardware estimate;
   below ~25 headless, cut grid density first.
8. **Fallbacks stay sectioned.** No-JS and reduced-motion get opaque section backgrounds
   and a hidden world (`html:not(.js) .world { display: none }`; reduced motion removes
   the `js` class). A settled, sectioned page is the correct degraded state.


## Phase 4 — Verify side by side against the reference

Never ship unseen, and never judge the build in isolation: the acceptance test is the
build NEXT TO the reference at the same scroll progress.

1. **Solo QA first.** Open the built page (`file://` works). Collect `pageerror` events
   while running a screenshot sweep into `qa/` (04 script pattern plus
   `page.on('pageerror', e => errors.push(String(e)))`). Zero errors is the bar.
2. **Side-by-side comparison loop** — `scripts/06-compare-side-by-side.js`:
   - Keep BOTH tabs open: reference (`ref`) and build (`build`).
   - The script scrolls both to the same normalized progress stops (0..1 of scrollable
     height), screenshots each into `qa/compare/p<NNN>-ref.png` / `p<NNN>-build.png`,
     and samples the animated elements' computed transform/clip/opacity/radius on both.
   - `read` each ref/build screenshot PAIR in one call and judge like a reviewer:
     same mechanic, same rhythm, same surface temperature, same restraint?
   - Compare the numeric rows: curves must match in SHAPE — dip depth, handoff distance
     (one viewport?), radius constancy, easing feel — not exact pixels. The reference has
     different content; the mechanics are what you cloned.
3. **Make the adjustments.** Write down every mismatch as a concrete fix (e.g. "dip
   bottoms at 0.85, reference hits 0.74 — deepen the sin coefficient"; "caption fades at
   the wrong stop"; "surface too cool — swap art"). Apply, then re-run step 2 for the
   affected stops only. Repeat until the pairs read as the same system.
4. **Reduced-motion smoke:**
   `page.emulateMediaFeatures([{name:'prefers-reduced-motion', value:'reduce'}])`,
   reload, screenshot — layout must be complete and static.
5. Close both tabs.

Typical mismatches found this way: overlays clipped at common viewports (reference
assumed ultra-wide), art with the wrong palette temperature, low-contrast text over busy
media, dips too shallow, missing "deck peek" (next sheet should show a strip before its
turn), handoffs that fade instead of stack, panel proportions wider than the reference's.

Comparison-loop gotchas:
- Normalize viewports before comparing: `page.setViewport({width, height,
  deviceScaleFactor: 1})` on both tabs — a stray scale factor breaks visual judgment.
- Locate the reference's animated range by MEASURED absolute scroll bounds (pass 5), not
  by DOM heuristics — sticky-container guessing returns wrong elements on real sites.
- Media-query overrides lose to higher-specificity base rules (`html.js .x` beats
  `.x--variant`); if a fix "didn't apply", check specificity before blaming the cascade.

## Output contract

- `inspiration/<site>/{README,DESIGN,MOTION}.md` + `shots/`
- New page in its own directory, each file ≤200 lines, zero new dependencies
- `qa/` solo sweep + `qa/compare/` ref/build pairs proving the mechanics match,
  zero JS errors, reduced-motion fallback shot
- Final summary names what was measured vs `[INFERENCE]`, mismatches found and fixed in
  the comparison loop, and any wiring left (e.g. form endpoints)
