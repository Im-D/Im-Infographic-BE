const fs = require('fs')
const { getTodayFileName } = require('./Date.js')

const checkDirExist = (dirPath) => {
  try {
    fs.statSync(`${dirPath}`)
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.mkdirSync(`${dirPath}`)
      console.log(`Create Dir ${dirPath}`)
    }
  }
}

exports.writeFile = ({ fileDirName = '', data = '' }) => {
  checkDirExist(process.env.DATA_DIR)
  checkDirExist(`${process.env.DATA_DIR}/${fileDirName}`)

  return fs.writeFileSync(`${process.env.DATA_DIR}/${fileDirName}/${getTodayFileName()}.json`, data)
}