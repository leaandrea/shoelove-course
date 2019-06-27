const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/collection", (req, res) => {
  Product.find()
  .then(shoes => {
    let collectionName = "whole";
    let count = shoes.length;
    let wholeCollection = true;
    res.render("products", { collectionName, count, wholeCollection });  
  })
  .catch(error => console.log(error))
});

router.get("/women", (req, res) => {
  Product.find({ category: "Women" })
    .then(shoes => {
      let collectionName = "women";
      let count = shoes.length;
      res.render("products", { shoes , collectionName, count});
    })
    .catch(error => {
      console.error(error);
    });
});

router.get("/men", (req, res) => {
  Product.find({ category: "Men" })
    .then(shoes => {
      let collectionName = "men";
      let count = shoes.length;
      res.render("products", { shoes, collectionName, count});
    })
    .catch(error => {
      console.error(error);
    });
});

router.get("/kids", (req, res) => {
  Product.find({ category: "Kids" })
    .then(shoes => {
      let collectionName = "kids";
      let count = shoes.length;
      res.render("products", { shoes, collectionName, count});
    })
    .catch(error => {
      console.error(error);
    });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/one-product", (req, res) => {
  res.render("one_product");
});

module.exports = router;
