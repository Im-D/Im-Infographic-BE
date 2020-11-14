const { createQuery } = require('..//utils/Query.js')

exports.IMD_INFO_QUERY = createQuery({
  query: `{
    viewer {
      id
      avatarUrl(size: 16)
      login
      name
      email
      bio
      bioHTML
      location
      company
      companyHTML
      url
    }
  }`
})

exports.IMD_REPOS_QUERY = createQuery({
  query: `{
    viewer {
      repositories(affiliations: OWNER, first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          name
          nameWithOwner
          description
          descriptionHTML
          updatedAt
          url
        }
        totalCount
      }
    }
  }`
})
