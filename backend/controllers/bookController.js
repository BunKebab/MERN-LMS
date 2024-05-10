const Book = require("../models/bookModel")

createBook = async (req, res) => {
    if(!req.body.title || !req.body.author || !req.body.isbn || !req.body.refId || !req.body.campus){
        res.status(400).json({message: "please fill all fields"})
    }

    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        refId: req.body.refId,
        campus: req.body.campus
    })
    res.status(200).json(book)
}

deleteBook = async (req, res) => {
    const book = await Book.findById(req.params.id)

    if(!book){
        res.status(400).json({message: "book not found"})
    }

    await book.deleteOne()
    
    res.status(200).json({message: "book deleted"})
}

updateBook = async (req, res) => {
    const book = await Book.findById(req.params.id)

    if(!book){
        res.status(400).json({message: "book not found"})
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedBook)
}

getAllBooks = async (req, res) => {
    const books = await Book.find()

    res.status(200).json(books)
}

getBook = async (req, res) => {
    const book = await Book.findById(req.params.id)
    res.status(200).json(book)
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getBook
}