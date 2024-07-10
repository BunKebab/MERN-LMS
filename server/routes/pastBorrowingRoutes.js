const express = require("express")
const router = express.Router()
const {getPastBorrowings} = require("../controllers/pastBorrowingController")
//route protection
const {
    protect,
} = require("../middleware/authMiddleware")

router.route("/:id").get(protect, getPastBorrowings)

module.exports = router