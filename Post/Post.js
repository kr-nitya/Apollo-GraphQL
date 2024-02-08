import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from 'fs';

// Read the schema file
const typeDefs = readFileSync('./postSchema.graphql', 'utf8');

// Sample data for demonstration
let posts = [
  { id: '1', title: 'First Post', content: 'This is the content of the first post', author: 'John Doe' },
  { id: '2', title: 'Second Post', content: 'This is the content of the second post', author: 'Jane Smith' }
];

const resolvers = {
  Query: {
    posts: () => posts,
    post: (_, { id }) => posts.find(post => post.id === id)
  },
  Mutation: {
    createPost: (_, { title, content, author }) => {
      const post = { id: String(posts.length + 1), title, content, author };
      posts.push(post);
      return post;
    },
    updatePost: (_, { id, title, content, author }) => {
      const postIndex = posts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      if (title) {
        posts[postIndex].title = title;
      }
      if (content) {
        posts[postIndex].content = content;
      }
      if (author) {
        posts[postIndex].author = author;
      }
      return posts[postIndex];
    }
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

startStandaloneServer(server, { listen: { port: 4000 } })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });
