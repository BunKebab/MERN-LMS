import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "/api/requests/";

//makes a request
export const makeRequest = createAsyncThunk(
  "requests/make",
  async (requestData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(URL, requestData, config);

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

//gets all requests
export const getRequests = createAsyncThunk(
  "requests/get",
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

// Approves a request
export const approveRequest = createAsyncThunk(
  "requests/approve",
  async ({ requestId, approvalData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${URL}${requestId}/approve`, approvalData, config);
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

// Denies a request
export const denyRequest = createAsyncThunk(
  "requests/deny",
  async (requestId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${URL}${requestId}/deny`, config);
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
  requests: [],
  message: "",
};

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //make requests
      .addCase(makeRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests.push(action.payload);
        state.message = "Request made";
      })
      .addCase(makeRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //get requests
      .addCase(getRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = action.payload;
      })
      .addCase(getRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //approve request
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = state.requests.filter(
          (request) => request._id !== action.payload._id
        );
        state.message = "Request approved";
      })

      //deny request
      .addCase(denyRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = state.requests.filter(
          (request) => request._id !== action.payload
        );
        state.message = "Request denied";
      });
  },
});

export const { reset } = requestSlice.actions;
export default requestSlice.reducer;
