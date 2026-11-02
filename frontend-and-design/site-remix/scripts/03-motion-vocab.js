// Pass 3 — motion vocabulary + component details + media strategy.
const d = await tab.evaluate(() => {
  // Easings/keyframes/durations live in inline <style> tags (Tailwind v4, styled-jsx, etc.)
  const cssText = [...document.querySelectorAll('style')].map(s => s.textContent).join('\n');
  const beziers = [...new Set(cssText.match(/cubic-bezier\([^)]+\)/g) || [])].slice(0, 12);
  const keyframes = [...new Set(cssText.match(/@keyframes\s+([\w-]+)/g) || [])].slice(0, 20);
  const durations = [...new Set(cssText.match(/(?:transition|animation)[^;]*?(\d+(?:\.\d+)?m?s)/g) || [])].slice(0, 15);

  const pick = el => el ? (({backgroundColor, color, borderRadius, padding, boxShadow, transition}) =>
    ({bg: backgroundColor, color, radius: borderRadius, pad: padding, shadow: boxShadow.slice(0, 120), transition}))(getComputedStyle(el)) : null;
  const btn = pick(document.querySelector('a[class*=button], button'));
  const nav = document.querySelector('nav, header');
  const navS = nav ? pick(nav.querySelector('div') || nav) : null;

  // Signature-effect hints: will-change / contain / sticky
  const hinted = [...document.querySelectorAll('[class*="will-change"], [style*="will-change"]')].slice(0, 8)
    .map(el => ({tag: el.tagName, cls: (el.className || '').toString().slice(0, 140)}));
  const sticky = [...document.querySelectorAll('*')]
    .filter(el => getComputedStyle(el).position === 'sticky').slice(0, 12)
    .map(el => ({tag: el.tagName, cls: (el.className || '').toString().slice(0, 140)}));

  // Media strategy: autoplay? lazy by stage (empty currentSrc offscreen)?
  const videos = [...document.querySelectorAll('video')].map(v => ({
    src: (v.currentSrc || v.src || '').slice(0, 90),
    autoplay: v.autoplay, loop: v.loop, muted: v.muted,
    cls: (v.className || '').toString().slice(0, 100),
  }));
  return {beziers, keyframes, durations, btn, nav: navS, hinted, sticky, videos};
});
display(d);
