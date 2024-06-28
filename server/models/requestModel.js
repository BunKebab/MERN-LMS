const mongoose = require("mongoose")

const requestSchema = mongoose.Schema({
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
    requestType: {
        type: String,
        enum: ["Borrow", "Renew"],
        required: true
    },
    borrowingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Borrowing",
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Request", requestSchema)