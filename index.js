const charFile = require('./charactersMap.json')
const charMap = new Map(charFile)
const aRange = [31, 123]

const betweenFn = (v, min, max) => v > min && v < max

function assignToMap (custom) {
  if (custom && typeof (custom) === 'object') {
    Object.keys(custom).filter(x => x.length === 1).forEach(k => {
      charMap.set(k, custom[k])
    })
  }
}

function getReplacament (charater) {
  const rep = charMap.has(charater) ? charMap.get(charater) : charater
  return betweenFn(rep.charCodeAt(0), aRange[0], aRange[1]) ? rep : ''
}

module.exports = function (sep = ' ', custom) {
  const defaultSeparator = sep
  assignToMap(custom)
  return function (str = '', sep = defaultSeparator, custom) {
    assignToMap(custom)
    return String(str).toLowerCase()
      .split('')
      .map(s => getReplacament(s))
      .join('').trim().replace(/\s{1,}/g, sep)
  }
}
