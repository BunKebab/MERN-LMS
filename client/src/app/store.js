import { configureStore } from "@reduxjs/toolkit";

//import slices
import authSlice from "../actions/authSlice";
import bookSlice from "../actions/bookSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    books: bookSlice,
  },
});