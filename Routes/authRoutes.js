const router = require("express").Router();
const passport = require("passport")
// const router = express.
const {
  signupGetControler,
  signupPostController,
  loginPostController,
  logingetController,
  logoutController,
  profileController,
} = require("../Controllers/authController");
const signupValidator = require("../Validator/SignupValidator");
const loginValidator = require("../Validator/loginValidator");

router.get("/signup", signupGetControler);
router.post("/signup", signupValidator,signupPostController);
router.get("/login", logingetController);
router.post("/login", loginValidator,loginPostController);
router.get("/logout", logoutController);
router.get("/profile",passport.authenticate('jwt', { session: false }),profileController)
module.exports = router
