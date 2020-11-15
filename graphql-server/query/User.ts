import { createQuery } from '../utils/Query.ts'

export const LOGIN_QUERY: string = createQuery({
  query: `query { 
    viewer { 
      login  
    }
  }`
});

export const AUTHOR_QUERY: string = createQuery({
  query: `{
    viewer {
      repository(name: "Dev-Docs") {
        collaborators {
          edges {
            node {
              id
              login
              name
              avatarUrl(size: 16)
              bio
              bioHTML
              url
            }
          }
        }
      }
    }
  }`
})