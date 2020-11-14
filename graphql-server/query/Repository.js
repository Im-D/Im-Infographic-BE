const { createQuery } = require('../utils/Query.js')

exports.REPO_INFO_QUERY = createQuery({
  query: `{
    viewer {
      repository(name: "Dev-Docs") {
        createdAt
        url
        updatedAt
        name
        nameWithOwner
        homepageUrl
        description
        descriptionHTML
        forkCount
        stargazerCount
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