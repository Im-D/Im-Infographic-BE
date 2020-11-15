interface Query {
  query: string
  variables?: Object
}

export const createQuery = ({ query, variables = {} }: Query): string => {
  return JSON.stringify({ query, variables })
}