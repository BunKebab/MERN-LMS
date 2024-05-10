const Borrowing = require("../models/borrowingModel")
const Book = require("../models/bookModel")
const User = require("../models/userModel")

createBorrowing = async (req, res) => {
    const { userId, bookId } = req.body
    const issueDate = new Date()
    const deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)

    if(!userId || !bookId || !issueDate || !deadline){
        res.status(400).json({message: "invalid request"})
    }

    const borrowing = Borrowing.create({
        userId,
        bookId,
        issueDate,
        deadline
    })

    res.status(200).json(borrowing)
}

getBorrowing = async (req, res) => {
    const borrowing = await Borrowing.findOne(req.params.id)

    if(!borrowing){
        res.status(400).json({message: "borrowing entry not found"})
    }

    res.status(200).json({borrowing})
}

getAllBorrowings = async (req, res) => {
    const borrowings = await Borrowing.find()
    borrowings.forEach(borrowing => {
        if(borrowing.deadline < new Date()){
            borrowing.fine = calculateFine(borrowing.deadline)
        }
    })

    res.status(200).json(borrowings)
}

receiveBorrowing = async (req, res) => {
    const borrowing = await Borrowing.findOne(req.params.id)
    if(!borrowing){
        res.status(400).json({message: "borrowing entry doesn't exist"})
    }

    await Borrowing.deleteOne(req.params.id)
    res.status(200).json({mesasge: "borrowing entry deleted"})
}

renewBorrowing = async (req, res) => {
    const borrowing = await Borrowing.findOne(req.params.id)

    if(!borrowing){
        res.status(400).json({message: "borrowing entry not found"})
    }

    if(borrowing.renewed){
        res.status(400).json({message: "book already renewed"})
    }

    borrowing.deadline.setDate(borrowing.deadline.getDate() + 7)
    await borrowing.save()

    res.status(200).json(borrowing)
}

const calculateFine = (deadline) => {
    const currentDate = new Date()
    const differenceInDays = Math.floor((currentDate - deadline) / (24 * 60 * 60 * 1000))
    const finePerDay = 10
    const fine = Math.max(0, differenceInDays * finePerDay)
    return fine
}

module.exports = {
    createBorrowing,
    getBorrowing,
    getAllBorrowings,
    receiveBorrowing,
    renewBorrowing,
}