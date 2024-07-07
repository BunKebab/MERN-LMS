const express = require("express")
const router = express.Router()

//controllers
const {
    createBook,
    getBook,
    getAllBooks,
    updateBook,
    deleteBook
} = require("../controllers/bookController")

//route protection
const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware")

router.route("/").post(protect, adminOnly, createBook).get(protect, getAllBooks)
router.route("/:id").get(getBook).put(protect, adminOnly, updateBook).delete(protect, adminOnly, deleteBook)

module.exports = router