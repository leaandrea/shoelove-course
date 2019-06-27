const mongoose = require("mongoose"); // import mongoose dependencie
const Schema = mongoose.Schema; // assign the Schema constructor to a const

const logSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String }
});

const logModel = mongoose.model("Log", logSchema); // create a model using the schema
module.exports = logModel;
