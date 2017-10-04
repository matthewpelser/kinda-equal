# kinda-equal

Equality checking for messy models


[![Build Status](https://travis-ci.org/matthewpelser/kinda-equal.svg?branch=master)](https://travis-ci.org/matthewpelser/kinda-equal)

## TL;DR

```javascript

import kindaEqual from 'kinda-equal';

// Default with default filters applied;
const defaultEqual = kindaEqual();

// No filters; standard deep equality object checker;
const noFilerEqual = kindaEqual({filters: []})

// Filters default with custom;
const customFilterEqual = kindaEqual({filters: [
        kindaEqual.ignoreEmptyArray,
        kindaEqual.ignoreEmptyNullUndefined,
        kindaEqual.ignoreEmptyObject,
        (value, key, index) => key.startsWith('$')
]})


let result1 = defaultEqual(obj1, obj2);
let result2 = noFilerEqual(obj1, obj2);
let result3 = customFilterEqual(obj1, obj2);

```

## About

Allows deep equality checks between 2 objects ignoring insignificant properties.

Properties are ignored for comparison if they match filter functions. 3 filter functions are applied by default (but can be overridden)

* ignoreEmptyNullUndefined
* ignoreEmptyArray
* ignoreEmptyObject

Collectively They remove all values that are ```null```, ```undefined```,```''```, ```[]```, ```{}```

The filters are applied in a depth first scan so:

```javascript

{
    id: 99,
    items: [{name: {log: [], prive: null}, {name: undefined}]
}

```
is equivelent to :

```javascript
{
    id: 99
}
```

filters are simple functions returning **true** if the property must be ignored.

They recieve 3 parameters ```value```, ```key```, ```index```


| Param        | Type           | |
| ------------- |-------------|------------- |
| value      | * | |
| key    | string     | |
| index | number     | Optional if value is Array |

### Example filters ###

```javascript

function compareFirstPersonFilter(value, key, index) {
    if (index !== undefined && key === 'people') {
        return index > 0;
    }
}

function ignoreAngular(value, key) {
    return key.startsWith('$');
}

```

which filters to apply is set in the config object, if supplied they override the default filters.

If you would like to apply any of the defaults with your filter you need to include them.

```javascript
{
    filters: []
}

```

## Installing

Install with: `npm install kinda-equal --save`

3 modules builds are provided

* index (commonjs)
* kinda-equal.es (es6)
* kinda-equal.umd (umd)

## Usage

### Comparing objects

```javascript

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

```

### Adding a custom ignore function to the default ignore functions

```javascript

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

```

## Dependencies

## Developer instructions
```
npm run test
npm run build
```

## License
MIT