const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");

router.get("/prod-manage", (req, res) => {
  Product.find()
    .then(shoes => {
      res.render("products_manage", { shoes });
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/deleteproduct/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(shoes => {
      console.log(shoes);
      res.redirect("/prod-manage");
    })
    .catch(err => console.log(err));
});

module.exports = router;
