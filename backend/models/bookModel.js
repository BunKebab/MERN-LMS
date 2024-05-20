const mongoose = require ("mongoose")

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Non-fiction", "Helping-book", "Novel"],
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    refId: {
        type: String,
        required: true,
        unqiue: true
    }
})

module.exports = mongoose.model("Book", bookSchema)