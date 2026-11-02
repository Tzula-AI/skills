// Pass 1 — architecture: libs, :root tokens, type, fonts, section surfaces.
// Run as browser `run` code against the open reference tab.
const info = await tab.evaluate(() => {
  const libs = {
    gsap: !!window.gsap, ScrollTrigger: !!window.ScrollTrigger,
    lenis: !!(window.lenis || window.Lenis),
    framer: !!document.querySelector('[data-framer-name]'),
    next: !!window.__NEXT_DATA__ || !!document.getElementById('__next'),
  };
  // :root custom properties (works for same-origin / inline sheets)
  const props = {};
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if ((rule.selectorText || '').includes(':root') || rule.selectorText === 'html') {
          for (const p of rule.style) if (p.startsWith('--')) props[p] = rule.style.getPropertyValue(p).trim();
        }
      }
    } catch (e) { /* cross-origin sheet: resolve via pass 2 instead */ }
  }
  const body = getComputedStyle(document.body);
  const pick = el => el ? (({fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, color}) =>
    ({fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, color}))(getComputedStyle(el)) : null;
  const h1 = document.querySelector('h1'), h2 = document.querySelector('h2'), h3 = document.querySelector('h3');
  const sections = [...document.querySelectorAll('section, main > div, footer, header')].slice(0, 40)
    .map(el => {
      const cs = getComputedStyle(el);
      return {tag: el.tagName, cls: (el.className || '').toString().slice(0, 120), bg: cs.backgroundColor, radius: cs.borderRadius};
    }).filter(s => s.bg && s.bg !== 'rgba(0, 0, 0, 0)');
  const fonts = [...new Set([...document.fonts].map(f => f.family + ' ' + f.weight))];
  return {
    libs, props, bodyBg: body.backgroundColor, bodyFont: body.fontFamily, bodyColor: body.color,
    h1: pick(h1), h2: pick(h2), h3: pick(h3), h1Text: h1?.textContent?.trim(), fonts, sections,
    docHeight: document.documentElement.scrollHeight, viewport: {w: innerWidth, h: innerHeight},
  };
});
display(info);
