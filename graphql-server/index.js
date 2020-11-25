require('dotenv').config();

const { request } = require('./utils/Fetch');
const { creatCommit } = require('./utils/Github');
const { getTodayFileName } = require('./utils/Date.js')
const { writeFile } = require('./utils/File');

const IMDQuery = require('./query/IMD.js');
const UserQuery = require('./query/User.js');
const RepoQuery = require('./query/Repository.js');

// Author
request({ query: UserQuery.AUTHOR_QUERY }).then(({ data }) => {
  console.log('===Author===')

  const nodes = data.viewer.repository.collaborators.nodes || []
  const collaborators = nodes
    .filter((item) => item.id !== 'MDQ6VXNlcjYwOTIwMTYw')
    .reduce((acc, node) => {
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
request({ query: IMDQuery.IMD_INFO_QUERY }).then(({ data }) => {
  console.log('===IMD Info ===')

  creatCommit({
    path: 'imd_info', 
    fileName: getTodayFileName(), 
    contents: JSON.stringify(viewer)
  })
})

// TEAM Repos
request({ query: RepoQuery.REPOS_QUERY }).then(({ data: { viewer: { repositories } } }) => {
  console.log('===IMD Team ===')
  const data = {
    repos: repositories.nodes
  }

  creatCommit({
    path: 'imd_repos', 
    fileName: getTodayFileName(), 
    contents: JSON.stringify(data)
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