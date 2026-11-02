// Pass 4 — screenshot the full scroll journey.
// EDIT `dir`. Stops default to ~1 viewport apart across the measured docHeight.
// Also reusable for QA of the built page (pageerror collection included).
const fs = require('fs');
const dir = '/ABSOLUTE/PATH/TO/inspiration/<site>/shots';
fs.mkdirSync(dir, {recursive: true});

const errors = [];
page.on('pageerror', e => errors.push(String(e)));

const h = await tab.evaluate(() => document.documentElement.scrollHeight);
const step = 900; // ~1 viewport at 1440x900
const stops = [];
for (let y = 0; y < h - 400; y += step) stops.push(y);

const saved = [];
for (const y of stops) {
  // 'instant' works even under smooth-scroll engines (Lenis syncs to native position)
  await tab.evaluate(yy => window.scrollTo({top: yy, behavior: 'instant'}), y);
  await new Promise(r => setTimeout(r, 1200)); // let entrance animations settle
  const p = await tab.screenshot({silent: true}); // returns temp path — copy it
  const dest = `${dir}/scroll-${String(y).padStart(5, '0')}.png`;
  fs.copyFileSync(p, dest);
  saved.push(dest);
}
display({shots: saved.length, dir, docHeight: h, errors});
