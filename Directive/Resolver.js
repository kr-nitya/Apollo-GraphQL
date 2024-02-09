const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
  // Define the resolver for the directive
  // This resolver will modify the resolved value to uppercase if the directive is applied
  // The `next` function is used to execute the resolver of the field being modified
  // The `source` parameter contains the resolved value of the field
  // The `args` parameter contains the arguments passed to the field (if any)
  // The `context` parameter contains the context of the request
  // The `info` parameter contains information about the execution
  // The resolver should return the modified value
  // If the directive is not applied, the resolver simply returns the original value
  String: {
    __resolveField: (source, args, context, info) => {
      if (
        info.path.prev &&
        info.path.prev.directives &&
        info.path.prev.directives.some(
          (directive) => directive.name.value === "uppercase"
        )
      ) {
        return source.toUpperCase();
      }
      return source;
    },
  },
};
export { resolvers };
