export default function kindaEqual(config) {

    const filters = buildIgnoreFilters(config);

    const equalish = (o1, o2) => {
        let jo1 = o1;
        let jo2 = o2;
    
        if (filters && filters.length > 0) {
            jo1 = clone(o1);
            jo2 = clone(o2);

            applyFilters(jo1, filters);
            applyFilters(jo2, filters);
        }
    
        return applyCompare(jo1, jo2, '.');
    };

    return equalish;
}

// Expose the default ignore filters;
kindaEqual.ignoreEmptyNullUndefined = ignoreEmptyNullUndefined;
kindaEqual.ignoreEmptyArray = ignoreEmptyArray;
kindaEqual.ignoreEmptyObject = ignoreEmptyObject;

function ignoreEmptyNullUndefined(value) {
   return (value === '' || value === null || value === undefined);
}

function ignoreEmptyArray(value) {
    return (isArray(value) && value.length === 0);
}

function ignoreEmptyObject(value) {
    return (
        value !== null && 
        typeof value === 'object' && 
        value.constructor === Object && 
        Object.keys(value).length === 0
    );
}

function buildIgnoreFilters(config) {
    const ignore = [];
    if (config && config.filters && isArray(config.filters)) {
        config.filters.forEach((f) => {
            ignore.push(f);
        });
    } else {
        [ignoreEmptyArray, ignoreEmptyNullUndefined, ignoreEmptyObject].forEach((f) => {
            ignore.push(f);
        });
    }
    return ignore;
}

function clone(o) {
    return JSON.parse(JSON.stringify(o));
}

function applyFilters(obj, filters) {

    const ignoreValue = (value, key) => {
        return filters.some((f) => f(value, key));
    };

    const filter = (o, k, oi) => {
        if (isArray(o)) {
            const ignoreItems = [];
            o.forEach((item, i) => {

                filter(item, k, i);

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
                
                filter(value, key);
                
                if(ignoreValue(value, key)){
                    ignoreKeys.push(key);
                }
            });
            deleteKeys(o, ignoreKeys);
        }
    };

    filter(obj);
}

function applyCompare(o1, o2, key) {

    if (o1 === o2) return true;

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
                    if (!o2.hasOwnProperty(ckey)) {
                        return false;
                    }
                    const v1 = o1[ckey];
                    const v2 = o2[ckey];
                    return applyCompare(v1, v2, ckey);
                });
        } else {
            return false;
        }
    }

    if (isDate(o1) && isDate(o2)) {
        return o1.getTime() === o2.getTime();
    }

    if (isRegEx(o1) && isRegEx(o2)) {
        return o1.toString() === o2.toString();
    }

    return false;
}

function isPlainObject(o) {
    return o !== null && typeof o === 'object' && o.constructor === Object;
}

function isArray(o) {
    return Array.isArray(o);
}

function isDate(o) {
    return o instanceof Date;
}

function isRegEx(o) {
   return o instanceof RegExp
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