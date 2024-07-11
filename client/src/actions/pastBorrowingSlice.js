import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "/api/past-borrowings/";

// Async thunk to fetch past borrowings for a member by email
export const getPastBorrowings = createAsyncThunk(
  "pastBorrowings/fetchByEmail",
  async (email, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${URL}${email}`, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  pastBorrowings: [],
  message: "",
};

const pastBorrowingSlice = createSlice({
  name: "pastBorrowings",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPastBorrowings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPastBorrowings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pastBorrowings = action.payload;
      })
      .addCase(getPastBorrowings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = pastBorrowingSlice.actions;
export default pastBorrowingSlice.reducer;
