import { createSlice } from "@reduxjs/toolkit";

export const dynamicSlice = createSlice({
  name: "dynamic",
  initialState: {
    currunt_collectionId: 0,
    currunt_collectionName: "",
    builder_created: {},
    value_created: {},
  },
  reducers: {
    setCollectionData: (state, action) => {
      state.currunt_collectionId = action.payload.id;
      state.currunt_collectionName = action.payload.collectionName;
    },
    setBuilderCreated: (state, action) => {
      state.builder_created = action.payload;
    },
    setValueCreated: (state, action) => {
      state.value_created = action.payload;
    },
    cleanUp: (state, action) => {
      state.currunt_collectionId = 0;
      state.currunt_collectionName = "";
    },
  },
});

export const { setCollectionData, cleanUp, setBuilderCreated, setValueCreated } = dynamicSlice.actions;
export default dynamicSlice.reducer;
