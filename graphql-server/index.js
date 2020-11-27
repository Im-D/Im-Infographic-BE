require('dotenv').config();

const { request } = require('./utils/Fetch');
const { creatCommit } = require('./utils/Github');
const { getTodayFileName } = require('./utils/Date.js')

const IMDQuery = require('./query/IMD.js');
const UserQuery = require('./query/User.js');
const RepoQuery = require('./query/Repository.js');

const CreateData = async () => {
  // Author
  const authorData = await request({ query: UserQuery.AUTHOR_QUERY })
  console.log('===Author===')

  const nodes = authorData.data.viewer.repository.collaborators.nodes || []
  const collaborators = nodes
    .filter((item) => item.id !== 'MDQ6VXNlcjYwOTIwMTYw')
    .reduce((acc, node) => {
      acc[node.id] = node
      return acc
    }, {})

  await creatCommit({
    path: 'author',
    fileName: getTodayFileName(),
    contents: collaborators
  })


  // TEAM Info
  const imdInfoData = await request({ query: IMDQuery.IMD_INFO_QUERY })
  console.log('===IMD Info ===')

  await creatCommit({
    path: 'imd_info',
    fileName: getTodayFileName(),
    contents: imdInfoData.data.viewer
  })

  // TEAM Repos
  const imdReposData = await request({ query: RepoQuery.REPOS_QUERY })
  console.log('===IMD Team ===')

  await creatCommit({
    path: 'imd_repos',
    fileName: getTodayFileName(),
    contents: {
      repos: imdReposData.data.viewer.repositories.nodes
    }
  })

  // PR
  const prData = await request({ query: RepoQuery.PR_QUERY })
  console.log('===PR_QUERY===')

  await creatCommit({
    path: 'pr',
    fileName: getTodayFileName(),
    contents: { prList: prData.data.viewer.repository.pullRequests.nodes }
  })
}

CreateData()
