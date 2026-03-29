/**
 * Integration tests — import the compiled dist/ artefacts directly, exactly as
 * an end-consumer of the published package would.
 *
 * ESM  → dist/index.js   (primary format, tested via normal static import)
 * CJS  → dist/index.cjs  (legacy consumers, tested via createRequire)
 *
 * These tests intentionally do NOT import from src/. They must be run after
 * `npm run build` (the `test:integration` script handles this automatically).
 */

import { createRequire } from 'module'
import { test, expect, describe, beforeAll } from 'vitest'
import createCleaner, { createCleaner as createCleanerNamed } from '../dist/index.js'
import type { CharacterOverrides } from '../dist/index.js'

// ---------------------------------------------------------------------------
// CJS module loaded once for the whole suite
// ---------------------------------------------------------------------------

type DistModule = {
  createCleaner: typeof createCleaner
  default: typeof createCleaner
}

const require = createRequire(import.meta.url)
let cjs: DistModule

beforeAll(() => {
  cjs = require('../dist/index.cjs') as DistModule
})

// ---------------------------------------------------------------------------
// 1. Module shape — ESM
// ---------------------------------------------------------------------------

describe('ESM dist/index.js — module shape', () => {
  test('default export is a function', () => {
    expect(typeof createCleaner).toBe('function')
  })

  test('named export createCleaner is a function', () => {
    expect(typeof createCleanerNamed).toBe('function')
  })

  test('named and default exports are the same reference', () => {
    expect(createCleaner).toBe(createCleanerNamed)
  })

  test('factory returns a function', () => {
    expect(typeof createCleaner()).toBe('function')
  })
})

// ---------------------------------------------------------------------------
// 2. Module shape — CJS
// ---------------------------------------------------------------------------

describe('CJS dist/index.cjs — module shape', () => {
  test('require() yields an object (not a bare function)', () => {
    expect(typeof cjs).toBe('object')
  })

  test('named export createCleaner is a function', () => {
    expect(typeof cjs.createCleaner).toBe('function')
  })

  test('default export is a function', () => {
    expect(typeof cjs.default).toBe('function')
  })

  test('CJS named and default exports are the same reference', () => {
    expect(cjs.createCleaner).toBe(cjs.default)
  })

  test('CJS factory returns a function', () => {
    expect(typeof cjs.createCleaner()).toBe('function')
  })
})

// ---------------------------------------------------------------------------
// 3. Core cleaning behaviour — ESM artefact
// ---------------------------------------------------------------------------

describe('ESM dist/index.js — core behaviour', () => {
  const clean = createCleaner()

  test('empty call returns empty string', () => {
    expect(clean()).toBe('')
    expect(clean('')).toBe('')
  })

  test('plain ascii text is lowercased and returned unchanged', () => {
    expect(clean('Hello World')).toBe('hello world')
  })

  test('leading and trailing whitespace is trimmed', () => {
    expect(clean('  hello  ')).toBe('hello')
  })

  test('internal whitespace runs are collapsed', () => {
    expect(clean('too   many   spaces')).toBe('too many spaces')
  })

  test('special characters are replaced with spaces', () => {
    expect(clean('cats & dogs!')).toBe('cats dogs')
  })

  test('quotes and apostrophes are removed without leaving a gap', () => {
    expect(clean(`dad's`)).toBe('dads')
    expect(clean(`Mom"s`)).toBe('moms')
  })

  test('NFD — precomposed accented letters are stripped to base', () => {
    expect(clean('café')).toBe('cafe')
    expect(clean('naïve')).toBe('naive')
    expect(clean('résumé')).toBe('resume')
    expect(clean('Ångström')).toBe('angstrom')
  })

  test('NFD — characters not in the v3 hand-written map are handled', () => {
    expect(clean('\u1ea1')).toBe('a') // a with dot below
    expect(clean('\u1ecd')).toBe('o') // o with dot below
    expect(clean('\u1ef9')).toBe('y') // y with grave
  })

  test('ligatures are expanded to ASCII equivalents', () => {
    expect(clean('æon')).toBe('aeon')
    expect(clean('œuvre')).toBe('oeuvre')
  })

  test('non-decomposable letters map to ASCII', () => {
    expect(clean('łódź')).toBe('lodz')    // Polish l-stroke + o-stroke + d + z-acute
    expect(clean('þorn')).toBe('thorn')   // thorn → th
  })

  test('non-ASCII characters with no mapping are dropped', () => {
    expect(clean('北京')).toBe('')
    expect(clean('hello 北京')).toBe('hello')
  })

  test('numeric input is coerced to string', () => {
    expect(clean(2024)).toBe('2024')
    expect(clean(3.14)).toBe('3.14')
  })

  test('null and undefined are coerced to string', () => {
    expect(clean(null)).toBe('null')
    expect(clean(undefined)).toBe('')  // default parameter kicks in
  })

  test('boolean input is coerced to string', () => {
    expect(clean(true)).toBe('true')
    expect(clean(false)).toBe('false')
  })
})

