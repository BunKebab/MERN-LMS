const asyncHandler = require("express-async-handler")
const PastBorrowing = require("../models/pastBorrowingModel")

//gets all past borrowings of a user
const getPastBorrowings = asyncHandler(async (req, res) => {
    const userId = req.params.id

    const pastBorrowings = await PastBorrowing.find({userId: userId})

    if (!pastBorrowings) {
        res.status(400)
        throw new Error("past borrowings not found")
    }

    res.status(200).json(pastBorrowings)
})

module.exports = {
    getPastBorrowings
}