import { ApolloServer } from "apollo-server";
import Keyv from 'keyv';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';

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

// Create a Keyv instance for caching
const keyv = new Keyv();

// Create an Apollo Server instance with cache configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new KeyvAdapter(keyv),
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
