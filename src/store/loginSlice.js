import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = { isLoggedIn: false, isAdmin: false, email: '', imageUrl: '' };

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
    setEmail(state, action) {
      state.email = action.payload;
    },
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
