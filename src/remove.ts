import { type Criterion, CriterionType } from './types.ts'
import { criterionParse } from './criterionParse.ts'
import { queryStringToCriteria } from './queryStringToCriteria.ts'

export const remove = (
  object: any,
  query: string | string[] | Criterion[],
): any => {
  if (typeof query === 'string') {
    query = queryStringToCriteria(query)
  }

  const search = query[0]
  const criterion = criterionParse(search)
  if (criterion.type === CriterionType.objectMatch) {
    if (query.length === 1) {
      delete object[criterion.search]
      return object
    } else {
      query.slice(1)
      object[criterion.search] = remove(
        object[criterion.search],
        query.slice(1),
      )
    }
  } else if (criterion.type === CriterionType.arrayMatch) {
    if (query.length === 1) {
      object.splice(criterion.search, 1)
      return object
    } else {
      query.slice(1)
      object[criterion.search] = remove(
        object[criterion.search],
        query.slice(1),
      )
    }
  } else if (criterion.type === CriterionType.arrayWildCard) {
    console.warn('CriterionType.arrayWildCard removal is not supported')
  } else if (criterion.type === CriterionType.root) {
    console.warn('CriterionType.root removal is not supported')
  }
  return object
}
