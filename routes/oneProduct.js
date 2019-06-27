const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");

router.get("/oneProduct/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(shoes => {
      res.render("one_product.hbs", { shoes });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
