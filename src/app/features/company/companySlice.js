import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the Redux slice
let initialState = {
  cmplist_message: "",
  cmpcreate_message: "",
  cmpDetail_message: "",
  company_data: "",
  company_details: "",
  loading: "false",
  error: "",
};

// Create an asynchronous action for adding company
export const createCompany = createAsyncThunk(
  "company/create",
  async (body, thunkAPI) => {
    // Send company data to the server using Axios
    const res = await axios.post("http://localhost:9000/company/create", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Handle server response
    if (res.data.success) {
      //   console.log("Signup think res", res.data);
      return res.data;
    } else {
      return thunkAPI.rejectWithValue(res.data);
    }
  }
);
// Create a Redux slice for user authentication and registration
const companySlice = createSlice({
  name: "company",
  initialState,
  // Reducers for synchronous state updates
  reducers: {
    clearCompanyState: (state) => {
      state.cmplist_message = "";
      state.cmpcreate_message = "";
      state.cmpDetail_message = "";
      state.company_data = "";
      state.company_details = "";
      state.loading = false;
      state.error = "";
    },
  },
  // Extra reducers for handling async actions
  extraReducers: {
    // Handle pending company registration
    [createCompany.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
      state.cmpcreate_message = "";
    },
    // Handle successful company registration

    [createCompany.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.cmpcreate_message = "";
      } else {
        state.cmpcreate_message = payload.message;
        state.error = "";
      }
    },
    // Handle failed company registration
    [createCompany.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.cmpcreate_message = "";
    },
  },
});

export default companySlice.reducer;
export const { clearCompanyState } = companySlice.actions;
