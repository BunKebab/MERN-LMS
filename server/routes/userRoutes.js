const express = require("express")
const router = express.Router()

//controllers
const {
    registerUser,
    getAllUsers,
    removeUser
} = require("../controllers/userController")

//route protection
const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware")

router.get("/", protect, adminOnly, getAllUsers)
router.delete("/:id", protect, adminOnly, removeUser)
router.post("/", protect, adminOnly, registerUser)

module.exports = router