// ---------------------------------------------------------------------------
// 4. Separator behaviour — ESM artefact
// ---------------------------------------------------------------------------

describe('ESM dist/index.js — separator', () => {
  test('default separator is a space', () => {
    expect(createCleaner()('a b')).toBe('a b')
  })

  test('custom separator set at factory level', () => {
    const clean = createCleaner('-')
    expect(clean('hello world')).toBe('hello-world')
  })

  test('custom separator set per call overrides factory default', () => {
    const clean = createCleaner('-')
    expect(clean('hello world', '_')).toBe('hello_world')
  })

  test('factory default is restored on the next call', () => {
    const clean = createCleaner('-')
    clean('a b', '_')
    expect(clean('a b')).toBe('a-b')
  })
})

// ---------------------------------------------------------------------------
// 5. Override behaviour — ESM artefact
// ---------------------------------------------------------------------------

describe('ESM dist/index.js — overrides', () => {
  test('global override is applied on every call', () => {
    const clean = createCleaner(' ', { '&': 'and' })
    expect(clean('cats & dogs')).toBe('cats and dogs')
    expect(clean('fish & chips')).toBe('fish and chips')
  })

  test('local override is applied only for that call', () => {
    const clean = createCleaner()
    expect(clean('cats & dogs', ' ', { '&': 'and' })).toBe('cats and dogs')
    expect(clean('cats & dogs')).toBe('cats dogs') // & back to default (→ space → collapsed)
  })

  test('local override can restore a stripped character', () => {
    const clean = createCleaner()
    expect(clean(`dad's`, ' ', { "'": "'" })).toBe("dad's")
  })

  test('local override does not mutate the global map', () => {
    const clean = createCleaner(' ', { '8': 'eight' })
    clean('1998', ' ', { '8': '8' }) // local override — restore 8
    expect(clean('1998')).toBe('199eight') // global map must be unchanged
  })

  test('multi-character override keys are silently ignored', () => {
    const clean = createCleaner(' ', { ab: 'X' } as CharacterOverrides)
    expect(clean('ab')).toBe('ab')
  })

  test('numeric string key works as an override', () => {
    const clean = createCleaner(' ', { '7': 'seven' })
    expect(clean('007')).toBe('00seven')
  })
})

// ---------------------------------------------------------------------------
// 6. CJS artefact — spot-check cleaning behaviour
// ---------------------------------------------------------------------------

describe('CJS dist/index.cjs — cleaning behaviour', () => {
  test('cleans accented characters', () => {
    const clean = cjs.createCleaner()
    expect(clean('café')).toBe('cafe')
  })

  test('removes special characters', () => {
    const clean = cjs.default()
    expect(clean('hello! world?')).toBe('hello world')
  })

  test('applies global overrides', () => {
    const clean = cjs.createCleaner(' ', { '&': 'and' })
    expect(clean('cats & dogs')).toBe('cats and dogs')
  })

  test('applies custom separator', () => {
    const clean = cjs.createCleaner('-')
    expect(clean('hello world')).toBe('hello-world')
  })
})
