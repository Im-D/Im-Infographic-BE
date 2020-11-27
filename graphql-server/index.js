require('dotenv').config();

const { request } = require('./utils/Fetch');
const { creatCommit } = require('./utils/Github');
const { getTodayFileName } = require('./utils/Date.js')
const { writeFile } = require('./utils/File');

const IMDQuery = require('./query/IMD.js');
const UserQuery = require('./query/User.js');
const RepoQuery = require('./query/Repository.js');

const CreateData = async () => {
  // Author
  await request({ query: UserQuery.AUTHOR_QUERY }).then(({ data }) => {
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
      contents: collaborators
    })
  })

  // TEAM Info
  await request({ query: IMDQuery.IMD_INFO_QUERY }).then(({ data: { viewer } }) => {
    console.log('===IMD Info ===')

    creatCommit({
      path: 'imd_info',
      fileName: getTodayFileName(),
      contents: viewer
    })
  })

  // TEAM Repos
  await request({ query: RepoQuery.REPOS_QUERY }).then(({ data: { viewer: { repositories } } }) => {
    console.log('===IMD Team ===')
    const data = {
      repos: repositories.nodes
    }

    creatCommit({
      path: 'imd_repos',
      fileName: getTodayFileName(),
      contents: data
    })
  })

  // PR
  await request({ query: RepoQuery.PR_QUERY }).then(({ data }) => {
    console.log('===PR_QUERY===')
    const { viewer: { repository: { pullRequests: { nodes } } } } = data

    creatCommit({
      path: 'pr',
      fileName: getTodayFileName(),
      contents: { prList: nodes }
    })
  })
}

CreateData()
