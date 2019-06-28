const express = require("express");
const router = express.Router();

//-------------------------------------------------------
// LOGIN PART
//-------------------------------------------------------
const UserLog = require("../models/UserLog"); // UserLog model
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
router.get("/login", (req, res, next) => {
  res.render("auth/login");
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

//-------------------------------------------------------
// SIGNUP PART
//-------------------------------------------------------

const User = require("../models/User"); // UserLog model
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
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

module.exports = router;
