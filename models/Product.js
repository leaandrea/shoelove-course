const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  ref: { type: String },
  size: { type: Number },
  description: { type: String },
  price: { type: String },
  category: { type: String },
  id_tag: { type: Schema.Types.ObjectId, ref: "Tag" },
  image_product: {
    type: String,
    default: "/medias/img/shoe.png"
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
