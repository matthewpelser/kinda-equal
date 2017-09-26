
export function equalish(o1, o2) {
    let jo1 = clone(o1);
    let jo2 = clone(o2);

    applyFilters(jo1);
    applyFilters(jo2);

    return applyCompare(jo1, jo2);
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

function applyCompare(o1, o2) {
    return Object.keys(o1).some((key) => {
        let v1 = o1[key];
        let v2 = o2[key];
        if (v1 !== null && typeof v1 === 'object' && v1.constructor === Object) {
            if (v2 !== null &&
                typeof v2 === 'object' &&
                v2.constructor === Object &&
                (Object.keys(v1).length && Object.keys(v2).length)) {
                    if(!applyCompare(v1, v2)) return false;
            }
            return false;
        }
        if (Array.isArray(v1) && Array.isArray(v2)) {
            if (v1.length === v1.length) {
                v1.some((vi1, i) => {
                    if(!applyCompare(vi1, v2[i])) return false;
                });
            } else {
                return false;
            }
        }
        return v1 === v2;
      });
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
