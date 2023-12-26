const User = require("../Models/User");
require("dotenv").config();
const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({_id: jwt_payload.id })
      .then((res) => {
        return done(null, res);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
