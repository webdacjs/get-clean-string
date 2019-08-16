const charFile = require('./charactersMap.json')
const charMap = new Map(charFile)
const aRange = [31, 123]

const betweenFn = (v, min, max) => v > min && v < max

function assignToMap (custom, mapToUse) {
  if (custom && typeof (custom) === 'object') {
    Object.keys(custom).filter(x => x.length === 1).forEach(k => {
      mapToUse.set(k, custom[k])
    })
  }
}

function getReplacament (charater, mapToUse) {
  const rep = mapToUse.has(charater) ? mapToUse.get(charater) : charater
  return betweenFn(rep.charCodeAt(0), aRange[0], aRange[1]) ? rep : ''
}

module.exports = function (sep = ' ', custom) {
  const defaultSeparator = sep
  const localMap = custom ? new Map(charMap) : charMap
  assignToMap(custom, localMap)
  return function (str = '', sep = defaultSeparator, custom) {
    const mapToUse = custom ? new Map(localMap) : localMap
    assignToMap(custom, mapToUse)
    return String(str).toLowerCase()
      .split('')
      .map(s => getReplacament(s, mapToUse))
      .join('').trim().replace(/\s{1,}/g, sep)
  }
}
