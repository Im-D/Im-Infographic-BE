const fs = require('fs')
const { getTodayFileName } = require('./Date.js')

exports.writeFile = ({ fileName = '', data = '' }) => {
  return fs.writeFileSync(`${process.env.DATA_DIR}${getTodayFileName()}.json`, data)
}