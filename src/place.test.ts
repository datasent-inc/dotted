import { place } from './place.ts'
import { describe, expect, test } from 'bun:test'

describe('place', () => {
  test('should add a value to an object', () => {
    expect(place('My article name', { prev: 'value' }, '.article')).toEqual({
      prev: 'value',
      article: 'My article name',
    })
  })

  test('should set a value to an array', () => {
    const input = { first: [] }
    expect(place('My article name', input, '.first[0]')).toEqual({
      first: ['My article name'],
    })
  })

  test('should append a value to an array', () => {
    const input = { a: ['first'] }
    expect(place('My article name', input, '.a[]')).toEqual({
      a: ['first', 'My article name'],
    })
  })

  test('should add a value to the root of an object', () => {
    const input = { prev: 'value' }
    expect(place('val', input, '.next')).toEqual({
      prev: 'value',
      next: 'val',
    })
  })

  test('should allow a string query', () => {
    expect(place('My article name', { first: [] }, '.first[0]')).toEqual({
      first: ['My article name'],
    })
  })
  test('place nested by query', () => {
    const input = {
      array: [
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
    expect(place('4', input, '.array[1].z')).toEqual({
      array: [
        {
          a: '3',
          b: '4',
        },
        {
          e: '3',
          z: '4',
        },
        {
          c: '3',
          d: '4',
        },
      ],
    })
  })
})
