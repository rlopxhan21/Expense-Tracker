import { createSlice } from "@reduxjs/toolkit";

interface InitialStateDateType {
  user:
    | {
        uid: string;
      }
    | undefined;
}

const initialState: InitialStateDateType = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
