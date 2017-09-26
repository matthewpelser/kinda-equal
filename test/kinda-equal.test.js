const assert = require('assert');
const kindaEqual = require('../dist/kinda-equal.umd');

describe('Simple object', () => {
  it('run', function () {
    const o1 = { a: 1, b: 'goo', c: null, d: undefined, e: [] };
    const o2 = { a: 1, b: 'goo', c: null, d: undefined, e: [] };

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(true, result);
  });
});

describe('Complex object', () => {
  it('run', function () {
    const d1 = new Date(2013, 1, 1);
    const d2 = new Date(2013, 1, 1);
    const o1 = { a: 1, b: null, c: 'goo', d: d1, e: undefined, i: [], f: { a1: { g: {} } } };
    const o2 = { a: 1, b: null, c: 'goo', d: d2, e: undefined, i: [], f: { a1: { g: {} } } };

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(true, result);
  });
});

describe('Simple array', () => {
  it('run', function () {
    const d1 = new Date(2013, 1, 1);
    const d2 = new Date(2013, 1, 1);
    const o1 = { a: ['boo', 'foo']};
    const o2 = { a: ['boo', 'foo']};

    const result = kindaEqual.equalish(o1, o2);
    assert.equal(true, result);
  });
});

describe('Complex object arrays', () => {
  it('run', function () {
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
});

describe('Complex object arrays', () => {
  it('run', function () {
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