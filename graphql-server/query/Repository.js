const { createQuery } = require('../utils/Query.js')

exports.REPO_INFO_QUERY = createQuery({
  query: `{
    viewer {
      repository(name: "Dev-Docs") {
        name
        nameWithOwner
        createdAt
        updatedAt
        description
        descriptionHTML
        forkCount
        stargazerCount
        url
      }
    }
  }`
})

exports.PR_QUERY = createQuery({
  query: `{
    viewer {
      repository(name: "Dev-Docs") {
        pullRequests(orderBy: {field: CREATED_AT, direction: DESC}, first: 20, states: OPEN) {
          nodes {
            title
            url
            bodyHTML
            createdAt
            author {
              avatarUrl
              url
              login
              ... on User {
                email
                url
                bioHTML
              }
            }
            labels(first: 10) {
              edges {
                node {
                  id
                  color
                  name
                }
              }
            }
            reviewRequests(first: 10) {
              edges {
                node {
                  requestedReviewer {
                    ... on User {
                      email
                      login
                      name
                      avatarUrl
                    }
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