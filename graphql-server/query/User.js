const { createQuery } = require('..//utils/Query.js')

exports.LOGIN_QUERY = createQuery({
  query: `query { 
    viewer { 
      login  
    }
  }`
});

exports.AUTHOR_QUERY = createQuery({
  query: `{
    viewer{
      repository(name: "Dev-Docs") {
        collaborators {
          edges {
            node {
              login
              avatarUrl(size: 16)
              name
              url
            }
          }
        }
      }
    }
  }`
})