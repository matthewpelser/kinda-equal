const assert = require('assert');
const ke = require('../dist/kinda-equal.umd');
const kindaEqual = ke.kindaEqual;

describe('Examples', () => {
    it('Example 1', function () {

        const pure = {
            person: {
                first: 'Bob',
                phone: ['555-666', '444-333'],
            },
            transactions: [
                { id: 1, stamp: new Date(2017, 01, 01), log: {} }
            ]
        };

        const dirty = {
            person: {
                first: 'Bob',
                surname: undefined,
                phone: ['555-666', '444-333', null],
                address: {
                    street: null,
                    number: null
                }
            },
            transactions: [
                { id: 1, stamp: new Date(2017, 01, 01), log: {} },
                { log: {} }
            ]
        };

        const result = kindaEqual().equalish(pure, dirty);
        assert.equal(true, result);
    });

    it('Example 2', function () {
        const pure = {
            person: {
                first: 'Bob',
                phone: ['555-666', '444-333'],
            },
            transactions: [
                { id: 1, stamp: new Date(2017, 01, 01), log: {} }
            ]
        };

        const dirty = {
            person: {
                first: 'Bob',
                $idKey: 88,
                surname: undefined,
                phone: ['555-666', '444-333', null],
                address: {
                    street: null,
                    number: null
                }
            },
            transactions: [
                { id: 1, stamp: new Date(2017, 01, 01), log: {}, $someOtherId: 99 },
                { log: {} }
            ]
        };

        const config = {
            filters: [
                ke.ignoreEmptyArray,
                ke.ignoreEmptyNullUndefined,
                ke.ignoreEmptyObject,
                (value, key, index) => key.startsWith('$')
            ]
        };

        const result = kindaEqual(config).equalish(pure, dirty);
        assert.equal(true, result);
    });
});