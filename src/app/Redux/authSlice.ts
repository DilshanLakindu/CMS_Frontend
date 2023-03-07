import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: "",
    userRole: "",
    userName: "",
  },
  reducers: {
    setLoginResponse: (state, action) => {
      state.access_token = action.payload.access_token;
      state.userRole = action.payload.userRole;
      state.userName = action.payload.userName;
    },
    logOut: (state, action) => {
      state.access_token = "";
      state.userRole = "";
      state.userName = "";
    },
  },
});

export const { setLoginResponse, logOut } = authSlice.actions;
export default authSlice.reducer;
