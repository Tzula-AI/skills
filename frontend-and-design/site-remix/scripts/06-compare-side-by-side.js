// Pass 6 — VERIFY: reference and build, side by side, at equivalent scroll progress.
// Requires two open tabs: the reference site and the built page. Run from either tab's
// `run` action — `browser` gives access to both puppeteer pages.
//
// Output: paired screenshots at the same normalized progress (0..1 of scrollable height)
// plus a numeric table of the animated elements' transforms at each stop.
// EDIT: OUT dir, URL fragments, REF_SEL / BUILD_SEL (animated elements from pass 5).
const fs = require('fs');
const OUT = '/ABSOLUTE/PATH/TO/<newpage>/qa/compare';
const PROGRESS = [0, 0.12, 0.25, 0.38, 0.5, 0.65, 0.8, 1];
const REF_SEL = '[class*=rounded]';   // reference's animated card/panel
const BUILD_SEL = '[data-panel]';     // build's equivalent
fs.mkdirSync(OUT, {recursive: true});

const pages = await browser.pages();
const ref = pages.find(p => p.url().includes('https://'));   // EDIT: reference URL fragment
const build = pages.find(p => p.url().includes('file://'));  // EDIT: build URL fragment

async function scrollTo(pg, prog) {
  await pg.evaluate(pr => {
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo({top: max * pr, behavior: 'instant'});
  }, prog);
}

async function sample(pg, sel) {
  return pg.evaluate(s => {
    const el = [...document.querySelectorAll(s)].find(e => e.getBoundingClientRect().height > 200);
    const cs = el ? getComputedStyle(el) : null;
    return cs ? {
      transform: cs.transform.slice(0, 60),
      clip: cs.clipPath.slice(0, 60),
      opacity: cs.opacity,
      radius: cs.borderRadius,
    } : null;
  }, sel);
}

const rows = [];
for (const pr of PROGRESS) {
  const tag = String(Math.round(pr * 100)).padStart(3, '0');
  await scrollTo(ref, pr);
  await scrollTo(build, pr);
  await new Promise(r => setTimeout(r, 900)); // settle both
  await ref.screenshot({path: `${OUT}/p${tag}-ref.png`});
  await build.screenshot({path: `${OUT}/p${tag}-build.png`});
  rows.push({progress: pr, ref: await sample(ref, REF_SEL), build: await sample(build, BUILD_SEL)});
}
display(rows);
// Next step (the agent, not this script): `read` each p*-ref.png / p*-build.png PAIR in
// one call and judge: same mechanic? same rhythm? same surface temperature? Then compare
// the numeric rows — transform curves should match in SHAPE (dip depth, handoff distance,
// radius constancy), not exact pixels. List every mismatch, fix the build, re-run.
