import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedStatus = localStorage.getItem("status");

const initialState = {
  user: storedUser || null,
  status: storedStatus === "true"? true : false,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.status = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("status", "true");
    },
    logout: (state, action) => {
      state.user = null;
      state.status = false;
      localStorage.removeItem("user");
      localStorage.removeItem("status");
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
