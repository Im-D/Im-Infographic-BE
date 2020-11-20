require('dotenv').config();

const { request } = require('./utils/Fetch');
const { writeFile } = require('./utils/File');

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

  writeFile({ fileDirName: 'author', data: collaborators })
})

// TEAM Info
request({ query: IMDQuery.IMD_INFO_QUERY }).then(({ data: { viewer } }) => {
  console.log('===IMD Info ===')
  writeFile({ fileDirName: 'imd_info', data: viewer })
})

// TEAM Repos
request({ query: IMDQuery.IMD_REPOS_QUERY }).then(({ data: { viewer: { repositories } } }) => {
  console.log('===IMD Team ===')
  const data = {
    repos: repositories.nodes,
    totalCount: repositories.totalCount
  }
  writeFile({ fileDirName: 'imd_repos', data })
})

// Repo Info
request({ query: RepoQuery.REPO_INFO_QUERY }).then(({ data: { viewer: { repository } } }) => {
  console.log('===Repo Info ===')
  writeFile({ fileDirName: 'repo_info', data: repository })
})

// PR
request({ query: RepoQuery.PR_QUERY }).then(({ data }) => {
  console.log('===PR_QUERY===')
  const { viewer: { repository: { pullRequests: { nodes } } } } = data

  writeFile({ fileDirName: 'pr', data: { 'prList': nodes } })
})