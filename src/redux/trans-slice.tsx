import { createSlice } from "@reduxjs/toolkit";

interface InitialStateDataType {
  transactions: { [name: string]: string }[];
}

const initialState: InitialStateDataType = {
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
