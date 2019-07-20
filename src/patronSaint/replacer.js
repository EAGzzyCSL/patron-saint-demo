var fs = require('fs')

module.exports = (fileName, options = {}) => {
  try {
    const sourceCode = fs.readFileSync(`${__dirname}/${fileName}`, 'utf-8')
    return Object.entries(options).reduce(
      (targetCode, [origin, target]) =>
        targetCode.replace(new RegExp(`\\$${origin}\\$`, 'g'), target),
      sourceCode
    )
  } catch (e) {
    console.error(e)
  }
  return ''
}
