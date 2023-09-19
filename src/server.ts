import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema/index.js';
import resolvers from './resolvers/index.js';
import { type ApolloContext, createContext } from './middleware/context.js';

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: createContext,
});

console.log(`GraphQL running on ${url}`);
