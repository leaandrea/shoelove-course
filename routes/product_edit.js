const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");

router.get("/prod_manage/:id/edit", (req, res) => {
  Product.findById(req.params.id)
    .then(updatedInfos => {
      res.render("product_edit.hbs", { sneaker: updatedInfos });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/product_edit/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => {
      console.log("successfully edited sneaker", dbRes);
      res.redirect("/prod-manage.hbs");
    })
    .catch(err => {
      console.log("Oops, error as occured, update didn't worked", err);
    });
});

module.exports = router;
