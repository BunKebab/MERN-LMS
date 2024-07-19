const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}

//upates a user's password (put:id)
const updatePassword = asyncHandler(async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body
    
        const user = await User.findById(req.params.id)
    
        if (!user) {
            res.status(400).json({message: "user not found"})
            throw new Error
        }
    
        const isMatch = await user.comparePassword(currentPassword)
    
        if (!isMatch) {
            res.status(400).json({message: "incorrect current pasword"})
            throw new Error
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
    
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {password: hashedPassword})
    
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message: "something went wrong, try again later"})
        throw error
    }
})

//fetches logged in user (get)(protected)
const getMe = asyncHandler(async (req, res) => {
    try {
        const {
            _id,
            name,
            email,
            role
        } = await User.findById(req.user.id)
    
        res.status(200).json({
            id: _id,
            name,
            email,
            role
        })
    } catch (error) {
        res.status(500).json({message: "something went wrong, try again later"})
        throw error
    }
})

//logs in a user (post)
const loginUser = asyncHandler(async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
    
        if (!email || !password) {
            res.status(400).json({message: "please enter credentials"})
            throw new Error
        }
    
        const user = await User.findOne({email})
    
        if (!user) {
            res.status(400).json({message: "user not found"})
            throw new Error
        }
    
        const passMatch = await user.comparePassword(password)
    
        if (!passMatch) {
            res.status(400).json({message: "incorrect password"})
            throw new Error
        }
    
        res.status(200).json({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({message: "something went wrong, try again later"})
        throw error
    }
})

module.exports= {
    loginUser,
    updatePassword,
    getMe
}