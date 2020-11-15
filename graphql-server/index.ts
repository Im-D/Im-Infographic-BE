import { request } from "./utils/Fetch.ts";
import * as UserQuery from "./query/User.ts";

console.log(UserQuery)

// Author
// request({ query: UserQuery.AUTHOR_QUERY }).then(({ data }) => {
//   console.log('===Author===', data)

//   // const edges = data.viewer.repository.collaborators.edges || []
//   // const collaborators = edges
//   //   .filter((item) => item.node.id !== 'MDQ6VXNlcjYwOTIwMTYw')
//   //   .reduce((acc, { node }) => {
//   //     acc[node.id] = node
//   //     return acc
//   //   }, {})


//   // console.log(collaborators)
// })