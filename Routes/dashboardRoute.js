const { dashboardGetController } = require("../Controllers/dashboardController")
const { isAuthenticets } = require("../middleware/authMiddleware")

const router = require("express").Router()

router.get("/",isAuthenticets,dashboardGetController)


module.exports = router