import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the Redux slice
let initialState = {
  message: "",
  user: "",
  token: "",
  loading: false,
  error: "",
};

// Create an asynchronous action for user registration
export const signUpUser = createAsyncThunk(
  "users/signUpUser",
  async (body, thunkAPI) => {
    // Send registration data to the server using Axios
    const res = await axios.post(
      "http://localhost:9000/user/registerUser",
      body,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    // Handle server response
    if (res.data.success) {
    //   console.log("Signup think res", res.data);
      return res.data;
    } else {
      return thunkAPI.rejectWithValue(res.data);
    }
  }
);
// Create an asynchronous action for user Signin
export const signInUser = createAsyncThunk(
    "user/signInUser",
    async(body,thunkAPI) => {
        console.log("body data :",body)
        const resResult = await fetch("http://localhost:9000/user/userLogin", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type" :"application/json",
            },
            body: JSON.stringify(body),
        });
    let data = await resResult.json()
    console.log("data :",data)
    if (data.success){
        return data
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }
    }
);
// Create a Redux slice for user authentication and registration
const authSlice = createSlice({
  name: "user",
  initialState,
  
  // Reducers for synchronous state updates
  reducers: {
    // Clear user state
    clearState: (state) => {
      state.message = "";
      state.user = "";
      state.token = "";
      state.loading = false;
      state.error = "";
      return state;
    },
    // Add token from local storage to state
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    // Add user from local storage to state
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
    // Logout user by clearing token and local storage
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
  },
  // Extra reducers for handling async actions
  extraReducers: {
    // Handle pending registration
    [signUpUser.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    },
    // Handle successful registration
    [signUpUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.message = "";
      } else {
        state.message = payload.message;
        state.error = "";
      }
    },
    // Handle failed registration
    [signUpUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.message = "";
    },
    // Handle pending Signin
    [signInUser.pending]:(state, {payload}) => {
        state.loading =true
    },
    // Handle successful Signin
    [signInUser.fulfilled]:(state,{payload}) => {
        state.loading = false

        if(payload.error) {
            state.error = payload.error
        }
        else{
            state.message = payload.message;
            state.token = payload.token;
            state.user = payload.userData;
            localStorage.setItem("message", payload.message);
            localStorage.setItem("user", JSON.stringify(payload.userData));
            localStorage.setItem("token", payload.token);

        }
    },
    // Handle failed Signin
    [signInUser.rejected]:(state, {payload}) => {
        state.loading = true;
        state.error = payload.error;
        state.message = "";
    },
  },
});

// Export individual actions and the reducer from the authSlice
export const { addUser } = authSlice.actions;
export default authSlice.reducer;
export const { clearState } = authSlice.actions;
