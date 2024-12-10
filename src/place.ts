import { type Criterion, CriterionType } from "./types.ts";
import { criterionParse } from "./criterionParse.ts";
import { pick } from "./pick.ts";
import { queryStringToCriteria } from "./queryStringToCriteria.ts";

export const place = (
  value: any,
  object: any,
  query: string | string[] | Criterion[],
): any => {
  if (typeof query === "string") {
    query = queryStringToCriteria(query);
  }
  let placement: any = value;
  query = query.reverse();
  for (let idx = 0; idx < query.length; idx++) {
    const criterion = criterionParse(query[idx]);
    if (criterion.type === CriterionType.objectMatch) {
      placement = {
        [criterion.search]: placement,
      };
      Object.assign(object, placement);
    } else if (criterion.type === CriterionType.arrayAppend) {
      const arrayToAppend = pick(object, query.slice(-1).reverse());
      arrayToAppend.push(placement);
      place(arrayToAppend, placement, query.slice(-1).reverse());
      placement = arrayToAppend;
    } else if (criterion.type === CriterionType.arrayMatch) {
      let arrayToPlace = pick(object, query.slice(-1).reverse());
      arrayToPlace[criterion.search] = placement;
      placement = arrayToPlace;
    } else if (criterion.type === CriterionType.root) {
      object = { ...object, ...value };
      idx = query.length;
    }
  }
  return object;
};
