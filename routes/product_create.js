const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");
const Tag = require("../models/Tag");

router.get("/prod-add", (req, res) => {
  Tag.find()
  .then (tags => {
    res.render("products_add", {tags});
  })
  .catch(error => console.error(error))
});

router.post("/prod-add", (req, res) => {
  const { name, ref, size, description, price, category, id_tag } = req.body;
  Promise.all([Product.create({
    name,
    ref,
    size,
    description,
    price,
    category,
  }), Product.populate("id_tag", ["label"])])
    .then(newShoe => {
      console.log("new product added:", newShoe);
      res.redirect("/prod-manage");
    })
    .catch(error => console.error("error creating product:", error));
});

router.post("/tag-add", (req, res) => {
  const label = req.body;
  Tag.create(label)
    .then(newTag => {
      console.log("new tag added:", newTag);
      res.redirect("/prod-add");
    })
    .catch(error => {
      console.log("error adding tag:", error);
      res.redirect("/prod-add");
    });
});

module.exports = router;
