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
    default:
      "https://res.cloudinary.com/dnooohvsj/image/upload/v1561721010/shoes-folder/shoe_rqfxwu.png"
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
