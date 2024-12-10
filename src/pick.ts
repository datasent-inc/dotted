import { type Criterion, CriterionType } from "./types.ts";
import { criterionParse } from "./criterionParse.ts";
import { queryStringToCriteria } from "./queryStringToCriteria.ts";

export const pick = (
  object: any,
  query: string | string[] | Criterion[],
): any => {
  if (typeof query === "string") {
    query = queryStringToCriteria(query);
  }
  let current: any = object;
  let reductionCount = query.filter(
    (search) => criterionParse(search).type === CriterionType.arrayWildCard,
  ).length;

  for (let queryIdx = 0; queryIdx < query.length; queryIdx++) {
    const search = query[queryIdx];
    const criterion = criterionParse(search);
    if (criterion.type === CriterionType.objectMatch) {
      current = current[criterion.search];
    } else if (criterion.type === CriterionType.arrayMatch) {
      current = current[criterion.search];
    } else if (criterion.type === CriterionType.arrayWildCard) {
      let pulled: any[] = [];
      for (let currentIdx = 0; currentIdx < current.length; currentIdx++) {
        pulled.push(
          pick(current[currentIdx], query.slice(queryIdx + 1, query.length)),
        );
      }
      current = pulled;
      queryIdx = query.length;
    }
  }

  if (reductionCount > 1) {
    const reduced: any[] = [];
    for (let child of current) {
      for (let value of child) {
        reduced.push(value);
      }
    }
    current = reduced;
  }

  return current;
};
