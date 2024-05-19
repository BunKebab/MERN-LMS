const express = require("express")
const router = express.Router()

//controllers
const {
    registerUser,
    getUser,
    getAllUsers,
    updatePassword,
    removeUser
} = require("../controllers/userController")

//route protection
const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware")

router.get("/", protect, adminOnly, getAllUsers)
router.get("/:id", protect, adminOnly, getUser)
router.put("/update/:id", protect, updatePassword)
router.delete("/:id", protect, adminOnly, removeUser)
router.post("/register", protect, adminOnly, registerUser)

module.exports = router