const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    requestType: {
      type: String,
      enum: ["Borrow", "Renew"],
      required: true,
    },
    borrowingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Borrowing",
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    refId: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);

// Custom validation to ensure either bookId or borrowingId is present based on requestType
requestSchema.pre("validate", function (next) {
  if (this.requestType === "Borrow" && !this.bookId) {
    next(new Error("bookId is required for borrowing request"));
  } else if (this.requestType === "Renew" && !this.borrowingId) {
    next(new Error("borrowingId is required for renewal request"));
  } else {
    next();
  }
});

module.exports = mongoose.model("Request", requestSchema);
