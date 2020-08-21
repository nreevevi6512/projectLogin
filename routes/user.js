const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//USER MODEL
const User = require("../models/User");

//Login
router.get("/login", (req, res) => res.render("LogIn"));

//Register
router.get("/Register", (req, res) => res.render("Register"));

//Register handle
router.post("/Register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //CHECK Field
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "FILL UP THE REQUIREMENTS" });
  }

  //CHECK PASSWORD
  if (password != password2) {
    errors.push({ msg: "PASSWORD DO NOT MATCH" });
  }
  //CHECK PASSWORD
  if (password.length < 6) {
    errors.push({ msg: "PASSWORD SHOULD BE ALTEAST 6 CHARACTERS" });
    if (errors.length > 0) {
      res.render("Register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    }
  } else {
    //VALIDATION
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //USER EXISTS
        errors.push({ msg: "Email is already Exist" });
        res.render("Register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        //hashpassword
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (err) throw err;
            //Setpassword to hash
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "YOUR ARE NOW REGISTER");
                res.redirect("/user/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = router;
