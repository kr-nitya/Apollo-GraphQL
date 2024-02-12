import Student from "./models/Student.js";
const resolvers = {
  Query: {
    hello: () => "Hello How are you?",
    welcome: (_, params) => `Hello ${params.name}`,
    students: async () => await Student.find({}),
    student: async (_, args) => await Student.findById(args.id),
  },
  Mutation: {
    create: async (parent, args) => {
      const { firstName, lastName, age } = args;
      const newStudent = new Student({
        firstName,
        lastName,
        age,
      });
      await newStudent.save();
      return newStudent;
    },
    update: async (parent, args) => {
      const { id } = args;
      const result = await Student.findByIdAndUpdate(id, args);
      return result;
    },
    delete: async (parent, args) => {
      const { id } = args;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return deletedStudent;
    },
  },
};
export default resolvers;
