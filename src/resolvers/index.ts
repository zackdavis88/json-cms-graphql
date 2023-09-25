import userResolvers from './user/index.js';
import authResolvers from './auth/index.js';

const resolvers = {
  Query: {
    app_name: () => 'json_cms_query',
    ...authResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    app_name: () => 'json_cms_mutation',
    ...userResolvers.Mutation,
  },
};

export default resolvers;
