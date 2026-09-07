/* Pure estimate calculation, shared by the page and Node.js regression tests. */
(function (root) {
  'use strict';
  const presets = {
      landing: { label: "Launch page", base: 8500, pages: 1, days: 7, perPage: 900 },
      business: { label: "Business site", base: 14500, pages: 5, days: 14, perPage: 900 },
      store: { label: "Online store", base: 22000, pages: 8, days: 21, perPage: 1100 },
      portal: { label: "Custom portal", base: 28500, pages: 10, days: 28, perPage: 1400 }
    };
  function estimate({ preset: key = 'business', pages, features = [], design = 1, timeline = 1, content = 1 } = {}) {
    if (!Object.hasOwn(presets, key)) throw new RangeError('Unknown project preset');
    const preset = presets[key];
    const count = pages === undefined ? preset.pages : Number(pages);
    if (!Number.isInteger(count) || count < 1 || count > 30) throw new RangeError('Pages must be an integer from 1 to 30');
    const modifiers = [Number(design), Number(timeline), Number(content)];
    if (!modifiers.every(value => Number.isFinite(value) && value > 0)) throw new RangeError('Multipliers must be positive and finite');
    const breakdown = [[preset.label + ' base', preset.base]];
    const extraCost = Math.max(0, count - preset.pages) * preset.perPage;
    if (extraCost) breakdown.push(['Extra pages', extraCost]);
    for (const feature of features) {
      if (!Number.isFinite(feature.price) || feature.price < 0) throw new RangeError('Feature prices must be non-negative and finite');
      breakdown.push([feature.label, feature.price]);
    }
    const subtotal = breakdown.reduce((sum, row) => sum + row[1], 0);
    const total = Math.round(subtotal * modifiers[0] * modifiers[1] * modifiers[2] / 100) * 100;
    if (!Number.isSafeInteger(total)) throw new RangeError('Estimate exceeds the supported range');
    const low = Math.round(total * .9 / 100) * 100;
    const high = Math.round(total * 1.18 / 100) * 100;
    const timelineDays = Math.max(5, Math.round((preset.days + count * .8 + features.length * 1.8) * (modifiers[1] === 1.18 ? .78 : modifiers[1] === .92 ? 1.18 : 1)));
    const scopeScore = count + features.length * 2 + (modifiers[0] > 1 ? 3 : 0);
    const adjustment = total - subtotal;
    if (adjustment) breakdown.push(['Design, timing & content adjustments', adjustment]);
    return { total, low, high, timelineDays, scopeScore, scopeLabel: scopeScore > 18 ? 'Advanced' : scopeScore > 10 ? 'Growth' : 'Lean', breakdown, preset };
  }
  const api = { presets, estimate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Websites4UEstimator = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
