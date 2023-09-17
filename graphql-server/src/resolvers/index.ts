import books from './book/index.js';

const resolvers = {
  Query: {
    app_name: () => 'terraformer_query',
    ...books.Query,
  },
  Mutation: {
    app_name: () => 'terraformer_mutation',
  },
};

export default resolvers;
