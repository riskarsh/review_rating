import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the Redux slice
let initialState = {
    review_message: "",
    loading: "false",
    error: "",
  };

// Create an asynchronous action for adding review
export const companyReview = createAsyncThunk(
    "review/companyReview",
    async (body, thunkAPI) => {
      // Send company review to the server using Axios
      const res = await axios.post("http://localhost:9000/company/addreview", 
      body, {
        headers: { 
            Accept: "application/json",
            "Content-Type": "application/json",
        },
      });
      return res.data;
    }
  );

  // Create a Redux slice for user authentication and registration
const reviewSlice = createSlice({
    name: "review",
    initialState,
    // Reducers for synchronous state updates
    reducers: {
      clearCompanyState: (state) => {
        state.cmplist_message = "";
        state.cmpcreate_message = "";
        state.company_data = "";
        state.loading = false;
        state.error = "";
        return state
      },
    },
    extraReducers:{
        // Handle pending company review
    [companyReview.pending]: (state, { payload }) => {
        state.loading = true;
        state.error = "";
        state.cmpcreate_message = "";
      },

      // Handle successful company review
    [companyReview.fulfilled]: (state, { payload }) => {
        state.loading = false;
        if (payload.error) {
          state.error = payload.error;
          state.review_message = "";
        } else {
          state.review_message = payload.message;
          state.error = "";
        }
      },
      // Handle failed company review
    [companyReview.rejected]: (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
        state.review_message = "";
    },
}});
export default reviewSlice.reducer
export const {clearCompanyState} = reviewSlice.actions