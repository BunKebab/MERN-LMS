const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");
const Borrowing = require("../models/borrowingModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

// Makes a request (member only)
const makeRequest = asyncHandler(async (req, res) => {
  const { userId, bookId, borrowingId, requestType } = req.body;

  if (!userId || !requestType) {
    res.status(400);
    throw new Error("missing credentials");
  }

  let request;

  if (requestType === "Borrow") {
    if (!bookId) {
      res.status(400);
      throw new Error("bookId is required for borrowing request");
    }

    const checkUser = await Borrowing.findOne({ userId });

    if (checkUser) {
      res.status(400);
      throw new Error("you have already borrowed a book");
    }

    const checkBook = await Borrowing.findOne({ bookId });

    if (checkBook) {
      res.status(400);
      throw new Error("book not available right now");
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
      res.status(400);
      throw new Error("borrowingId is required for renewal request");
    }

    if (!userId) {
      res.status(400);
      throw new Error("userId is required for renewal request");
    }

    const borrowing = await Borrowing.findById(borrowingId);
    const user = await User.findById(userId);

    if (!borrowing) {
      res.status(404);
      throw new Error("borrowing not found");
    }

    if (borrowing.renewed) {
      res.status(400);
      throw new Error("borrowing already renewed");
    }

    request = await Request.create({
      userId,
      borrowingId,
      refId: borrowing.refId,
      email: user.email,
      requestType,
    });
  } else {
    res.status(400);
    throw new Error("Invalid request type");
  }

  res.status(200).json(request);
});

//gets a request
const getRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (!request) {
    res.status(400);
    throw new Error("request not found");
  }

  res.status(200).json(request);
});

//gets all requests
const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find();

  if (!requests) {
    res.status(400);
    throw new Error("no requests found");
  }

  res.status(200).json(requests);
});

// Approves request
const approveRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }

  const { userId, bookId, borrowingId } = request;
  const user = await User.findById(userId)
  const book = await Book.findById(bookId)
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
      res.status(500);
      throw new Error("Failed to create borrowing record");
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
      throw new Error("Failed to update borrowing record");
    }

    await request.deleteOne();
    res.status(200).json(updatedBorrowing);
  } else {
    res.status(400);
    throw new Error("Invalid request type");
  }
});

//denies request
const denyRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (!request) {
    res.status(400);
    throw new Error("request not found");
  }

  await request.deleteOne();

  res.status(200).json(req.params.id);
});

module.exports = {
  makeRequest,
  getRequest,
  getAllRequests,
  approveRequest,
  denyRequest,
};
