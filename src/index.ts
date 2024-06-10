import charFile from './charactersMap';

// Ensure charFile is an array of tuples
const tuples: [string, string][] = charFile.map((item: string[]) => [item[0], item[1]] as [string, string]);
const charMap = new Map(tuples);

const aRange: [number, number] = [31, 123];

const betweenFn = (v: number, min: number, max: number): boolean => v > min && v < max;

interface CustomMap {
  [key: string]: string;
}

/**
 * Assigns key-value pairs from the `custom` object to the `mapToUse` map.
 * Only assigns key-value pairs where the key is a single character.
 * 
 * @param custom - The object containing key-value pairs to assign to the map.
 * @param mapToUse - The map to assign the key-value pairs to.
 */
function assignToMap(custom: CustomMap | undefined, mapToUse: Map<string, string>): void {
  if (custom && typeof custom === 'object') {
    Object.keys(custom).filter(x => x.length === 1).forEach(k => {
      mapToUse.set(k, custom[k]);
    });
  }
}

/**
 * Returns the replacement string for a given character based on a provided map.
 * If the character is not found in the map, the original character is returned.
 * If the replacement character is not within the specified range, an empty string is returned.
 *
 * @param character - The character to find the replacement for.
 * @param mapToUse - The map containing the replacement characters.
 * @returns The replacement string for the given character.
 */
function getReplacement(character: string, mapToUse: Map<string, string>): string {
  const rep = mapToUse.has(character) ? mapToUse.get(character)! : character;
  return betweenFn(rep.charCodeAt(0), aRange[0], aRange[1]) ? rep : '';
}

export default function (separator: string = ' ', custom?: CustomMap) {
  const defaultSeparator = separator;
  const localMap = custom ? new Map(charMap) : charMap;
  assignToMap(custom, localMap);

  return function (str: string = '', separator: string = defaultSeparator, custom?: CustomMap) {
    const mapToUse = custom ? new Map(localMap) : localMap;
    assignToMap(custom, mapToUse);
    return String(str).toLowerCase()
      .split('')
      .map(s => getReplacement(s, mapToUse))
      .join('')
      .trim()
      .replace(/\s{1,}/g, separator);
  };
}
