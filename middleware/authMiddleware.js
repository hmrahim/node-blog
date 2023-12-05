const User = require("../Models/User");

const bindUserWithRequiest = async () => {
  return (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return next();
    }
    try {
      const user = User.findById(req.session.user._id);
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

module.exports = bindUserWithRequiest;
