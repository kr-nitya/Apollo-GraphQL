import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from 'fs';
import { resolvers } from './resolver.js';
const typeDefs = readFileSync('./schema.graphql', 'utf8');

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the standalone server
startStandaloneServer(server, { listen: { port: 4000 } })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });
