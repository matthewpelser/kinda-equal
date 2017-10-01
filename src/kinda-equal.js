
const ignore = [
    ignoreEmptyArray,
    ignoreEmptyNullUndefined,
    ignoreEmptyObject
];

export function kindaEqual(config) {

    if (config && config.filters && Array.isArray(config.filters)) {
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
    return (Array.isArray(value) && value.length === 0);
}

export function ignoreEmptyObject(value) {
    return (Object.keys(value).length === 0 && value.constructor === Object);
}

function clone(o) {
    return JSON.parse(JSON.stringify(o));
}

function applyFilters(o, k, oi) {

    if (Array.isArray(o)) {
        const ignoreItems = [];
        o.forEach((item, i) => {

            applyFilters(item, k, i);

            if(ignoreValue(item, k, i)) {
                ignoreItems.push(i);
            }
        });
        deleteItems(o, ignoreItems);
    }

    if (o !== null && typeof o === 'object' && o.constructor === Object) {
        const ignoreKeys = [];
        Object.keys(o).forEach((key) => {
            let value = o[key];
            
            applyFilters(value, key);
            
            if(ignoreValue(value, key)){
                ignoreKeys.push(key);
            }
        });
        deleteKeys(o, ignoreKeys);
    }
}

function applyCompare(o1, o2, key) {
    if (Array.isArray(o1) && Array.isArray(o2)) {
        if (o1.length === o2.length) {
            return o1.every((vi1, i) => {
                return applyCompare(vi1, o2[i], key);
            });
        } else {
            return false;
        }
    }

    if (o1 !== null && typeof o1 === 'object' && o1.constructor === Object) {
        if (o2 !== null && typeof o2 === 'object' && o2.constructor === Object && 
            (Object.keys(o1).length === Object.keys(o2).length)) {
                return Object.keys(o1).every((ckey) => {
                    let v1 = o1[ckey];
                    let v2 = o2[ckey];
                    return applyCompare(v1, v2, ckey);
                });
        } else {
            return false;
        }
    }

    return (o1 === o2);
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