const clean = require('./index')

test('Cleans the trailing spaces', () => {
    const testString = '   trailing spaces    '
    const expected = 'trailing spaces'
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