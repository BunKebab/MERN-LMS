const asyncHandler = require("express-async-handler")
const Book = require("../models/bookModel")

const createBook = asyncHandler(async (req, res) => {
    const {
        title,
        author,
        category,
        isbn,
        refId
    } = req.body

    if (!title || !author || !category || !isbn || !refId) {
        res.status(400)
        throw new Error("please fill all text fields")
    }

    const book = await Book.create({
        title,
        author,
        category,
        isbn,
        refId
    })
    res.status(200).json(book)
})

const getBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error("book not found")
    }

    res.status(200).json(book)
})

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find()

    if (!books) {
        res.status(400)
        throw new Error("no books found")
    }
    
    res.status(200).json(books)
})

const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error("book not found")
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedBook)
})

const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error("book not found")
    }

    await book.deleteOne()
    res.json(req.params.id)
})

module.exports = {
    createBook,
    getBook,
    getAllBooks,
    updateBook,
    deleteBook
}