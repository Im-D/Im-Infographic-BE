exports.createQuery = ({ query, variables = {} }) => {
  return JSON.stringify({ query, variables })
}