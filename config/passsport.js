const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Loaduser
const User = require("../models/User");
const { deleteOne } = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, dont) => {
      //MATCH USER
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return deleteOne(null, false, {
              message: "Email is not Registered",
            });
          }
          //match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );
};

passport.serializeUser((user, done) => {
  done(nulee, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
