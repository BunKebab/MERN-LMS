import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "/api/borrowings/";

//gets logged in member's borrowing
export const getUserBorrowing = createAsyncThunk(
  "borrowing/getOne",
  async (memberId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${URL}${memberId}`, config);

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

//get borrowing entries
export const getBorrowings = createAsyncThunk(
  "borrowings/get",
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

//create a new borrowing entry
export const createBorrowing = createAsyncThunk(
  "borrowings/create",
  async (borrowingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(URL, borrowingData, config);

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

//renews a borrowing
export const renewBorrowing = createAsyncThunk(
  "borrowings/renew",
  async ({ borrowingId, newDeadline }, thunkAPI) => {
    try {
      console.log(newDeadline);
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${URL}${borrowingId}`,
        { newDeadline },
        config
      );

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

//receives a borrowing
export const receiveBorrowing = createAsyncThunk(
  "borrowings/receive",
  async (borrowingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(`${URL}${borrowingId}`, config);

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
  borrowings: [],
  message: "",
};

const borrowingSlice = createSlice({
  name: "borrowingSlice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //get user's borrowing
      .addCase(getUserBorrowing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBorrowing.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.borrowings = action.payload);
      })
      .addCase(getUserBorrowing.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })

      //get all borrowings
      .addCase(getBorrowings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBorrowings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.borrowings = action.payload;
      })
      .addCase(getBorrowings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //add new borrowing
      .addCase(createBorrowing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBorrowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.borrowings.push(action.payload);
        state.message = "Borrowing added successfully";
      })
      .addCase(createBorrowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //renew a borrowing
      .addCase(renewBorrowing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(renewBorrowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the borrowing in the state array
        state.borrowings = state.borrowings.map((borrowing) =>
          borrowing._id === action.payload._id ? action.payload : borrowing
        );
        state.message = "Borrowing renewed successfully";
      })
      .addCase(renewBorrowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //delete Borrowing
      .addCase(receiveBorrowing.fulfilled, (state, action) => {
        state.borrowings = state.borrowings.filter(
          (borrowing) => borrowing._id !== action.payload.id
        );
        state.message = "Borrowing received";
      });
  },
});

export const { reset } = borrowingSlice.actions;
export default borrowingSlice.reducer;
