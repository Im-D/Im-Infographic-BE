const axios = require('axios');

exports.request = ({ query }) => {
  const config = {
    url: process.env.GITHUB_URL,
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
        resolve(res.data)
      })
      .catch((e) => {
        console.log(e);
        reject(e)
      })
  })
}
