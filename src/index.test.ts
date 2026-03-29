import { test, expect } from 'vitest'
import createCleaner, { type CharacterOverrides } from './index.js'

// ---------------------------------------------------------------------------
// Shared instances
// ---------------------------------------------------------------------------

// '8' is an explicit string key (length === 1) so it is processed by assignOverrides.
const clean = createCleaner(' ', { '8': 'eight' })
const otherclean = createCleaner()

// ---------------------------------------------------------------------------
// Basic behaviour
// ---------------------------------------------------------------------------

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
  const custom: CharacterOverrides = { "'": ' ', '"': ' ' }
  const testString = `Dad's house and Mom"s car`
  const expected = 'dad s house and mom s car'
  expect(clean(testString, ' ', custom)).toBe(expected)
})

test('Test custom keeping special character', () => {
  const custom: CharacterOverrides = { "'": "'" }
  const testString = `dad's house`
  expect(clean(testString, ' ', custom)).toBe(testString)
})

// input is typed as unknown — no cast required
test('Test global change — numeric input is coerced to string', () => {
  expect(clean(1998)).toBe('199eight')
})

test('Test local change', () => {
  expect(clean(1998)).toBe('199eight')
  expect(clean(1998, ' ', { '8': '8' })).toBe('1998')
  expect(clean(1998)).toBe('199eight')
})

test('Testing second instantiation with default map', () => {
  expect(otherclean(1998)).toBe('1998')
})

test('Multi-character custom keys are ignored', () => {
  // Keys with length > 1 are silently dropped by assignOverrides.
  const cleanWithMultiKey = createCleaner(' ', { ab: 'X' })
  expect(cleanWithMultiKey('ab')).toBe('ab')
})

// ---------------------------------------------------------------------------
// Named export
// ---------------------------------------------------------------------------

test('createCleaner is available as a named export', () => {
  const c = createCleaner('-')
  expect(c('hello world')).toBe('hello-world')
})

// ---------------------------------------------------------------------------
// NFD-based diacritic coverage (characters NOT in the v3 hand-written map)
// ---------------------------------------------------------------------------

test('NFD handles characters absent from the old map', () => {
  // Vietnamese composite vowels are fully covered by NFD normalisation
  expect(otherclean('Ấ')).toBe('a')   // Ấ = Ấ LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND ACUTE  (lowercased to small)
  expect(otherclean('ạ')).toBe('a')   // LATIN SMALL LETTER A WITH DOT BELOW
  expect(otherclean('ọ')).toBe('o')   // LATIN SMALL LETTER O WITH DOT BELOW
  expect(otherclean('ỹ')).toBe('y')   // LATIN SMALL LETTER Y WITH GRAVE
})

test('Ligatures handled by explicit substitution table', () => {
  expect(otherclean('æ')).toBe('ae')  // ae ligature
  expect(otherclean('œ')).toBe('oe')  // oe ligature
  expect(otherclean('þ')).toBe('th')  // thorn
  expect(otherclean('ĳ')).toBe('ij')  // ij ligature
})

test('Non-decomposable letters handled by explicit substitution table', () => {
  expect(otherclean('ð')).toBe('d')   // eth
  expect(otherclean('ø')).toBe('o')   // o-stroke
  expect(otherclean('ł')).toBe('l')   // l-stroke
  expect(otherclean('ı')).toBe('i')   // dotless i
})
