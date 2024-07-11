const express = require("express")
const router = express.Router()
const {getPastBorrowingsByEmail} = require("../controllers/pastBorrowingController")
//route protection
const {
    protect,
} = require("../middleware/authMiddleware")

router.route("/:email").get(protect, getPastBorrowingsByEmail)

module.exports = router