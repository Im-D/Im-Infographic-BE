require('dotenv').config();

const { request } = require('./utils/Fetch');
const { creatCommit } = require('./utils/Github');
const { getTodayFileName } = require('./utils/Date.js')

const UserQuery = require('./query/User.js');
const IMDQuery = require('./query/IMD.js');
const RepoQuery = require('./query/Repository.js');

// Author
request({ query: UserQuery.AUTHOR_QUERY }).then(({ data }) => {
  console.log('===Author===')

  const edges = data.viewer.repository.collaborators.edges || []
  const collaborators = edges
    .filter((item) => item.node.id !== 'MDQ6VXNlcjYwOTIwMTYw')
    .reduce((acc, { node }) => {
      acc[node.id] = node
      return acc
    }, {})

  creatCommit({
    path: 'author', 
    fileName: getTodayFileName(), 
    contents: JSON.stringify(collaborators)
  })
})

// TEAM Info
request({ query: IMDQuery.IMD_INFO_QUERY }).then(({ data: { viewer } }) => {
  console.log('===IMD Info ===')
  creatCommit({
    path: 'imd_info', 
    fileName: getTodayFileName(), 
    contents: JSON.stringify(viewer)
  })
})

// TEAM Repos
request({ query: IMDQuery.IMD_REPOS_QUERY }).then(({ data: { viewer: { repositories } } }) => {
  console.log('===IMD Team ===')
  const data = {
    repos: repositories.nodes,
    totalCount: repositories.totalCount
  }

  creatCommit({
    path: 'imd_repos', 
    fileName: getTodayFileName(), 
    contents: JSON.stringify(data)
  })
})

// Repo Info
request({ query: RepoQuery.REPO_INFO_QUERY }).then(({ data: { viewer: { repository } } }) => {
  console.log('===Repo Info ===')
  creatCommit({
    path: 'repo_info', 
    fileName: getTodayFileName(), 
    contents: JSON.stringify(repository)
  })
})

// PR
request({ query: RepoQuery.PR_QUERY }).then(({ data }) => {
  console.log('===PR_QUERY===')
  const { viewer: { repository: { pullRequests: { nodes } } } } = data

  creatCommit({
    path: 'pr', 
    fileName: getTodayFileName(), 
    contents: JSON.stringify({prList: nodes})
  })
})