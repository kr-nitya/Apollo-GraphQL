import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';

// Define your GraphQL schema
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create an Apollo Server instance with cache configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new InMemoryLRUCache({
    // ~100MiB
    maxSize: Math.pow(2, 20) * 100,
    // 5 minutes (in seconds)
    ttl: 300,
  }),
});

// Start the server
startStandaloneServer(server, { listen: { port: 4000 } })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });
