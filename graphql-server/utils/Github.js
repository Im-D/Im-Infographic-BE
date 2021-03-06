const { Octokit } = require("@octokit/rest");
const { writeFile } = require('./File');

const encodeBase64 = (contents) => {
  return Buffer.from(contents).toString('base64')
}

const createCommit = ({ path, fileName }) => {
  return `create : ${path}/${fileName}.json`
}

exports.creatCommit = async ({ path, fileName, contents }) => {
  const octokit = await new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  if (process.env.NODE_ENV === 'develop') {
    writeFile({ fileDirName: path, data: contents })
  } else {
    try {
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.OWNER,
        repo: process.env.REPO_NAME,
        path: `data/${path}/${fileName}.json`,
        message: createCommit({ path, fileName }),
        content: encodeBase64(JSON.stringify(contents)),
        committer: {
          name: process.env.USER_NAME,
          email: process.env.USER_EMAIL
        },
        author: {
          name: process.env.USER_NAME,
          email: process.env.USER_EMAIL
        }
      })
      console.log(`Success ${path}/${fileName}.json`)
    } catch (e) {
      console.log(`Error ${e} / ${path}/${fileName}`)
    }
  }
}