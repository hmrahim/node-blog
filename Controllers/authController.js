const bcrypt = require("bcrypt");
const User = require("../Models/User");
const { validationResult } = require("express-validator");
const errorFormater = require("../Utilities/errorFormater");
const jwt = require('jsonwebtoken');


exports.signupGetControler = (req, res, next) => {

};

exports.signupPostController = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const error = validationResult(req).formatWith(errorFormater);
  if (!error.isEmpty()) {
    let err = error.mapped();
    return res.send(err);
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
    return res.send(createdUser)

  } catch (error) {
    console.log(error);
  }
};

exports.logingetController = (req, res, next) => {

};

exports.loginPostController = async (req, res, next) => {
  const { email, password } = req.body;
  const error = validationResult(req).formatWith(errorFormater);
  if (!error.isEmpty()) {
    const err = error.mapped();
 return res.status(500).send({
  error:err
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
    const payload = {
      id: user._id,
      email:user.email
    }
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"2d"})
return res.status(200).send({
  user:user,
  token:`Bearer ${token}`
})
  } catch (error) {
    console.log(error);
  }
};

exports.logoutController = (req, res, next) => {
  req.session.destroy(error=> {
    console.log(error);
    next(error)
  })
   res.redirect('/auth/login');
};


exports.profileController= (req,res,next)=> {
  res.send({
    user:req.user
  })
}