const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

//create a book record (post)
const createBook = asyncHandler(async (req, res) => {
  try {
    const { title, author, category, isbn, refId } = req.body;

    if (!title || !author || !category || !isbn || !refId) {
      res.status(400).json({ message: "please fill all fields" });
      throw new Error();
    }

    const book = await Book.create({
      title,
      author,
      category,
      isbn,
      refId,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json("somthing went wrong, try again");
    throw error;
  }
});

//fetches all book records (get)
const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find();

    if (!books) {
      res.status(400).json({ message: "no books found" });
      throw new Error();
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//updates a book record (put:id)
const updateBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400).json({ message: "book not found" });
      throw new Error();
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//deletes a book record (delete:id)
const deleteBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400).json({ message: "book not found" });
      throw new Error();
    }

    await book.deleteOne();
    res.json(req.params.id);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
