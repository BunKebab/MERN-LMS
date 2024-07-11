const asyncHandler = require("express-async-handler");
const PastBorrowing = require("../models/pastBorrowingModel");

// Gets all past borrowings of a member by email
const getPastBorrowingsByEmail = asyncHandler(async (req, res) => {
  const email = req.params.email;

  const pastBorrowings = await PastBorrowing.find({ email: email });

  if (!pastBorrowings) {
    res.status(404);
    throw new Error("Past borrowings not found");
  }

  res.status(200).json(pastBorrowings);
});

module.exports = {
  getPastBorrowingsByEmail,
};
