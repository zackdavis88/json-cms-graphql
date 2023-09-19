import userResolvers from './user/index.js';

const resolvers = {
  Query: {
    app_name: () => 'json_cms_query',
  },
  Mutation: {
    app_name: () => 'json_cms_mutation',
    ...userResolvers.Mutation,
  },
};

export default resolvers;
