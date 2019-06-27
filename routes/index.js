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
  ]).then(values => {
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

//-------------------------------------------------------
// LOGIN LOGOUT PART
//-------------------------------------------------------
const UserLog = require("../models/UserLog"); // UserLog model
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  UserLog.create({
    email,
    password: hashPass
  })
    .then(() => {
      if (email === "" || password === "") {
        res.render("login", {
          errorMessage: "Indicate an email and a password to sign up"
        });
        return;
      }
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

const User = require("../models/User"); // UserLog model
router.get("/signup", (req, res, next) => {
  res.render("signup");
});
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.findOne({ username: username }).then(user => {
    if (user !== null) {
      res.render("signup", {
        errorMessage: "The username already exists!"
      });
      return;
    }
  });

  User.create({
    username,
    lastname,
    email,
    password: hashPass
  })
    .then(() => {
      if (username === "" || password === "") {
        res.render("signup", {
          errorMessage: "Indicate an email and a password to sign up"
        });
        return;
      }
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});
//-------------------------------------------------------
// END OF LOGIN LOGOUT
//-------------------------------------------------------

module.exports = router;
