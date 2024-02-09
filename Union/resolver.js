const candies = [
  {
    "id": "gummy-bears",
    "name": "Haribo Gummy Bears",
    "price": 1.50
  },
  {
    "id": "sour-patch",
    "name": "Sour Patch Kids",
    "price": 2.50
  },
  {
    "id": "wonka-nerds",
    "name": "Wonka Nerds",
    "restockDate": "2012-04-23T18:25:43.511Z"
  },
  {
    "id": "swirly-pops",
    "name": "Swirly Pops",
    "availableRegions": ["San Jose"]
  }
];

const resolvers = {

  CandyResult: {
    __resolveType(obj) {
      if (obj.restockDate) {
        return 'OutOfStock';
      }
      if (obj.availableRegions) {
        return 'RegionUnavailability';
      }
      if (obj.price) {
        return 'Candy';
      }
      return null;
    },
  },

  Query: {
    candy: (_, args) => candies.find((candy) => candy.id === args.id),
  },
};
export {resolvers};
