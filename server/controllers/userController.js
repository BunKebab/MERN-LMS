const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//creates a user entry (post)
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
      res.status(400).json({ message: "email already registered" });
      throw new Error();
    }

    if (!name || !email || !password) {
      res.status(400).json({ message: "please fill all fields" });
      throw new Error();
    }

    const user = User.create({
      name,
      email,
      password,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//fetched all user entries (get)
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "Admin" } });

    if (!users) {
      res.status(400).json({ message: "users not found" });
      throw new Error();
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//deletes a user entry (delete: id)
const removeUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json({ message: "user not found" });
      throw new Error();
    }

    await user.deleteOne();
    res.status(200).json(req.params.id);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

module.exports = {
  registerUser,
  getAllUsers,
  removeUser,
};
