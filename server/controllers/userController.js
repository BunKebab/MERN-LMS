const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")

const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let password = ''
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        password += chars[randomIndex]
    }
    return password
}


//creates a user entry (post)
const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email
    } = req.body

    const checkEmail = await User.findOne({email: req.body.email})

    if (checkEmail) {
        res.status(400)
        throw new Error("email already registered")
    }

    const password = generateRandomPassword()

    if (!name || !email) {
        res.status(400)
        throw new Error("please fill all fields")
    }

    const user = User.create({
        name,
        email,
        password
    })
    res.status(200).json({user, generatedPassword: password})
})

//fetched a user entry (get:id)
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error("user not found")
    }

    res.status(200).json(user)
})

//fetched all user entries (get)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()

    if (!users) {
        res.status(400)
        throw new Error("users not found")
    }

    res.status(200).json(users)
})

//upates a user's password (put:id)
const updatePassword = asyncHandler(async (req, res) => {
    const {
        currentPassword,
        newPassword
    } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error("user not found")
    }

    const isMatch = await user.comparePassword(currentPassword)

    if (!isMatch) {
        res.status(400)
        throw new Error("incorrect current pasword")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {password: hashedPassword})

    res.status(200).json(updatedUser)
})

//deletes a user entry (delete: id)
const removeUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error("user not found")
    }

    await user.deleteOne()
    res.status(200).json(req.params.id)
})

module.exports = {
    registerUser,
    getUser,
    getAllUsers,
    updatePassword,
    removeUser
}