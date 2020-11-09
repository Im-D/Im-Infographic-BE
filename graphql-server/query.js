const createQuery = ({ query, variables = {} }) => {
  return JSON.stringify({ query, variables })
}

exports.LOGIN_QUERY = createQuery({
  query: `query { 
    viewer { 
      login  
    }
  }`
});

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
                id
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
                  id
                  requestedReviewer {
                    ... on User {
                      id
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