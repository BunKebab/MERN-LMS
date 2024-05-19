const express = require("express")
const router = express.Router()

//controllers
const {
    loginUser,
    logoutUser,
    getMe
} = require("../controllers/authController")

//route protection
const {
    protect
} = require("../middleware/authMiddleware")

router.post("/login", loginUser)
router.post("/logout", protect, logoutUser)
router.get("/getUser", protect, getMe)

module.exports = router