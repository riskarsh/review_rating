import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import companySlice from "./features/company/companySlice";

// Configure the Redux store
const store = configureStore(
  {
    // Define the initial state and reducers for the store
    reducer: {
      user: authSlice, // Using the 'authSlice' reducer for managing user authentication state
      company:companySlice // Using the 'companySlice' reducer for managing company authentication state
    },
  },
  applyMiddleware(thunk) // Apply the 'redux-thunk' middleware for handling asynchronous actions
);

export default store;