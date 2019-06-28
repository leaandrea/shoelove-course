const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");
const Tag = require("../models/Tag");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/collection", (req, res) => {
  Promise.all([
    Product.find().catch(error => console.log(error)),
    Tag.find().catch(error => console.error(error))
  ]).then(values => {
    let shoes = values[0];
    let tags = values[1];
    let collectionName = "whole";
    let count = shoes.length;
    let wholeCollection = true;
    res.render("products", {
      shoes,
      collectionName,
      count,
      wholeCollection,
      tags
    });
  });
});

router.get("/women", (req, res) => {
  Promise.all([
    Product.find({ category: "Women" }).catch(error => console.log(error)),
    Tag.find().catch(error => console.error(error))
  ]).then(values => {
    let shoes = values[0];
    let tags = values[1];
    let collectionName = "women";
    let count = shoes.length;
    res.render("products", { shoes, collectionName, count, tags });
  });
});

router.get("/men", (req, res) => {
  Promise.all([
    Product.find({ category: "Men" }).catch(error => console.log(error)),
    Tag.find().catch(error => console.error(error))
  ]).then(values => {
    let shoes = values[0];
    let tags = values[1];
    let collectionName = "men";
    let count = shoes.length;
    res.render("products", { shoes, collectionName, count, tags });
  });
});

router.get("/kids", (req, res) => {
  Promise.all([
    Product.find({ category: "Kids" }).catch(error => console.log(error)),
    Tag.find().catch(error => console.error(error))
  ])
  .then(values => {
    let shoes = values[0];
    let tags = values[1];
    let collectionName = "kids";
    let count = shoes.length;
    res.render("products", { shoes, collectionName, count, tags });
  });
});

router.get("/one-product", (req, res) => {
  res.render("one_product");
});

module.exports = router;
