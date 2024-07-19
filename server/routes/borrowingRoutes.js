const express = require("express")
const router = express.Router()

//controllers
const {
    createBorrowing,
    getAllBorrowings,
    renewBorrowing,
    receiveBorrowing
} = require("../controllers/borrowingController")

//route protection
const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware")

router.route("/").post(protect, adminOnly, createBorrowing).get(protect, adminOnly, getAllBorrowings)
router.route("/:id").put(protect, adminOnly, renewBorrowing).delete(protect, adminOnly, receiveBorrowing)

module.exports = router