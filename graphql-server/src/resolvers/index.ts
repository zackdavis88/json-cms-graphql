import userResolvers from './user/index.js';

const resolvers = {
  Query: {
    app_name: () => 'terraformer_query',
  },
  Mutation: {
    app_name: () => 'terraformer_mutation',
    ...userResolvers.Mutation,
  },
};

export default resolvers;
