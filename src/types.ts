export enum CriterionType {
  root = "root",
  objectMatch = "objectMatch",
  arrayMatch = "arrayMatch",
  arrayAppend = "arrayAppend",
  arrayWildCard = "arrayWildCard",
}

export interface Criterion {
  search: string | number;
  type: CriterionType;
}
