import { criterionParse } from './criterionParse.ts'
import { describe, expect, test } from 'bun:test'
import { CriterionType } from './types.ts'

describe('criterionParse', () => {
  test('should return the a Criterion', () => {
    expect(criterionParse('article')).toEqual({
      search: 'article',
      type: CriterionType.objectMatch,
    })
  })

  test('should return an array match Criterion', () => {
    expect(criterionParse('[0]')).toEqual({
      search: 0,
      type: CriterionType.arrayMatch,
    })
  })
})
