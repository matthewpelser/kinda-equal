const assert = require('assert');
const kindaEqual = require('../dist/index');

describe('Custom filters', () => {
    it('Applies filters', function () {
      const o1 = { a: 1, d: {'$var1': 2}, c: [{}, {}, {a: 5}]};
      const o2 = { a: 1, c: [{a: 5}, {b: { c: {'$var2': 2}}}]};
  
      const config = {filters: [
        kindaEqual.ignoreEmptyArray,
        kindaEqual.ignoreEmptyNullUndefined,
        kindaEqual.ignoreEmptyObject,
        (value, key, index) => key.startsWith('$')
      ]};
  
      const customEqual = kindaEqual(config);
      const result = customEqual(o1, o2);
      assert.equal(true, result);
    });
    it('Applies filters with path', function () {
      const o1 = { a: 1, d: {'$var1': 2}, c: [{}, {}, {a: 5}]};
      const o2 = { a: 1, c: [{a: 5}, {b: { c: {'$var2': 2}}}]};
  
      const config = {filters: [
        kindaEqual.ignoreEmptyArray,
        kindaEqual.ignoreEmptyNullUndefined,
        kindaEqual.ignoreEmptyObject,
        (value, key, index, path) => {
            return path === 'd.$var1' || path === 'c[1].b.c.$var2';
        }
      ]};
  
      const customEqual = kindaEqual(config);
      const result = customEqual(o1, o2);
      assert.equal(true, result);
    });
    it('Equal without filters', function () {
      const d1 = new Date(2013, 1, 1);
      const d2 = new Date(2013, 1, 1);
      const o1 = { a: 1, d: d1, c: {a: ['x']}};
      const o2 = { a: 1, d: d2, c: {a: ['x']}};
  
      const config = {filters: []};
  
      const customEqual = kindaEqual(config);
      const result = customEqual(o1, o2);
      assert.equal(true, result);
    });
    
    it('Applies index filters', function () {
      const d1 = new Date(2013, 1, 1);
      const d2 = new Date(2013, 1, 1);
      const o1 = { a: 1, d: d1, c: {a: ['x', 'y', 'z']}};
      const o2 = { a: 1, d: d2, c: {a: ['x', 'g', 'h']}};
  
      const config = {filters: [
        kindaEqual.ignoreEmptyArray,
        kindaEqual.ignoreEmptyNullUndefined,
        kindaEqual.ignoreEmptyObject,
        (value, key, index, path) => {
            return path.startsWith('c.a') && index > 0;
        }
      ]};
  
      const customEqual = kindaEqual(config);
      const result = customEqual(o1, o2);
      assert.equal(true, result);
    });
  });