const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("express-flash");
const app = express();
const methodOverride = require("method-override");
const passport = require("passport");
require("dotenv/config");

//passportconfig
require("./config/passport")(passport);

//M EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//BODYparser
app.use(express.urlencoded({ extended: false }));

//express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
//connect flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("sucess_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Import Routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

//COnnect To DB
mongoose.connect(
  process.env.DB_connect,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connnected to DB")
);
//LISTEN
app.listen(3100, function () {
  console.log("Server Connected");
});
