const express = require("express")
const router = express.Router()
const {
    registerUser,
    getUser,
    getAllUsers,
    updatePassword,
    removeUser
} = require("../controllers/userController")

router.get("/", getAllUsers)
router.get("/:id", getUser)
router.put("/update/:id", updatePassword)
router.delete("/:id", removeUser)
router.post("/register", registerUser)

module.exports = router