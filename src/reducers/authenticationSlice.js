import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedStatus = localStorage.getItem("status");

const initialState = {
  user: storedUser || null,
  status: storedStatus === "true" ? true : false,
};

function clearAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

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
      clearAllCookies();
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
