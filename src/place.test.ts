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
    expect(place('My article name', { first: [] }, '.first[0]')).toEqual({
      first: ['My article name'],
    })
  })
  test('should append a value to an array', () => {
    expect(place('My article name', { a: ['first'] }, '.a[]')).toEqual({
      a: ['first', 'My article name'],
    })
  })

  test('should add a value to the root of an object', () => {
    expect(place({ next: 'val' }, { prev: 'value' }, '.')).toEqual({
      prev: 'value',
      next: 'val',
    })
  })

  test('should allow a string query', () => {
    expect(place('My article name', { first: [] }, '.first[0]')).toEqual({
      first: ['My article name'],
    })
  })
})
