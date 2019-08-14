const charFile = require('./charactersMap.json')
const charMap = new Map(charFile)
const aRange = [31, 123]

const betweenFn = (v, min, max) => v > min && v < max

function assignToMap (custom) {
  Object.keys(custom).filter(x => x.length === 1).forEach(k => {
    charMap.set(k, custom[k])
  })
}

module.exports = function (str, sep = ' ', custom) {
  if (custom && typeof (custom) === 'object') {
    assignToMap(custom)
  }
  return (str || '')
    .toLowerCase()
    .split('')
    .map(s => charMap.has(s) ? charMap.get(s) : s)
    .map(s => betweenFn(s.charCodeAt(0), aRange[0], aRange[1]) ? s : '')
    .join('').trim().replace(/\s{1,}/g, sep)
}
