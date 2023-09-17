import books from './book/index.js';

export default {
  Query: {
    app_name: () => 'terraformer_query',
    ...books.Query,
  },
  Mutation: {
    app_name: () => 'terraformer_mutation',
  },
};
