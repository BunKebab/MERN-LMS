import { configureStore } from "@reduxjs/toolkit";

//import slices
import authSlice from "../actions/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});