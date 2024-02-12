import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolver.js";
import typeDefs from "./models/typeDefs.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//Database Connection
const URL = process.env.URL;
mongoose.connect(URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch(err => {
    console.log(err.message);
  });
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
