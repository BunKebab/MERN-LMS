const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");
const Borrowing = require("../models/borrowingModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

// Makes a request (member only)
const makeRequest = asyncHandler(async (req, res) => {
  try {
    const { userId, bookId, borrowingId, requestType } = req.body;

    if (!userId || !requestType) {
      res.status(400).json({ message: "missing credentials" });
      throw new Error();
    }

    let request;

    if (requestType === "Borrow") {
      if (!bookId) {
        res
          .status(400)
          .json({ message: "bookId is required for borrowing request" });
        throw new Error();
      }

      const checkUser = await Borrowing.findOne({ userId });

      if (checkUser) {
        res.status(400).json({ message: "you have already borrowed a book" });
        throw new Error();
      }

      const checkBook = await Borrowing.findOne({ bookId });

      if (checkBook) {
        res.status(400).json({ message: "book not available right now" });
        throw new Error();
      }

      const book = await Book.findById(bookId);
      const user = await User.findById(userId);

      request = await Request.create({
        userId,
        bookId,
        refId: book.refId,
        email: user.email,
        requestType,
      });
    } else if (requestType === "Renew") {
      if (!borrowingId) {
        res
          .status(400)
          .json({ message: "borrowingId is required for renewal request" });
        throw new Error();
      }

      if (!userId) {
        res
          .status(400)
          .json({ message: "userId is required for renewal request" });
        throw new Error();
      }

      const borrowing = await Borrowing.findById(borrowingId);
      const user = await User.findById(userId);

      if (!borrowing) {
        res.status(404).json({ message: "borrowing not found" });
        throw new Error();
      }

      if (borrowing.renewed) {
        res.status(400).json({ message: "borrowing already renewed" });
        throw new Error();
      }

      request = await Request.create({
        userId,
        borrowingId,
        refId: borrowing.refId,
        email: user.email,
        requestType,
      });
    } else {
      res.status(400).json({ message: "Invalid request type" });
      throw new Error();
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//gets all requests
const getAllRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await Request.find();

    if (!requests) {
      res.status(400).json({ message: "no requests found" });
      throw new Error();
    }

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

// Approves request
const approveRequest = asyncHandler(async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      res.status(400).json({ message: "request not foun" });
      throw new Error();
    }

    const { userId, bookId, borrowingId } = request;
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    const { issueDate, deadline, newDeadline } = req.body;

    if (request.requestType === "Borrow") {
      const borrowing = await Borrowing.create({
        userId,
        bookId,
        refId: book.refId,
        email: user.email,
        issueDate,
        deadline,
      });

      if (!borrowing) {
        res.status(500).json({ message: "Failed to create borrowing record" });
        throw new Error();
      }

      await request.deleteOne();
      res.status(200).json(borrowing);
    } else if (request.requestType === "Renew") {
      const updatedBorrowing = await Borrowing.findByIdAndUpdate(
        borrowingId,
        {
          deadline: newDeadline,
          renewed: true,
        },
        {
          new: true,
        }
      );

      if (!updatedBorrowing) {
        res.status(500);
        throw new Error({ message: "Failed to update borrowing record" });
      }

      await request.deleteOne();
      res.status(200).json(updatedBorrowing);
    } else {
      res.status(400).json({ message: "Invalid request type" });
      throw new Error();
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

//denies request
const denyRequest = asyncHandler(async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      res.status(400).json({ message: "request not found" });
      throw new Error();
    }

    await request.deleteOne();

    res.status(200).json(req.params.id);
  } catch (error) {
    res.status(500).json({ message: "something went wrong, try again" });
    throw error;
  }
});

module.exports = {
  makeRequest,
  getAllRequests,
  approveRequest,
  denyRequest,
};
