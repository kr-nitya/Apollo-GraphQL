// resolver.js

// Define sample data
const books = [
    { title: "Book 1" },
    { title: "Book 2" },
  ];
  
  const authors = [
    { name: "Author 1" },
    { name: "Author 2" },
  ];
  
  const resolvers = {
    Query: {
      search: (_, { contains }) => {
        // Filter books and authors based on the contains parameter
        const filteredBooks = books.filter(book => book.title.includes(contains));
        const filteredAuthors = authors.filter(author => author.name.includes(contains));
  
        // Concatenate and return the filtered results
        return [...filteredBooks, ...filteredAuthors];
      }
    },
    SearchResult: {
      __resolveType(obj, contextValue, info) {
        // Resolve the type of SearchResult dynamically based on the object's properties
        if (obj.title !== undefined) {
          return 'Book';
        }
        if (obj.name !== undefined) {
          return 'Author';
        }
        return null;
      }
    }
  };
  
  export { resolvers };
  