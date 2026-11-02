// Pass 2 — resolve primitive color values.
// EDIT `names`: strip the `--color-` (or site-specific) prefix from vars found in pass 1.
// getComputedStyle always resolves, even when cross-origin sheets block cssRules.
const vals = await tab.evaluate(() => {
  const prefix = '--color-'; // adjust to the site's convention (--c-, --tw-, --colors-...)
  const names = [
    'stone-100', 'stone-200', 'white', 'black-800', 'black-1000',
    'grey-600', 'blue-500', 'blue-600', 'green-700', 'red-700',
  ];
  const cs = getComputedStyle(document.documentElement);
  const out = {};
  for (const n of names) {
    const v = cs.getPropertyValue(prefix + n).trim();
    if (v) out[n] = v;
  }
  return out;
});
display(vals);
