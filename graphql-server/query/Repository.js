const { createQuery } = require('../utils/Query.js')

exports.REPOS_QUERY = createQuery({
  query: `{
    viewer {
      repositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 20) {
        nodes {
          id
          name
          updatedAt
          description
          forkCount
          stargazerCount
          url
        }
      }
    }
  }`
})

exports.PR_QUERY = createQuery({
  query: `{
    viewer {
      repository(name: "Dev-Docs") {
        pullRequests(orderBy: {field: CREATED_AT, direction: ASC}, first: 30, states: OPEN) {
          nodes {
            title
            url
            createdAt
            body
            labels(first: 10) {
              nodes {
                id
                color
                name
              }
            }
            reviewRequests(first: 10) {
              nodes {
                requestedReviewer {
                  ... on User {
                    id
                    name
                    avatarUrl(size: 16)
                    bio
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
})