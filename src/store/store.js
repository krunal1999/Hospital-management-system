import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "../reducers/authenticationSlice.js";

export const store = configureStore({
  reducer: {
    auth: authenticationSlice,
  },
});
