const bcrypt = require("bcrypt");
const User = require("../Models/User");
const { validationResult } = require("express-validator");
const errorFormater = require("../Utilities/errorFormater");

exports.signupGetControler = (req, res, next) => {
  res.render("pages/auth/signup.ejs", {
    title: "Create a new account",
    error: {},
    value: {},
  });
};

exports.signupPostController = async (req, res, next) => {
  const { username, email, password } = req.body;
  const error = validationResult(req).formatWith(errorFormater);
  if (!error.isEmpty()) {
    let err = error.mapped();
    return res.render("pages/auth/signup.ejs", {
      title: "Create a new account",
      error: err,
      value: { username, email, password },
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });

    const createdUser = await user.save();
    console.log(createdUser);
    res.render("pages/auth/signup.ejs", {
      title: "Create a new account",
      error: {},
      value: {},
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logingetController = (req, res, next) => {
  console.log(req.session.isLoggedIn,req.session.user);
 
  res.render("pages/auth/login", {
    title: "Login your account",
    error: {},
    value: {},
  });
};

exports.loginPostController = async (req, res, next) => {
  const { email, password } = req.body;
  const error = validationResult(req).formatWith(errorFormater);
  if (!error.isEmpty()) {
    const err = error.mapped();
    return res.render("pages/auth/login", {
      title: "Login your account",
      error: err,
      value: { email, password },
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "invalid credential",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json({
        message: "invalid credential",
      });
    }
    req.session.isLoggedIn = true
    req.session.user = user
  
    res.render("pages/auth/login", { title: "Login your account",error:{},value:{} });
  } catch (error) {
    console.log(error);
  }
};

exports.logoutController = (req, res, next) => {};
