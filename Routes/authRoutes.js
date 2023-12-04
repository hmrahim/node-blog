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

router.get("/signup", signupGetControler);
router.post("/signup", signupValidator,signupPostController);
router.get("/login", logingetController);
router.post("/login", loginPostController);
router.get("/logout", logoutController);

module.exports = router
