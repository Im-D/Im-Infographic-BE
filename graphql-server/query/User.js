const { createQuery } = require('..//utils/Query.js')

exports.AUTHOR_QUERY = createQuery({
  query: `{
    viewer {
      repository(name: "Dev-Docs") {
        collaborators {
          nodes {
            id
            name
            avatarUrl(size: 16)
            bio
            url
          }
        }
      }
    }
  }`
})