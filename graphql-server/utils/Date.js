const getNow = () => new Date()
const zeroPrefix = (num) => (('0' + num).slice(-2))

exports.getTodayFileName = () => {
  const now = getNow()

  return `${now.getFullYear()}${zeroPrefix(now.getMonth() + 1)}${zeroPrefix(now.getDate())}`
}
