import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: true,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.userData;
      state.status = true;
    },
    login: (state, action) => {
      state.user = null;
      state.status = true;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
