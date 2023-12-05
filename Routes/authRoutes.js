const router = require("express").Router();
// const router = express.
const {
  signupGetControler,
  signupPostController,
  loginPostController,
  logingetController,
  logoutController,
} = require("../Controllers/authController");
const signupValidator = require("../Validator/SignupValidator");
const loginValidator = require("../Validator/loginValidator");

router.get("/signup", signupGetControler);
router.post("/signup", signupValidator,signupPostController);
router.get("/login", logingetController);
router.post("/login", loginValidator,loginPostController);
router.get("/logout", logoutController);

module.exports = router
