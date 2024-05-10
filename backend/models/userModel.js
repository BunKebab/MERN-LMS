const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "librarian", "member"],
        default: "member",
        required: true
    },
    campus: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("User", userSchema)