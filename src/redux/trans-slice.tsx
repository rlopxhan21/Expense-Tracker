import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

export const transSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    setTrans(state, action) {
      state.transactions = action.payload;
    },
  },
});

export const transActions = transSlice.actions;
