const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

//M EJS
app.use(expressLayouts);
app.set("views engine", "ejs");
//Import Routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

app.listen(3100, function () {
  console.log("Server Connected");
});
