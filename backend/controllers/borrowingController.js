const asyncHandler = require("express-async-handler")
const Borrowing = require("../models/borrowingModel")

//creates a borrowing record (post)(protected)
const createBorrowing = asyncHandler(async (req, res) => {
    const {
        userId,
        bookId,
        issueDate,
        deadline
    } = req.body

    if (!userId || !bookId || !issueDate || !deadline) {
        res.status(400)
        throw new Error("fields missing")
    }

    const borrowing = await Borrowing.create({
        userId,
        bookId,
        issueDate,
        deadline
    })

    res.status(200).json(borrowing)
})

//fetches a borrowing record (get:id)(protected)
const getBorrowing = asyncHandler(async (req, res) => {
    const borrowing = await Borrowing.findById(req.params.id)

    if (!borrowing) {
        res.status(400)
        throw new Error("borrowing not found")
    }

    res.status(200).json(borrowing)
})

//gets all borrowing records(get)(protected)
const getAllBorrowings = asyncHandler(async (req, res) => {
    const borrowings = await Borrowing.find()

    if (!borrowings) {
        res.status(400)
        throw new Error("no borrowings found")
    }

    res.status(200).json(borrowings)
})

//renews a borrowing (put:id)(protected)
const renewBorrowing = asyncHandler(async (req, res) => {
    const borrowing = await Borrowing.findById(req.params.id)

    if (!borrowing) {
        res.status(400)
        throw new Error("borrowing not found")
    }

    const newDeadline = req.body

    const renewedBorrowing = await Borrowing.findByIdAndUpdate(req.params.id, {deadline: newDeadline})

    res.status(200).json(renewedBorrowing)
})

//receives a borrowing (delete:id)(protected)
const receiveBorrowing = asyncHandler(async (req, res) => {
    const borrowing = await Borrowing.findById(req.params.id)

    if (!borrowing) {
        res.status(400)
        throw new Error("borrowing not found")
    }

    await borrowing.deleteOne()
    res.status(200).json(req.params.id)
})

module.exports = {
    createBorrowing,
    getBorrowing,
    getAllBorrowings,
    renewBorrowing,
    receiveBorrowing
}