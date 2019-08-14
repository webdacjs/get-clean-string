const charactersMapFile = require('./charactersMap.json')
const charactersMap = new Map(charactersMapFile)
const aRange = [31, 123]

function assignToMap (custom) {
  Object.keys(custom).filter(x => x.length === 1).forEach(k => {
    charactersMap.set(k, custom[k])
  })
}

module.exports = function (str, sep = ' ', custom) {
  if (custom && typeof (custom) === 'object') {
    assignToMap(custom)
  }
  return str
    .toLowerCase()
    .split('')
    .map(s => charactersMap.has(s) ? charactersMap.get(s) : s)
    .map(s => s.charCodeAt() > aRange[0] && s.charCodeAt() < aRange[1] ? s : '')
    .join('').trim().replace(/\s{1,}/g , sep)
}
