// Pass 5 — decode scroll mechanics by sampling computed values vs scroll position.
// EDIT the selectors for whatever looked animated in the sweep, and the scroll range.
// Read the resulting table: scale/translate sequences ARE the implementation spec.
const samples = [];
const FROM = 0, TO = 4800, STEP = 400;

for (let y = FROM; y <= TO; y += STEP) {
  await tab.evaluate(yy => window.scrollTo({top: yy, behavior: 'instant'}), y);
  await new Promise(r => setTimeout(r, 350));
  const s = await tab.evaluate(() => {
    const pick = el => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        transform: cs.transform.slice(0, 60),
        clip: cs.clipPath.slice(0, 80),
        opacity: cs.opacity,
        radius: cs.borderRadius,
        top: Math.round(r.top), h: Math.round(r.height),
      };
    };
    // EDIT: target the animated elements found in passes 3-4
    const hero = document.querySelector('video[class*=will-change], [class*=clip-path]');
    const cards = [...document.querySelectorAll('[class*=rounded]')]
      .filter(el => el.getBoundingClientRect().height > 300).slice(0, 3).map(pick);
    return {y: scrollY, hero: pick(hero), cards};
  });
  samples.push(s);
}
display(samples);
// Interpretation guide (measured on lassie.ai):
//   scale 0.95 → 0.74 → 1.0 while translateY shrinks = depth-dip entrance
//   translateY jumping to -viewportHeight at exit    = sheet handoff (stack, not fade)
//   constant borderRadius through all transforms      = shape identity is pinned
