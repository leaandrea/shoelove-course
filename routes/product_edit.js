const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");

router.get("/product_edit/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(shoes => {
      res.render("product_edit.hbs", { shoes });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/product_edit/:id", (req, res) => {
  console.log(req.body);

  Product.findByIdAndUpdate(req.params.id, req.body)

    .then(dbRes => {
      console.log("successfully edited sneaker", dbRes);
      res.redirect("/prod-manage");
    })
    .catch(err => {
      console.log("Oops, error as occured, update didn't worked", err);
    });
});

module.exports = router;
