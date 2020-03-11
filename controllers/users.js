const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
  res.render("users/new.ejs",  { currentUser: req.session.currentUser });
});

router.post("/", (req, res) => {
  req.body.username = req.body.username.toLowerCase()
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = router;