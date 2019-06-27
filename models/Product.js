const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  ref: { type: String },
  size: { type: Number },
  description: { type: String },
  price: { type: Number },
  category: {
    type: String,
    enum: ["men", "Women", "Kids"]},
  id_tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag"
  },
  }),


const Product = mongoose.model("Product", productSchema);
model.exports = Product;
