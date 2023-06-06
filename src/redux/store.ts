import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./sessionSlice";

export const store = configureStore({
  reducer: {
    sessionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
