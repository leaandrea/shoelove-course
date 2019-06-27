const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");

router.get("/prod-manage", (req, res) => {
  res.render("products_manage");
});

router.post("/deleteproduct/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(dbRes => {
      console.log(dbRes);
      res.redirect("/prod-manage");
    })
    .catch(err => console.log(err));
});

module.exports = router;
