import { ApolloServer } from '@apollo/server';
import { RedisCache } from 'apollo-server-cache-redis';
import { startStandaloneServer } from "@apollo/server/standalone";
import redis from 'redis';
import dotenv from "dotenv";
dotenv.config();
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

// Create a Redis client
const redisClient = redis.createClient({
  host: process.env.HOST,
  port: process.env.PORT,
  password:process.env.PASSWORD,
});

// Create an Apollo Server instance with Redis cache configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new RedisCache({
    client: redisClient,
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


