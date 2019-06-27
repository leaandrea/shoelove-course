const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  label: { type: String, enum: ["Friendly", "Urban style", "Dope"] }
});

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
