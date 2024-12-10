import { type Criterion, CriterionType } from "./types.ts";

export const criterionParse = (search: string | Criterion): Criterion => {
  if (search.hasOwnProperty("type")) {
    return search as Criterion;
  } else if ((search as string) === "") {
    return {
      search: "",
      type: CriterionType.root,
    };
  } else if ((search as string).match(/^\[\*]$/) !== null) {
    return {
      search: "[*]",
      type: CriterionType.arrayWildCard,
    };
  } else if ((search as string).match(/^\[]$/) !== null) {
    return {
      search: "[]",
      type: CriterionType.arrayAppend,
    };
  } else if ((search as string).match(/^\[\d+]$/) !== null) {
    return {
      search: Number((search as string).replace("[", "").replace("]", "")),
      type: CriterionType.arrayMatch,
    };
  } else {
    return {
      search: search as string,
      type: CriterionType.objectMatch,
    };
  }
};
