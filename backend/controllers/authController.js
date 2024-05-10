const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")

loginUser = async (req, res) => {
    const { email, password} = req.body

    if(!email || !password){
        res.status(400).json({message: "please fill all fields"})
    }
    const user = await User.findOne({email})
    const userPassword = user.password

    if(user && (await bcrypt.compare(userPassword, password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }
    else {
        res.status(400).json({message: "incorrect email or password"})
    }

    res.json({message: "user logged in"})
}

logoutUser = async (req, res) => {
    res.json({message: "user logged out"})
}

getUser = async (req, res) => {
    res.json({message: "user fetched"})
}

module.exports = {
    loginUser,
    logoutUser,
    getUser
}