const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    collection: "Students",
  }
);

module.exports = mongoose.model("Students", studentSchema);

/*
A schema is a blueprint that defines the structure and validation 
rules for documents in a MongoDB collection. In this case, 
it's defining the schema for student documents.
*/