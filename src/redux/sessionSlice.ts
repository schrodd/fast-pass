import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  authKey: "asdasd",
};

export const sessionSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.authKey = action.payload;
    },
    clear: (state) => {
      state.authKey == "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, clear } = sessionSlice.actions;

export default sessionSlice.reducer;
