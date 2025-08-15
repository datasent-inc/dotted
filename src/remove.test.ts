import { remove } from './remove.ts'
import { describe, expect, test } from 'bun:test'

describe('remove', () => {
  test('should remove a value from an object', () => {
    const object = {
      nested: {
        down: 'value',
        next: '132',
      },
      next: '132',
    }
    expect(remove(object, '.nested.down')).toEqual({
      nested: {
        next: '132',
      },
      next: '132',
    })
  })
  test('should remove a value from an object with an array', () => {
    const object = {
      array: [
        {
          next: '132',
          prev: '132',
        },
      ],
    }
    expect(remove(object, '.array[0].next')).toEqual({
      array: [
        {
          prev: '132',
        },
      ],
    })
  })
})
