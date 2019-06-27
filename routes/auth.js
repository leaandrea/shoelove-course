const express = require("express");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("login");
});
// User model
const UserLog = require("../models/UserLog");
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  UserLog.create({
    username,
    password: hashPass
  })
    .then(() => {
      if (email === "" || password === "") {
        res.render("login", {
          errorMessage: "Indicate a username and a password to sign up"
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
