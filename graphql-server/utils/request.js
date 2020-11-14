const axios = require('axios');
require('dotenv').config();

const GITHUB_URL = 'https://api.github.com/graphql'

exports.request = ({ query }) => {
  const config = {
    url: GITHUB_URL,
    method: 'post',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data : query
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => {
        resolve(JSON.stringify(res.data))
      })
      .catch((e) => {
        console.log(e);
        reject(e)
      })
  })
}
