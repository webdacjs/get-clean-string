import { test, expect } from 'vitest'
import getCleanString from './dist/index.js' // Adjust the path as needed

const clean = getCleanString.default(' ', {8: 'eight'})
const otherclean = getCleanString.default()


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
    const testString = 'Spanish: acción - French: Château'
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
    const testString = 'Dad\'s house and Mom"s car'
    const expected = 'dads house and moms car'
    expect(clean(testString)).toBe(expected)
})

test('Testing custom separator -', () => {
    const testString = 'text should contain dashes'
    const expected = 'text-should-contain-dashes'
    expect(clean(testString, '-')).toBe(expected)
})

test('Test custom map replacement', () => {
    const custom = {}
    custom['\''] = ' '
    custom['"'] = ' '
    const testString = 'Dad\'s house and Mom"s car'
    const expected = 'dad s house and mom s car'
    expect(clean(testString, ' ', custom)).toBe(expected)
})

test('Test custom keeping special character', () => {
    const custom = {}
    custom['\''] = '\''
    const testString = 'dad\'s house'
    expect(clean(testString, ' ', custom)).toBe(testString)
})

test('Test global change', () => {
    expect(clean(1998)).toBe('199eight')
})

test('Test local change', () => {
    expect(clean(1998)).toBe('199eight')
    expect(clean(1998, ' ', {'8': '8'})).toBe('1998')
    expect(clean(1998)).toBe('199eight')
})

test('Testing second instatiation with default map', () => {
    expect(otherclean(1998)).toBe('1998')
})
