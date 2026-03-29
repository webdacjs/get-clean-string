/** A map of single characters to their replacement strings. */
export type CharacterOverrides = Record<string, string>

// ---------------------------------------------------------------------------
// Base character map
//
// Contains only the characters that Unicode NFD normalisation cannot handle:
//   • Special punctuation / symbols  →  space or empty string
//   • Ligatures and non-decomposable Latin letters  →  ASCII equivalents
//
// All keys are lowercase — the pipeline lowercases input before this step.
// The ~350-entry hand-maintained map from v3 is replaced by three steps:
//   1. Substitutions below  (special chars + ligatures + non-decomposable)
//   2. str.normalize('NFD')  (decomposes all remaining precomposed chars)
//   3. /\p{Mn}/gu strip      (removes combining diacritical marks)
// ---------------------------------------------------------------------------
const BASE_MAP = new Map<string, string>([
  // Special characters → space or empty
  ['!', ' '],
  ['"', ''],
  ['#', ' '],
  ['$', ' '],
  ['%', ' '],
  ['&', ' '],
  ['@', ' '],
  ["'", ''],
  ['(', ' '],
  [')', ' '],
  ['+', ' '],
  ['*', ' '],
  [',', ' '],
  ['-', ' '],
  ['/', ' '],
  [':', ' '],
  [';', ' '],
  ['<', ' '],
  ['=', ' '],
  ['>', ' '],
  ['?', ' '],
  ['^', ' '],
  ['_', ' '],
  ['`', ' '],
  ['{', ' '],
  ['}', ' '],
  ['~', ' '],

  // Ligatures (NFD does not decompose these)
  ['æ', 'ae'],
  ['œ', 'oe'],
  ['þ', 'th'],
  ['ĳ', 'ij'],

  // Non-decomposable Latin letters
  ['ð', 'd'],
  ['ø', 'o'],
  ['đ', 'd'],
  ['ħ', 'h'],
  ['ı', 'i'],
  ['ŀ', 'l'],
  ['ł', 'l'],
  ['ŉ', 'n'],
  ['ŧ', 't'],
  ['ſ', 's'],
  ['ƒ', 'f'],
  ['ǽ', 'ae'],
  ['ǿ', 'o'],
])

/**
 * Merges single-character entries from `overrides` into `target`.
 * Keys with length !== 1 are silently ignored.
 */
function assignOverrides(
  overrides: CharacterOverrides | undefined,
  target: Map<string, string>,
): void {
  if (!overrides || typeof overrides !== 'object') return
  for (const key of Object.keys(overrides)) {
    if (key.length !== 1) continue
    const val = overrides[key]
    if (val !== undefined) target.set(key, val)
  }
}

/**
 * Creates a reusable string-cleaning function.
 *
 * The returned function:
 *   1. Coerces any input to a string and lowercases it.
 *   2. Applies per-character substitutions (special chars, ligatures, overrides).
 *   3. Runs Unicode NFD normalisation to decompose remaining accented characters.
 *   4. Strips combining diacritical marks (Unicode category Mn).
 *   5. Drops any character outside printable ASCII (U+0020 – U+007E).
 *   6. Trims leading/trailing whitespace and collapses runs into `separator`.
 *
 * @param defaultSeparator - Word separator used when joining tokens. Defaults to `' '`.
 * @param globalOverrides  - Character replacements applied on every call.
 * @returns A function that cleans a string.
 */
export function createCleaner(defaultSeparator = ' ', globalOverrides?: CharacterOverrides) {
  const localMap = globalOverrides ? new Map(BASE_MAP) : BASE_MAP
  assignOverrides(globalOverrides, localMap as Map<string, string>)

  return function cleanString(
    input: unknown = '',
    separator = defaultSeparator,
    localOverrides?: CharacterOverrides,
  ): string {
    const mapToUse = localOverrides ? new Map(localMap) : (localMap as Map<string, string>)
    assignOverrides(localOverrides, mapToUse)

    return [...String(input).toLowerCase()]
      .map((c) => mapToUse.get(c) ?? c)
      .join('')
      .normalize('NFD')
      .replace(/\p{Mn}/gu, '')
      .replace(/[^\x20-\x7E]/g, '')
      .trim()
      .replace(/\s{1,}/g, separator)
  }
}

/** Convenience default export — preserves v3 call-site compatibility. */
export default createCleaner
