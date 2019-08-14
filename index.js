const charactersMapFile = require('./charactersMap.json')
const charactersMap = new Map(charactersMapFile)
const aRange = [31, 123]

module.exports = function (str, separator) {
  const sep = separator ? separator : ' '
  return str
    .toLowerCase()
    .split('')
    .map(s => charactersMap.has(s) ? charactersMap.get(s) : s)
    .map(s => s.charCodeAt() > aRange[0] && s.charCodeAt() < aRange[1] ? s : '')
    .join('').trim().replace(/\s{1,}/g , sep)
}
