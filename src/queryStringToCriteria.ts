export const queryStringToCriteria = (queryString: string): string[] => {
  if (queryString === ".") {

    return [""];
  }
  queryString = queryString.replaceAll('[','.[')
  const split = queryString.split(".");
  if (split[0] === split[1] && split[0] === "") {
    return [""];
  }
  const [, ...rest] = split;
  return rest;
};
