require('dotenv').config();

const { request } = require('./utils/Fetch');

const UserQuery = require('./query/User.js');
const IMDQuery = require('./query/IMD.js');
const RepoQuery = require('./query/Repository.js');

// Login User
request({query: UserQuery.LOGIN_QUERY}).then(data => {
  console.log('===LOGIN_QUERY===')
  console.log(data)
})

// Author
request({query: UserQuery.AUTHOR_QUERY}).then(data => {
  console.log('===Author===')
  console.dir(data)
})

// TEAM Info
request({query: IMDQuery.IMD_INFO_QUERY}).then(data => {
  console.log('===IMD Info ===')
  console.dir(data)
})

// TEAM Repos
request({query: IMDQuery.IMD_REPOS_QUERY}).then(data => {
  console.log('===IMD Team ===')
  console.dir(data)
})

// Repo Info
request({query: IMDQuery.REPO_INFO_QUERY}).then(data => {
  console.log('===Repo Info ===')
  console.dir(data)
})

// PR
request({query: RepoQuery.PR_QUERY}).then(data => {
  console.log('===PR_QUERY===')
  console.dir(data)
})