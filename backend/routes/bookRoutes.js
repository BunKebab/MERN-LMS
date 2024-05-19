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

router.route("/").post(createBook).get(getAllBooks)
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook)

module.exports = router