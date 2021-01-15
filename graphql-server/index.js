require('dotenv').config();

const { request } = require('./utils/Fetch');
const { creatCommit } = require('./utils/Github');
const { getTodayFileName } = require('./utils/Date.js')

const IMDQuery = require('./query/IMD.js');
const UserQuery = require('./query/User.js');
const RepoQuery = require('./query/Repository.js');

console.log('====Start index.js====')

const CreateData = async () => {
  // Author
  console.log('===Author===')
  const authorData = await request({ query: UserQuery.AUTHOR_QUERY })
  const authorDataNextStep = await request({ query: UserQuery.AUTHOR_NEXT_STEP_QUERY })
  const nodes = authorData.data.viewer.repository.collaborators.nodes || []
  const nodesNextStep = authorDataNextStep.data.viewer.repository.collaborators.nodes || []
  const collaborators = nodes
    .filter((item) => item.id !== 'MDQ6VXNlcjYwOTIwMTYw')
    .reduce((acc, node) => {
      acc[node.id] = node
      return acc
    }, {})
  const collaboratorsNextStep = nodesNextStep
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

  await creatCommit({
    path: 'author_next_step',
    fileName: getTodayFileName(),
    contents: collaboratorsNextStep
  })

  // TEAM Info
  console.log('===IMD Info ===')
  const imdInfoData = await request({ query: IMDQuery.IMD_INFO_QUERY })

  await creatCommit({
    path: 'imd_info',
    fileName: getTodayFileName(),
    contents: imdInfoData.data.viewer
  })

  // TEAM Repos
  console.log('===IMD Team ===')
  const imdReposData = await request({ query: RepoQuery.REPOS_QUERY })

  await creatCommit({
    path: 'imd_repos',
    fileName: getTodayFileName(),
    contents: {
      repos: imdReposData.data.viewer.repositories.nodes
    }
  })

  // PR
  console.log('===PR_QUERY===')
  const prData = await request({ query: RepoQuery.PR_QUERY })

  await creatCommit({
    path: 'pr',
    fileName: getTodayFileName(),
    contents: { prList: prData.data.viewer.repository.pullRequests.nodes }
  })

  // PR
  console.log('===PR_QUERY===')
  const prNextStepData = await request({ query: RepoQuery.PR_NEXT_STEP_QUERY })

  await creatCommit({
    path: 'pr_next_step',
    fileName: getTodayFileName(),
    contents: { prList: prNextStepData.data.viewer.repository.pullRequests.nodes }
  })
}

CreateData()
