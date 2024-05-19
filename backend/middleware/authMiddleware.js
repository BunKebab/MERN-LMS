const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async(req, res, next) => {
    let token

    //confirming token format {Bearer Token}
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //getting token
            token = req.headers.authorization.split(' ')[1]

            //decoding
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //getting user
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("not authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("not authorized, no token")
    }
})

module.exports = protect