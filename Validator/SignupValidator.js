const { body } = require("express-validator");
const User = require("../Models/User");
const signupValidator = [
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage("Username must be 5 to 20 carracter")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject("Username already exist");
      }
    })
    .trim(),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email already exist");
      }
    })
    .trim()
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password muste be minimum 5 chars"),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword !== req.body.password) {
      throw new Error("Password dosent match");
    }
    return true;
  }),
];

module.exports = signupValidator;
