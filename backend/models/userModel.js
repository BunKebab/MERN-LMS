const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    Campus: {
        type: String,
        required: false
    },
    ID: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("User", userSchema)