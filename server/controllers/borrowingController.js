const asyncHandler = require("express-async-handler");
const Borrowing = require("../models/borrowingModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

//calculate fine
const calculateFine = async (borrowing) => {
  const fineRate = 10;
  const currentDate = new Date();
  const dueDate = new Date(borrowing.deadline);

  let fine = 0;
  if (currentDate > dueDate) {
    const timeDiff = currentDate - dueDate;
    const daysOverdue = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert time difference to days
    fine = daysOverdue * fineRate;
  }

  // Update the fine in the database
  borrowing.fine = fine;
  await borrowing.save();

  return fine;
};

//creates a borrowing record (post)(protected)
const createBorrowing = asyncHandler(async (req, res) => {
  try {
    const { email, refId, issueDate, deadline } = req.body;

    if (!email || !refId || !issueDate || !deadline) {
      res.status(400).json({ message: "fields missing" });
      throw new Error();
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user not found" });
      throw new Error();
    }
    const userId = user._id;

    const book = await Book.findOne({ refId });
    if (!book) {
      res.status(400).json({ message: "book not found" });
      throw new Error();
    }
    const bookId = book._id;

    const checkUser = await Borrowing.findOne({ userId });
    const checkBook = await Borrowing.findOne({ bookId });

    if (checkUser || checkBook) {
      res.status(400).json({
        message: "cannot create borrowing, user or book already present",
      });
      throw new Error();
    }

    const borrowing = await Borrowing.create({
      userId,
      bookId,
      email,
      refId,
      issueDate,
      deadline,
    });

    res.status(200).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//gets all borrowing records(get)(protected)
const getAllBorrowings = asyncHandler(async (req, res) => {
  try {
    const borrowings = await Borrowing.find();

    if (!borrowings) {
      res.status(400).json({ message: "no borrowings found" });
      throw new Error();
    }

    for (const borrowing of borrowings) {
      await calculateFine(borrowing);
    }

    res.status(200).json(borrowings);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//renews a borrowing (put:id)(protected)
const renewBorrowing = asyncHandler(async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id);

    if (!borrowing) {
      res.status(400).json({ message: "borrowing not found" });
      throw new Error();
    }

    if (borrowing.renewed) {
      res.status(400).json({ message: "book already renewed" });
      throw new Error();
    }

    const { newDeadline } = req.body;

    if (!newDeadline) {
      res.status(400).json({ message: "deadline not provided" });
      throw new Error();
    }

    const renewedBorrowing = await Borrowing.findByIdAndUpdate(
      req.params.id,
      {
        deadline: newDeadline,
        renewed: true,
      },
      {
        new: true,
      }
    );

    res.status(200).json(renewedBorrowing);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//receives a borrowing (delete:id)(protected)
const receiveBorrowing = asyncHandler(async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id);

    if (!borrowing) {
      res.status(400).json({ message: "borrowing not found" });
      throw new Error();
    }

    await borrowing.deleteOne();

    res.status(200).json(req.params.id);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

module.exports = {
  createBorrowing,
  getAllBorrowings,
  renewBorrowing,
  receiveBorrowing,
};
