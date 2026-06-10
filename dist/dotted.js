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
  const search = query[0];
  const criterion = criterionParse(search);
  if (criterion.type === "objectMatch" /* objectMatch */) {
    if (query.length === 1) {
      object[criterion.search] = value;
      return object;
    } else {
      object[criterion.search] = place(value, object[criterion.search], query.slice(1));
      return object;
    }
  } else if (criterion.type === "arrayAppend" /* arrayAppend */) {
    if (query.length === 1) {
      object.push(value);
      return object;
    } else {
      console.warn("placing on multiple array nodes not supported");
    }
  } else if (criterion.type === "arrayMatch" /* arrayMatch */) {
    if (query.length === 1) {
      if (!Array.isArray(object)) {
        object = [];
      }
      object[criterion.search] = value;
      return object;
    } else {
      object[criterion.search] = place(value, object[criterion.search], query.slice(1));
      return object;
    }
  }
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

// src/remove.ts
var remove = (object, query) => {
  if (typeof query === "string") {
    query = queryStringToCriteria(query);
  }
  const search = query[0];
  const criterion = criterionParse(search);
  if (criterion.type === "objectMatch" /* objectMatch */) {
    if (query.length === 1) {
      delete object[criterion.search];
      return object;
    } else {
      query.slice(1);
      let subObject = remove(object[criterion.search], query.slice(1));
      if (!subObject) {
        subObject = {};
      }
      object[criterion.search] = subObject;
    }
  } else if (criterion.type === "arrayMatch" /* arrayMatch */) {
    if (query.length === 1) {
      object.splice(criterion.search, 1);
      return object;
    } else {
      query.slice(1);
      let subObject = remove(object[criterion.search], query.slice(1));
      if (!subObject) {
        subObject = [];
      }
      object[criterion.search] = subObject;
    }
  } else if (criterion.type === "arrayWildCard" /* arrayWildCard */) {
    console.warn("CriterionType.arrayWildCard removal is not supported");
  } else if (criterion.type === "root" /* root */) {
    console.warn("CriterionType.root removal is not supported");
  }
  return object;
};

// src/dotted.ts
var dotted_default = {
  pick,
  place,
  flatten,
  unflatten,
  remove
};
export {
  dotted_default as default
};
