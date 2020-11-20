const { Octokit } = require("@octokit/rest");

const encodeBase64 = (contents) => {
  return Buffer.from(contents).toString('base64')
}

const createCommit = ({ path, fileName }) => {
  return `create : ${path}/${fileName}.json`
}

exports.creatCommit = ({ path, fileName, contents }) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  octokit.repos.createOrUpdateFileContents({
    owner: process.env.OWNER,
    repo: process.env.REPO_NAME,
    path: `data/${path}/${fileName}.json`,
    message: createCommit({ path, fileName }),
    content: encodeBase64(contents),
    committer: {
      name: process.env.USER_NAME,
      email: process.env.USER_EMAIL
    },
    author: {
      name: process.env.USER_NAME,
      email: process.env.USER_EMAIL
    }
  }).then(() => {
    console.log(`Success ${path}/${fileName}.json`)
  })
}