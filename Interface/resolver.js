const resolvers = {
  Query: {
    animals: () => {
      // Return an array containing both dogs and cats
      return [
        { id: "1", name: "Buddy", age: 3, breed: "Labrador Retriever" },
        { id: "2", name: "Whiskers", age: 2, color: "Calico" },
      ];
    },
  },
  Animal: {
    __resolveType(animal) {
      // Resolve the type of animal dynamically based on its properties
      if (animal.breed) {
        return "Dog";
      } else if (animal.color) {
        return "Cat";
      }
      return null; // In case of unexpected data
    },
  },
};

export { resolvers };
