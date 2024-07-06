const express = require("express")
const router = express.Router()

//controllers
const {
    loginUser,
    updatePassword,
    getMe
} = require("../controllers/authController")

//route protection
const {
    protect
} = require("../middleware/authMiddleware")

router.post("/", loginUser)
router.put("/:id", protect, updatePassword)
router.get("/getUser", protect, getMe)

module.exports = router