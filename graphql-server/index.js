require('dotenv').config();

const { request } = require('./utils/Fetch');
const { writeFile } = require('./utils/File');

const UserQuery = require('./query/User.js');
const IMDQuery = require('./query/IMD.js');
const RepoQuery = require('./query/Repository.js');

// Login User
request({ query: UserQuery.LOGIN_QUERY }).then(data => {
  console.log('===LOGIN_QUERY===')
  writeFile({ fileDirName: 'login', data })
})

// Author
request({ query: UserQuery.AUTHOR_QUERY }).then(data => {
  console.log('===Author===')
  writeFile({ fileDirName: 'author', data })
})

// TEAM Info
request({ query: IMDQuery.IMD_INFO_QUERY }).then(data => {
  console.log('===IMD Info ===')
  writeFile({ fileDirName: 'imd_info', data })
})

// TEAM Repos
request({ query: IMDQuery.IMD_REPOS_QUERY }).then(data => {
  console.log('===IMD Team ===')
  writeFile({ fileDirName: 'imd_repos', data })
})

// Repo Info
request({ query: IMDQuery.REPO_INFO_QUERY }).then(data => {
  console.log('===Repo Info ===')
  writeFile({ fileDirName: 'repo_info', data })
})

// PR
request({ query: RepoQuery.PR_QUERY }).then(data => {
  console.log('===PR_QUERY===')
  writeFile({ fileDirName: 'pr', data })
})