import { configureStore } from "@reduxjs/toolkit";

//import slices
import authSlice from "../actions/authSlice";
import bookSlice from "../actions/bookSlice";
import memberSlice from "../actions/memberSlice";
import borrowingSlice from "../actions/borrowingSlice";
import requestSlice from "../actions/requestSlice";
import pastBorrowingSlice from "../actions/pastBorrowingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    books: bookSlice,
    members: memberSlice,
    borrowings: borrowingSlice,
    requests: requestSlice,
    pastBorrowings: pastBorrowingSlice
  },
});
