const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")

const loginUser = asyncHandler(async (req, res) => {
    res.json({message: "user logged in"})
})

const logoutUser = asyncHandler(async (req, res) => {
    res.json({message: "user logged out"})
})

module.exports= {
    loginUser,
    logoutUser
}