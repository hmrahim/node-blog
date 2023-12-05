const User = require("../Models/User");
exports.bindUserWithRequiest = () => {
  return async (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return next();
    }
    try {
      const user = await User.findById(req.session.user._id);
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

exports.isAuthenticets = (req, res, next) => {
    if(!req.session.isLoggedIn){
         res.redirect('/auth/login');
    }
    next()
};
