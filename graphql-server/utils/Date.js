const getNow = () => new Date()

exports.getTodayFileName = () => {
  const now = getNow()

  return `${now.getFullYear()}${now.getMonth()}${now.getDate()}`
}
