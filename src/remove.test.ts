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

  test('remove the last property of an object', () => {
    const again = {
      myKey: '1',
      other: '2',
      nested: [
        {
          a: '3',
          b: '4',
        },
        {
          e: '3',
        },
        {
          c: '3',
          d: '4',
        },
      ],
    }
    expect(remove(again, '.nested[1].e')).toEqual({
      myKey: '1',
      other: '2',
      nested: [
        {
          a: '3',
          b: '4',
        },
        {},
        {
          c: '3',
          d: '4',
        },
      ],
    })
  })
  test('remove the last element of an array', () => {
    const again = {
      myKey: '1',
      other: '2',
      nested: [
        {
          a: '3',
          b: '4',
        },
      ],
    }
    expect(remove(again, '.nested[0]')).toEqual({
      myKey: '1',
      other: '2',
      nested: [],
    })
  })
})
