import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth-slice";
import { transSlice } from "./trans-slice";

export const redux = configureStore({
  reducer: {
    auth: authSlice.reducer,
    trans: transSlice.reducer,
  },
});

export type RootState = ReturnType<typeof redux.getState>;
