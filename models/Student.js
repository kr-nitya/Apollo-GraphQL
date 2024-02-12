import mongoose from "mongoose";

const Student = mongoose.model("Student", {
  firstName: String,
  lastName: String,
  age: Number,
});

export default Student;
