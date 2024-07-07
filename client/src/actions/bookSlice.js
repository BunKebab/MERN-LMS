import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "/api/books/";

// Get all books from database
export const getBooks = createAsyncThunk(
  "books/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(URL, config);
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

// Add a new book
export const addBook = createAsyncThunk(
  "books/add",
  async (bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(URL, bookData, config);
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

// Edit a book
export const editBook = createAsyncThunk(
  "books/edit",
  async ({ bookId, bookData }, thunkAPI) => { // Destructure bookData and bookId
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${URL}${bookId}`, bookData, config); // Use template literal to construct URL
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

// Delete a book
export const deleteBook = createAsyncThunk(
  "books/delete",
  async (bookId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${URL}${bookId}`, config); // Use template literal to construct URL
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

// Initial state for the slice
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  books: [],
  message: "",
};

// Slice definition
const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Reducer cases for getBooks
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
      // Reducer cases for addBook
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(action.payload);
        state.message = "Book added successfully";
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Reducer cases for editBook
      .addCase(editBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the book in the state array
        state.books = state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        );
        state.message = "Book updated successfully";
      })
      .addCase(editBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Reducer cases for deleteBook
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.books = state.books.filter(
          (book) => book._id !== action.payload.id
        );
        state.message = "Book removed successfully";
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      });
  },
});

// Export actions and reducer from the slice
export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
