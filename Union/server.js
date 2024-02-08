import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import { startStandaloneServer } from "@apollo/server/standalone"; // Import startStandaloneServer

import { resolvers } from './resolver.js';

const typeDefs = readFileSync('./schema.graphql', 'utf8');
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the standalone server using startStandaloneServer
startStandaloneServer(server, { listen: { port: 3000 } })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });
