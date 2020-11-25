const { createQuery } = require('..//utils/Query.js')

exports.IMD_INFO_QUERY = createQuery({
  query: `{
    viewer {
      id
      name
      avatarUrl(size: 16)
      bio
      url
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }`
})
