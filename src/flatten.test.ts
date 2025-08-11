import { flatten } from './flatten.ts'
import { describe, expect, test } from 'bun:test'

describe('flatten', () => {
  test('should convert an object to a hash of dot paths and values', () => {
    const input = {
      key: 'value',
      array: ['1', 2],
    }
    expect(flatten(input)).toEqual({
      '.key': 'value',
      '.array[0]': '1',
      '.array[1]': 2,
    })
  })
})
