const assert = require('assert');
const kindaEqual = require('../dist/kinda-equal.umd');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Kinda', () => {
    it('run', function() {
        const o1 = {a: 1};
        const o2 = {a: 1};

        const result = kindaEqual.equalish(o1, o2);
        assert.equal(true, result);
    });
});