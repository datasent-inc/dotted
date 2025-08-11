// src/criterionParse.ts
var criterionParse = (search) => {
  if (search.hasOwnProperty("type")) {
    return search;
  } else if (search === "") {
    return {
      search: "",
      type: "root" /* root */
    };
  } else if (search.match(/^\[\*]$/) !== null) {
    return {
      search: "[*]",
      type: "arrayWildCard" /* arrayWildCard */
    };
  } else if (search.match(/^\[]$/) !== null) {
    return {
      search: "[]",
      type: "arrayAppend" /* arrayAppend */
    };
  } else if (search.match(/^\[\d+]$/) !== null) {
    return {
      search: Number(search.replace("[", "").replace("]", "")),
      type: "arrayMatch" /* arrayMatch */
    };
  } else {
    return {
      search,
      type: "objectMatch" /* objectMatch */
    };
  }
};

// src/queryStringToCriteria.ts
var queryStringToCriteria = (queryString) => {
  if (queryString === ".") {
    return [""];
  }
  queryString = queryString.replaceAll("[", ".[");
  const split = queryString.split(".");
  if (split[0] === split[1] && split[0] === "") {
    return [""];
  }
  const [, ...rest] = split;
  return rest;
};

// src/pick.ts
var pick = (object, query) => {
  if (typeof query === "string") {
    query = queryStringToCriteria(query);
  }
  let current = object;
  let reductionCount = query.filter((search) => criterionParse(search).type === "arrayWildCard" /* arrayWildCard */).length;
  for (let queryIdx = 0;queryIdx < query.length; queryIdx++) {
    const search = query[queryIdx];
    const criterion = criterionParse(search);
    if (criterion.type === "objectMatch" /* objectMatch */) {
      current = current[criterion.search];
    } else if (criterion.type === "arrayMatch" /* arrayMatch */) {
      current = current[criterion.search];
    } else if (criterion.type === "arrayWildCard" /* arrayWildCard */) {
      let pulled = [];
      for (let currentIdx = 0;currentIdx < current.length; currentIdx++) {
        pulled.push(pick(current[currentIdx], query.slice(queryIdx + 1, query.length)));
      }
      current = pulled;
      queryIdx = query.length;
    }
  }
  if (reductionCount > 1) {
    const reduced = [];
    for (let child of current) {
      for (let value of child) {
        reduced.push(value);
      }
    }
    current = reduced;
  }
  return current;
};

// src/place.ts
var place = (value, object, query) => {
  if (typeof query === "string") {
    query = queryStringToCriteria(query);
  }
  let placement = value;
  query = query.reverse();
  for (let idx = 0;idx < query.length; idx++) {
    const criterion = criterionParse(query[idx]);
    if (criterion.type === "objectMatch" /* objectMatch */) {
      placement = {
        [criterion.search]: placement
      };
      Object.assign(object, placement);
    } else if (criterion.type === "arrayAppend" /* arrayAppend */) {
      const arrayToAppend = pick(object, query.slice(-1).reverse());
      arrayToAppend.push(placement);
      place(arrayToAppend, placement, query.slice(-1).reverse());
      placement = arrayToAppend;
    } else if (criterion.type === "arrayMatch" /* arrayMatch */) {
      if (!Array.isArray(pick(object, query.slice(-1).reverse()))) {
        place([], object, query.slice(-1).reverse());
      }
      let arrayToPlace = pick(object, query.slice(-1).reverse());
      arrayToPlace[criterion.search] = placement;
      placement = arrayToPlace;
    } else if (criterion.type === "root" /* root */) {
      object = { ...object, ...value };
      idx = query.length;
    }
  }
  return object;
};

// src/unflatten.ts
var unflatten = (values) => {
  let response = {};
  for (const [key, value] of Object.entries(values)) {
    place(value, response, key);
  }
  return response;
};

// src/flatten.ts
var stripArrayDots = (obj) => {
  const ret = {};
  for (let key in obj) {
    ret[key.replaceAll(".[", "[")] = obj[key];
  }
  return ret;
};
var flatten = (obj, delimiter = ".", prefix = "") => {
  return Object.keys(obj).reduce((acc, found) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : "";
    if (typeof obj[found] === "object" && obj[found] !== null && Object.keys(obj[found]).length > 0) {
      Object.assign(acc, flatten(obj[found], delimiter, pre + found));
    } else if (Array.isArray(obj)) {
      acc["." + pre + "[" + found + "]"] = obj[Number(found)];
    } else {
      acc["." + pre + found] = obj[found];
    }
    return stripArrayDots(acc);
  }, {});
};

// src/dotted.ts
var dotted_default = {
  pick,
  place,
  flatten,
  unflatten
};
export {
  dotted_default as default
};
