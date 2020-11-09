const { request } = require('./request');
const Query = require('./query');

// Login User
request({query: Query.LOGIN_QUERY}).then(data => console.log(data))