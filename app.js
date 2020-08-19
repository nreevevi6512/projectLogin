const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();

//M EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
//Import Routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

//COnnect To DB
mongoose.connect(
  process.env.DB_connect,
  { urlNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);
//LISTEN
app.listen(3100, function () {
  console.log("Server Connected");
});
