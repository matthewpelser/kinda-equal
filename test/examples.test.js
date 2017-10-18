const assert = require('assert');
const kindaEqual = require('../dist/index');

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

        const result = kindaEqual()(pure, dirty);
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
                kindaEqual.ignoreEmptyArray,
                kindaEqual.ignoreEmptyNullUndefined,
                kindaEqual.ignoreEmptyObject,
                (value, key, index) => key.startsWith('$')
            ]
        };

        const customEqual = kindaEqual(config);
        const result = customEqual(pure, dirty);
        assert.equal(true, result);
    });

    it('Example 3', function () {
        const bob_record_1 = {
            person: {
                first: 'Bob',
                contact: {
                    phone: ['555-666', '444-333']
                }
            }
        };

        const bob_record_2 = {
            person: {
                first: 'Bob',
                contact: {
                    phone: ['555-666', '699-333']
                }
            }
        };

        const config = {
            filters: [
                kindaEqual.ignoreEmptyArray,
                kindaEqual.ignoreEmptyNullUndefined,
                kindaEqual.ignoreEmptyObject,
                (value, key, index, path) => path.startsWith('person.contact.phone') && index > 0
            ]
        };

        const customEqual = kindaEqual(config);
        const result = customEqual(bob_record_1, bob_record_2);
        assert.equal(true, result);
    });    
});