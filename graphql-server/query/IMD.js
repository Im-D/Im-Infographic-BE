const { createQuery } = require('..//utils/Query.js')

exports.IMD_INFO_QUERY = createQuery({
  query: `{
    viewer {
      companyHTML
      avatarUrl(size: 16)
      company
      bio
      bioHTML
      email
      login
      name
      location
      url
    }
  }`
})

exports.IMD_REPOS_QUERY = createQuery({
  query: `{
    viewer {
      repositories(affiliations: OWNER, first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        nodes {
          name
          nameWithOwner
          description
          descriptionHTML
          url
          updatedAt
          homepageUrl
        }
      }
    }
  }`
})
