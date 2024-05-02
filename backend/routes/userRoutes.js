const express = require("express")
const router = express.Router()
const { registerUser, fetchUser, removeUser, updateUser } = require("../controllers/userController")

router.route("/").post(registerUser).get(fetchUser)
router.route("/:id").put(updateUser).delete(removeUser)

module.exports = router