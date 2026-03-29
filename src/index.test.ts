import { test, expect } from 'vitest'
import getCleanString from './index.js'

// '8' is an explicit string key (length === 1) so it is processed by assignToMap.
const clean = getCleanString(' ', { '8': 'eight' })
const otherclean = getCleanString()

test('Test nothing is changed', () => {
  const testString = 'it should be the same'
  expect(clean(testString)).toBe(testString)
})

test('Test empty query', () => {
  expect(clean()).toBe('')
})

test('Cleans the trailing spaces', () => {
  const testString = '   trailing spaces    '
  const expected = 'trailing spaces'
  expect(clean(testString)).toBe(expected)
})

test('Cleans many signs', () => {
  const testString = ' remove these: !@#$%^&^*&() '
  const expected = 'remove these'
  expect(clean(testString)).toBe(expected)
})

test('Cleans the punctuation sign', () => {
  const testString = 'test!! with >>?signs'
  const expected = 'test with signs'
  expect(clean(testString)).toBe(expected)
})

test('Cleans the accents', () => {
  const testString = 'Spanish:acción - French: Château'
  const expected = 'spanish accion french chateau'
  expect(clean(testString)).toBe(expected)
})

test('Cleans the + sign', () => {
  const testString = 'text with the + sign'
  const expected = 'text with the sign'
  expect(clean(testString)).toBe(expected)
})

test('Remove chinese characters', () => {
  const testString = 'test With Chinese characters 北京市'
  const expected = 'test with chinese characters'
  expect(clean(testString)).toBe(expected)
})

test('Remove the quotes and double quotes', () => {
  const testString = `Dad's house and Mom"s car`
  const expected = 'dads house and moms car'
  expect(clean(testString)).toBe(expected)
})

test('Testing custom separator -', () => {
  const testString = 'text should contain dashes'
  const expected = 'text-should-contain-dashes'
  expect(clean(testString, '-')).toBe(expected)
})

test('Test custom map replacement', () => {
  const custom = { "'": ' ', '"': ' ' }
  const testString = `Dad's house and Mom"s car`
  const expected = 'dad s house and mom s car'
  expect(clean(testString, ' ', custom)).toBe(expected)
})

test('Test custom keeping special character', () => {
  const custom = { "'": "'" }
  const testString = `dad's house`
  expect(clean(testString, ' ', custom)).toBe(testString)
})

// The inner function is typed as (str: string), but coerces any value via String().
// Phase 3 will widen the parameter type to unknown; until then we cast explicitly.
test('Test global change — numeric input is coerced to string', () => {
  expect(clean(1998 as unknown as string)).toBe('199eight')
})

test('Test local change', () => {
  expect(clean(1998 as unknown as string)).toBe('199eight')
  expect(clean(1998 as unknown as string, ' ', { '8': '8' })).toBe('1998')
  expect(clean(1998 as unknown as string)).toBe('199eight')
})

test('Testing second instantiation with default map', () => {
  expect(otherclean(1998 as unknown as string)).toBe('1998')
})

test('Multi-character custom keys are ignored', () => {
  // Keys with length > 1 are silently dropped by assignToMap.
  const cleanWithMultiKey = getCleanString(' ', { ab: 'X' })
  expect(cleanWithMultiKey('ab')).toBe('ab')
})
