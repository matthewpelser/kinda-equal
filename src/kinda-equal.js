
export function equalish(o1, o2) {
    let jo1 = clone(o1);
    let jo2 = clone(o2);

    deleteKeys(jo1, applyFilters(jo1));
    deleteKeys(jo2, applyFilters(jo2));

    return applyCompare(jo1, jo2, 'root');
}

function clone(o) {
    return JSON.parse(JSON.stringify(o));
}

function applyFilters(o) {
  let ignore = [];
  Object.keys(o).forEach((key) => {
    let value = o[key];
    if(value !== null && typeof value === 'object' && value.constructor === Object) {
        deleteKeys(value, applyFilters(value));
    }
    if(ignoreValue(value)){
      ignore.push(key);
    }
  });
  return ignore;
}

function applyCompare(o1, o2, key) {
    if (Array.isArray(o1) && Array.isArray(o2)) {
        if (o1.length === o2.length) {
            return o1.every((vi1, i) => {
                return applyCompare(vi1, o2[i], key);
            });
        } else {
            console.log(`Array not equal ${key}`);
            return false;
        }
    }

    if (o1 !== null && typeof o1 === 'object' && o1.constructor === Object) {
        if (o2 !== null && typeof o2 === 'object' && o2.constructor === Object && 
            (Object.keys(o1).length && Object.keys(o2).length)) {
                return Object.keys(o1).every((ckey) => {
                    let v1 = o1[ckey];
                    let v2 = o2[ckey];
                    return applyCompare(v1, v2, ckey);
                });
        } else {
            console.log(`Object not equal ${key}`);
            return false;
        }
    }

    const vcompare = (o1 === o2);
    if (!vcompare) console.log(`Value not equal ${key}`);
    return vcompare;
}

function deleteKeys(o, keys) {
    keys.forEach((key) => {
  	    delete o[key];
    });
}

function ignoreValue(value) {
  if (value === '' || value === null || value === undefined) {
  	return true;
  }
  if (Array.isArray(value) && value.length === 0) {
  	return true;
  }
  if (Object.keys(value).length === 0 && value.constructor === Object) {
    return true;
  }
  return false;
}

exports.equalish = equalish;
