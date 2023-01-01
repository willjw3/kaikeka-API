// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import { Resolvers } from './__generated__/resolvers-types.js';


export const resolvers: Resolvers = {
    Query: {
      users: (_, __, contextValue) => contextValue.dataSources.usersAPI.getUsers(),
    },
  };