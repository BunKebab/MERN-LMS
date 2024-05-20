const mongoose = require("mongoose")

const borrowingSchema = mongoose.Schema({
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
    issueDate: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    fine: {
        type: Number,
        required: false
    },
    renewed: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model("Borrowing", borrowingSchema)