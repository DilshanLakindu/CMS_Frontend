import { createSlice } from "@reduxjs/toolkit";

export const mainDrawerSlice = createSlice({
  name: "mainDrawer",
  initialState: {
    isContetntManager: false,
    isContentTypeBuilder: true,
    drawerState: true,
  },
  reducers: {
    setIsContetntManager: (state, action) => {
      state.isContetntManager = action.payload;
      state.isContentTypeBuilder = false;
    },
    setIsContentTypeBuilder: (state, action) => {
      state.isContentTypeBuilder = action.payload;
      state.isContetntManager = false;
    },
    setDrawerState: (state, action) => {
      state.drawerState = action.payload;
    },
  },
});

export const { setIsContentTypeBuilder, setIsContetntManager, setDrawerState } = mainDrawerSlice.actions;
export default mainDrawerSlice.reducer;
