
const ignore = [
    ignoreEmptyArray,
    ignoreEmptyNullUndefined,
    ignoreEmptyObject
];

export function kindaEqual(config) {

    if (config && config.filters && isArray(config.filters)) {
        config.filters.forEach((f) => {
            ignore.push(f);
        });
    }

    return {
        equalish: (o1, o2) => {
            let jo1 = clone(o1);
            let jo2 = clone(o2);
        
            applyFilters(jo1);
            applyFilters(jo2);
        
            return applyCompare(jo1, jo2, '.');
        }
    };
}

export function ignoreEmptyNullUndefined(value) {
   return (value === '' || value === null || value === undefined);
}

export function ignoreEmptyArray(value) {
    return (isArray(value) && value.length === 0);
}

export function ignoreEmptyObject(value) {
    return (
        value !== null && 
        typeof value === 'object' && 
        value.constructor === Object && 
        Object.keys(value).length === 0
    );
}

function clone(o) {
    return JSON.parse(JSON.stringify(o));
}

function applyFilters(o, k, oi) {

    if (isArray(o)) {
        const ignoreItems = [];
        o.forEach((item, i) => {

            applyFilters(item, k, i);

            if(ignoreValue(item, k, i)) {
                ignoreItems.push(i);
            }
        });
        deleteItems(o, ignoreItems);
    }

    if (isPlainObject(o)) {
        const ignoreKeys = [];
        Object.keys(o).forEach((key) => {
            const value = o[key];
            
            applyFilters(value, key);
            
            if(ignoreValue(value, key)){
                ignoreKeys.push(key);
            }
        });
        deleteKeys(o, ignoreKeys);
    }
}

function applyCompare(o1, o2, key) {
    if (isArray(o1) && isArray(o2)) {
        if (o1.length === o2.length) {
            return o1.every((vi1, i) => {
                return applyCompare(vi1, o2[i], key);
            });
        } else {
            return false;
        }
    }

    if (isPlainObject(o1)) {
        if (isPlainObject(o2) && 
            (Object.keys(o1).length === Object.keys(o2).length)) {
                return Object.keys(o1).every((ckey) => {
                    const v1 = o1[ckey];
                    const v2 = o2[ckey];
                    return applyCompare(v1, v2, ckey);
                });
        } else {
            return false;
        }
    }

    return (o1 === o2);
}

function isPlainObject(o) {
    return o !== null && typeof o === 'object' && o.constructor === Object;
}

function isArray(o) {
    return Array.isArray(o);
}

function deleteKeys(o, keys) {
    if (keys && o && Array.isArray(keys)) {
        keys.forEach((key) => {
            delete o[key];
        });
    }
}

function deleteItems(o, orderedKeys) {
    if (o && orderedKeys && Array.isArray(orderedKeys)) {
        orderedKeys.reverse().forEach((i) => {
            o.splice(i, 1);
        });
    }
}

function ignoreValue(value, key) {
    return ignore.some((f) => f(value, key));
}