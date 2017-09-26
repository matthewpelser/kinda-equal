const assert = require('assert');
const kindaEqual = require('../dist/kinda-equal.umd');

describe('Simple object', () => {
  it('Basic match', function () {
    const o1 = { a: 1, b: 'goo', c: null, d: undefined, e: [] };
    const o2 = { a: 1, b: 'goo', c: null, d: undefined, e: [] };

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(true, result);
  });
  it('Basic mismatch', function () {
    const o1 = { a: 1, b: 'foo', c: null, d: undefined, e: [] };
    const o2 = { a: 1, b: 'goo', c: null, d: undefined, e: [] };

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(false, result);
  });
  it('Basic match missing', function () {
    const o1 = { a: 1, b: 'foo', c: null, e: [] };
    const o2 = { a: 1, b: 'goo', d: undefined, e: [] };

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(false, result);
  });
});

describe('Complex object', () => {
  it('Basic match', function () {
    const d1 = new Date(2013, 1, 1);
    const d2 = new Date(2013, 1, 1);
    const o1 = { a: 1, b: null, c: 'goo', d: d1, e: undefined, i: [], f: { a1: { g: {} } } };
    const o2 = { a: 1, b: null, c: 'goo', d: d2, e: undefined, i: [], f: { a1: { g: {} } } };

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(true, result);
  });
});

describe('Simple array', () => {
  it('Basic match', function () {
    const d1 = new Date(2013, 1, 1);
    const d2 = new Date(2013, 1, 1);
    const o1 = { a: ['boo', 'foo', d1]};
    const o2 = { a: ['boo', 'foo', d2]};

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(true, result);
  });
  it('Basic mismatch', function () {
    const d1 = new Date(2013, 1, 1);
    const d2 = new Date(2013, 1, 1);
    const o1 = { a: ['boo', 'foo', d1, 'hoo']};
    const o2 = { a: ['boo', 'foo', d2]};

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(false, result);
  });
});

describe('Complex object with arrays', () => {
  it('Correctly matches', function () {
    const d1 = new Date(2013, 1, 1);
    const d2 = new Date(2013, 1, 1);
    const o1 = { a: 1, b: null, c: 'goo', d: d1, e: undefined, f: { a1: { g: [
      {a: 1}, {b: 'f'}
    ] } } };
    const o2 = { a: 1, b: null, c: 'goo', d: d2, e: undefined, f: { a1: { g: [
      {a: 1}, {b: 'f'}
    ] } } };

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(true, result);
  });
  it('Correctly identifies mismatches', function () {
    const d1 = new Date(2013, 1, 1);
    const d2 = new Date(2013, 1, 1);
    const o1 = { a: 1, b: null, c: 'goo', d: d1, e: undefined, f: { a1: { g: [
      {a: 1}, {b:'f'}, {c: [{a: 1}]}
    ] } } };
    const o2 = { a: 1, b: null, c: 'goo', d: d2, e: undefined, f: { a1: { g: [
      {a: 1}, {b:'f'}, {c: []}
    ] } } };

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(false, result);
  });
});