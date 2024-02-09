import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from "./resolver.js";
import {readFileSync} from "fs";
const typeDefs = readFileSync("./ScalerSchema.graphql",'utf-8');
const server = new ApolloServer({
    typeDefs,
    resolvers
});
startStandaloneServer(server,{listen:{port:3000}})
.then(({url})=>{
    console.log(`Server Start at ${url}`);
})
.catch((err)=>{
    console.log("Error = ",err);
    
})