import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = { isLoggedIn: false, isAdmin: false };

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
