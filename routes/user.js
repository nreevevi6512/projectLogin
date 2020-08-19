const express = require("express");
const router = express.Router();

//Login
router.get("/login", (req, res) => res.render("LogIn"));

//Register
router.get("/Register", (req, res) => res.render("Register"));

module.exports = router;
