import { type Criterion, CriterionType } from './types.ts'
import { criterionParse } from './criterionParse.ts'
import { queryStringToCriteria } from './queryStringToCriteria.ts'
import { pick } from './pick.ts'

export const place = (
  value: any,
  object: any,
  query: string | string[] | Criterion[],
): any => {
  if (typeof query === 'string') {
    query = queryStringToCriteria(query)
  }
  const search = query[0]
  const criterion = criterionParse(search)
  // console.log('criterion', criterion)

  if (criterion.type === CriterionType.objectMatch) {
    if (query.length === 1) {
      object[criterion.search] = value
      return object
    } else {
      object[criterion.search] = place(
        value,
        object[criterion.search],
        query.slice(1),
      )
      return object
    }
  } else if (criterion.type === CriterionType.arrayAppend) {
    if (query.length === 1) {
      object.push(value)
      return object
    } else {
      console.warn('placing on multiple array nodes not supported')
    }
  } else if (criterion.type === CriterionType.arrayMatch) {
    if (query.length === 1) {
      if (!Array.isArray(object)) {
        object = []
      }
      object[criterion.search] = value
      return object
    } else {
      object[criterion.search] = place(
        value,
        object[criterion.search],
        query.slice(1),
      )
      return object
    }
  }
}
