const asyncHandler = require("express-async-handler")
const Borrowing = require("../models/borrowingModel")
const PastBorrowing = require("../models/pastBorrowingModel")

//calculate fine
const calculateFine = async (borrowing) => {
    const fineRate = 10
    const currentDate = new Date()
    const dueDate = new Date(borrowing.deadline)

    let fine = 0
    if (currentDate > dueDate) {
        const timeDiff = currentDate - dueDate
        const daysOverdue = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) // Convert time difference to days
        fine = daysOverdue * fineRate
    }

    // Update the fine in the database
    borrowing.fine = fine
    await borrowing.save()

    return fine
}

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

    const checkUser = await Borrowing.findOne({userId})
    const checkBook = await Borrowing.findOne({bookId})

    if (checkUser || checkBook) {
        res.status(400)
        throw new Error("cannot create borrowing, user or book already present")
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

    await calculateFine(borrowing)

    res.status(200).json(borrowing)
})

//gets all borrowing records(get)(protected)
const getAllBorrowings = asyncHandler(async (req, res) => {
    const borrowings = await Borrowing.find()

    if (!borrowings) {
        res.status(400)
        throw new Error("no borrowings found")
    }

    for (const borrowing of borrowings) {
        await calculateFine(borrowing)
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

    const {newDeadline} = req.body

    if (!newDeadline) {
        res.status(400)
        throw new Error("deadline not provided")
    }

    const renewedBorrowing = await Borrowing.findByIdAndUpdate(req.params.id, {
        deadline: newDeadline,
        renewed: true
    }, {
        new: true
    })

    res.status(200).json(renewedBorrowing)
})

//receives a borrowing (delete:id)(protected)
const receiveBorrowing = asyncHandler(async (req, res) => {
    const borrowing = await Borrowing.findById(req.params.id)

    const {
        userId,
        bookId,
        issueDate
    } = borrowing

    const returnDate = new Date()

    if (!borrowing) {
        res.status(400)
        throw new Error("borrowing not found")
    }

    await borrowing.deleteOne()

    await PastBorrowing.create({
        userId,
        bookId,
        issueDate,
        returnDate
    })

    res.status(200).json(req.params.id)
})

module.exports = {
    createBorrowing,
    getBorrowing,
    getAllBorrowings,
    renewBorrowing,
    receiveBorrowing
}