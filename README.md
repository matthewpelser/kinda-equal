# kinda-equal

## About
A depth first model comparison utility for messy models.

## Installing
* Install with: `npm install kinda-equal --save`

## Usage

* Comparing objects

```

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

```

* Using custom ignore functions

```

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
        (value, key, index) => key.startsWith('$')
    ]
};

const result = kindaEqual(config).equalish(pure, dirty);

```

## Dependencies

## Developer instructions

## License
MIT