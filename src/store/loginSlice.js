import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = { isLoggedIn: false, isAdmin: false, email: '', imageUrl: '', userId: '' };

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
    setUserId(state, action) {
      state.userId = action.payload;
    },
    logOut(state) {
      state.isLoggedIn = initialLoginState.isLoggedIn
      state.isAdmin = initialLoginState.isAdmin
      state.email = initialLoginState.email
      state.imageUrl = initialLoginState.imageUrl
      state.userId = initialLoginState.userId
    }
  },
});

export const { setLoggedIn, setAdmin, setEmail, setImageUrl, setUserId, logOut } = loginSlice.actions;

export default loginSlice.reducer;
