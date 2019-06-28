const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productAddedSchema = new Schema({
  name: { type: String },
  ref: { type: String },
  size: { type: Number },
  price: { type: String },
  image_product: {
    type: String
  }
});

const productAdded = mongoose.model("cart", productAddedSchema);
module.exports = productAdded;
