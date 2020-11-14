const { request } = require('./utils/Fetch');
const Query = require('./query');

// Login User
request({query: Query.LOGIN_QUERY}).then(data => {
  console.log('===LOGIN_QUERY===')
  console.log(data)
})

// TEAM Info
request({query: Query.IMD_TEAM_INFO_QUERY}).then(data => {
  console.log('===IMD Team ===')
  console.dir(data)
})

// TEAM Repos
request({query: Query.IMD_REPOS_QUERY}).then(data => {
  console.log('===IMD Tea ===')
  console.dir(data)
})

// Author
request({query: Query.AUTHOR_QUERY}).then(data => {
  console.log('===Author===')
  console.dir(data)
})

// PR
request({query: Query.PR_QUERY}).then(data => {
  console.log('===PR_QUERY===')
  console.dir(data)
})