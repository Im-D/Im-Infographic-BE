const { request } = require('./request');
const Query = require('./query');

// Login User
request({query: Query.LOGIN_QUERY}).then(data => {
  console.log('===LOGIN_QUERY===')
  console.log(data)
})

// PR
request({query: Query.PR_QUERY}).then(data => {
  console.log('===PR_QUERY===')
  console.dir(data)
})