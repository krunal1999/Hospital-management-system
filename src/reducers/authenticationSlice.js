import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null,
  status: true,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.userData;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.status = true;
    },
    login: (state, action) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = true;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
