const assert = require('assert');
const noFiltersEqual = require('../dist/index')({filters: []});

describe('ApplyCompare', () => {
  it('Object RegEx', function () {
    const o1 = { a: /foo/ };
    const o2 = { a: /foo/ };

    const result = noFiltersEqual(o1, o2);
    assert.equal(true, result);
  });
  it('Mismatch undefined keys', function () {
    const o1 = { a: undefined };
    const o2 = { b: undefined };

    const result = noFiltersEqual(o1, o2);
    assert.equal(false, result);
  });
});