const { test } = require('node:test');
const assert = require('node:assert/strict');
const { estimate, presets } = require('../scripts/estimator.js');

test('default estimate keeps the business base and includes selected features', () => {
  assert.equal(estimate().total, 14500);
  assert.equal(estimate({ features: [{ label: 'SEO', price: 5000 }, { label: 'Messages', price: 3500 }] }).total, 23000);
});
test('every displayed line item sums to the final price after modifiers', () => {
  for (const preset of Object.keys(presets)) {
    const result = estimate({ preset, pages: 20, design: 1.18, timeline: .92, content: .95, features: [{ label: 'CMS', price: 6500 }] });
    assert.equal(result.breakdown.reduce((sum, row) => sum + row[1], 0), result.total);
    assert.ok(result.low <= result.total && result.total <= result.high);
  }
});
test('rush costs more and delivers earlier than flexible timing', () => {
  const rush = estimate({ timeline: 1.18 });
  const flexible = estimate({ timeline: .92 });
  assert.ok(rush.total > flexible.total);
  assert.ok(rush.timelineDays < flexible.timelineDays);
});
test('invalid scope cannot produce NaN or misleading negative prices', () => {
  for (const pages of [0, -1, 1.5, 31, NaN, Infinity]) assert.throws(() => estimate({ pages }), RangeError);
  assert.throws(() => estimate({ preset: 'toString' }), RangeError);
  assert.throws(() => estimate({ design: 0 }), RangeError);
  assert.throws(() => estimate({ features: [{ label: 'bad', price: -1 }] }), RangeError);
});
