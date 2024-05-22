const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
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

//for admin specific routes
const adminOnly = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
        next()
    } else {
        res.status(401)
        throw new Error("access denied. Admin only")
    }
})

//for user specific routes
const memberOnly = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === "Member") {
        next()
    } else {
        res.status(401)
        throw new Error("access denies. Member only")
    }
})

module.exports = {
    protect,
    adminOnly,
    memberOnly
}