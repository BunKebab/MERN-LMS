const express = require("express")
const router = express.Router()
const { createBorrowing, getBorrowing, getAllBorrowings, receiveBorrowing, renewBorrowing } = require("../controllers/borrowingContoller")

router.route("/").post(createBorrowing).get(getAllBorrowings)
router.route("/:id").get(getBorrowing).delete(receiveBorrowing).put(renewBorrowing)

module.exports = router