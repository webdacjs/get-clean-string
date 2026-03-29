# get-clean-string

> Zero-dependency string sanitiser — strips special characters, normalises accents to ASCII, and collapses whitespace into a configurable separator.

[![npm version](https://img.shields.io/npm/v/get-clean-string)](https://www.npmjs.com/package/get-clean-string)
[![license](https://img.shields.io/npm/l/get-clean-string)](LICENSE)

---

## Features

- **Unicode-complete accent stripping** — uses `String.prototype.normalize('NFD')` and Unicode property escapes instead of a hand-written character table, so every precomposed Latin character is handled automatically.
- **Ligature expansion** — `æ → ae`, `œ → oe`, `þ → th`, `ĳ → ij`, and more.
- **Special character removal** — punctuation and symbols are replaced with a space or removed entirely.
- **Configurable separator** — collapse whitespace runs into any character (e.g. `-` for slugs).
- **Per-call and global overrides** — customise the replacement map at the factory level or on individual calls.
- **Unknown input coercion** — any value is safely coerced via `String()` before processing.
- **TypeScript-first** — ships `.d.ts` declarations; fully typed API with zero `any`.
- **Dual ESM / CJS build** — works in modern ESM projects and legacy CommonJS.
- **Zero runtime dependencies**.

---

## Requirements

Node.js `>=18.0.0`

---

## Install

```sh
npm install get-clean-string
```

---

## Import

### ESM (recommended)

```js
import createCleaner from 'get-clean-string'
```

Or using the named export:

```js
import { createCleaner } from 'get-clean-string'
```

### CommonJS

```js
const { createCleaner } = require('get-clean-string')
// default export is also available:
// const createCleaner = require('get-clean-string').default
```

### TypeScript

```ts
import createCleaner, { type CharacterOverrides } from 'get-clean-string'
```

---

## Quick start

```js
import createCleaner from 'get-clean-string'

const clean = createCleaner()

clean('Héllo, Wörld!')   // → 'hello world'
clean('acción')          // → 'accion'
clean('naïve café')      // → 'naive cafe'
clean('  too   many   spaces  ')  // → 'too many spaces'
clean('北京市')           // → ''   (non-ASCII with no mapping is dropped)
```

---

## API

### `createCleaner(defaultSeparator?, globalOverrides?)`

Factory function. Returns a reusable `cleanString` function.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `defaultSeparator` | `string` | `' '` | Separator used to join tokens on every call. |
| `globalOverrides` | `CharacterOverrides` | — | Character replacements applied on every call made by the returned function. |

```js
const clean = createCleaner()           // default space separator, no overrides
const slug  = createCleaner('-')        // dash separator — useful for URL slugs
const custom = createCleaner(' ', { '&': 'and' })  // global override
```

---

### `cleanString(input?, separator?, localOverrides?)`

The function returned by `createCleaner`. Processes `input` and returns a clean ASCII string.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `input` | `unknown` | `''` | Value to clean. Non-strings are coerced via `String()`. |
| `separator` | `string` | factory's `defaultSeparator` | Overrides the separator for this call only. |
| `localOverrides` | `CharacterOverrides` | — | Extra character replacements for this call only. Does not affect future calls. |

```js
const clean = createCleaner('-')

clean('hello world')                   // → 'hello-world'
clean('hello world', '_')             // → 'hello_world'  (per-call separator)
clean('cats & dogs', '-', { '&': 'and' })  // → 'cats-and-dogs'
```

---

### `CharacterOverrides`

```ts
type CharacterOverrides = Record<string, string>
```

An object mapping **single characters** to their replacement strings. Keys with more than one character are silently ignored.

```ts
const overrides: CharacterOverrides = {
  '&': 'and',   // & → 'and'
  "'": "'",      // keep apostrophes instead of removing them
  '8': 'eight', // replace the digit 8 with the word
}
```

---
## Usage examples

### Accent and diacritic stripping

Handled automatically via Unicode NFD — every precomposed Latin character works, not just those in a hardcoded list.

```js
const clean = createCleaner()

clean('résumé')     // → 'resume'
clean('Ångström')   // → 'angstrom'
clean('façade')     // → 'facade'
clean('München')    // → 'munchen'
clean('Ñoño')       // → 'nono'
```

### Ligature expansion

```js
clean('æon')        // → 'aeon'
clean('œuvre')      // → 'oeuvre'
clean('þorn')       // → 'thorn'
clean('łódź')       // → 'lodz'
```

### Special character removal

Punctuation and symbols are replaced with a space. Quotes and apostrophes are removed entirely.

```js
clean('hello! world?')         // → 'hello world'
clean('price: $9.99')          // → 'price 9.99'
clean("dad's car")             // → 'dads car'
clean('foo@bar.com')           // → 'foo bar.com'
```

### URL slugs

```js
const slug = createCleaner('-')

slug('Hello, World!')          // → 'hello-world'
slug('Ação & Reação')          // → 'acao-reacao'  (Portuguese)
slug('  multiple   spaces  ')  // → 'multiple-spaces'
```

### Global overrides (applied to every call)

```js
const clean = createCleaner(' ', { '&': 'and', '@': 'at' })

clean('cats & dogs')           // → 'cats and dogs'
clean('user@example.com')      // → 'user at example.com'
```

### Per-call overrides (scoped to a single call)

Local overrides are merged on top of the global map for that call only. They do not affect subsequent calls.

```js
const clean = createCleaner()

// Keep apostrophes for this call
clean("dad's car", ' ', { "'": "'" })  // → "dad's car"

// Next call is unaffected — apostrophes are removed again
clean("dad's car")                      // → 'dads car'
```

### Non-string input

Any value is safely coerced via `String()` before processing.

```js
const clean = createCleaner()

clean(2024)          // → '2024'
clean(null)          // → 'null'
clean(true)          // → 'true'
clean(undefined)     // → ''      (default parameter)
```

### TypeScript

```ts
import createCleaner, { type CharacterOverrides } from 'get-clean-string'

const overrides: CharacterOverrides = { '&': 'and' }
const clean = createCleaner(' ', overrides)

const result: string = clean('cats & dogs')
// → 'cats and dogs'
```

---

## Testing

```sh
# Unit tests (source)
npm test

# Integration tests (compiled dist — ESM + CJS)
npm run test:integration

# Both suites
npm run test:all

# Unit tests with coverage
npm run coverage
```

---

## Migrating from v3

| | v3 | v4 |
|---|---|---|
| Import (CJS) | `const clean = require('get-clean-string')()` | `const { createCleaner } = require('get-clean-string')` |
| Import (ESM) | `import f from 'get-clean-string'; const clean = f()` | `import createCleaner from 'get-clean-string'` |
| Factory name | anonymous default export | `createCleaner` (named + default) |
| Input type | `string` | `unknown` (coerced via `String()`) |
| Accent handling | ~350-entry hand-written map | Unicode NFD — complete coverage |
| Node.js | — | `>=18.0.0` |

The default export is preserved, so existing call sites that do `import f from 'get-clean-string'; const clean = f()` continue to work without changes.

---

## License

Copyright © 2026, [Juan Convers](https://juanconvers.com).  
Released under the [MIT License](LICENSE).
