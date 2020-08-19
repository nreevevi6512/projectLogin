const express = require("express");
const router = express.Router();

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
  if (password !== password2) {
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
    res.send("YOU PASS");
  }
});

module.exports = router;
