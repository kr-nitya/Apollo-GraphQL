import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"; // Import startStandaloneServer

// Sample user data
const users = [
  { id: '1', name: 'John', age: 30 },
  { id: '2', name: 'Jane', age: 25 },
];

// GraphQL schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    users: [User!]!
    me: User
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    me: (_, __, context) => context.currentUser,
  },
};

// Create Apollo Server instance
// Create Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      currentUser: { id: '1', name: 'John', age: 30 }, // Hardcoded user for simplicity
    }),
  });
  
startStandaloneServer(server, { listen: { port: 3000 } })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });
