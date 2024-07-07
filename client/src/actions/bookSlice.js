import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const URL = "http://localhost:5000/api/books/";

//get books from database
export const getBooks = createAsyncThunk(
  "books/getAll",
  async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(URL, config)

        return response.data
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
  books: [],
  message: "",
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //get all books
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const {reset} = bookSlice.actions;
export default bookSlice.reducer;
