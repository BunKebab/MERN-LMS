const mongoose = require("mongoose")

const pastBorrowingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    refId: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("PastBorrowing", pastBorrowingSchema)