const mongoose = require('mongoose')

const Uri = process.env.MONGO_URI

const connect = async () => {
    try {
        const conn = mongoose.connect(Uri)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        process.exit
    }
}

module.exports = connect