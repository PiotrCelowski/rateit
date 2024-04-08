import { createSlice } from "@reduxjs/toolkit";

const initialErrorState = {
  visibleError: false,
  errorMessage: "",
};

const errorStateSlice = createSlice({
  name: "errorState",
  initialState: initialErrorState,
  reducers: {
    setError(state, action) {
      state.visibleError = !state.visibleError;
      state.errorMessage = action.payload;
    },
    clearError(state) {
      state.errorMessage = "";
      state.visibleError = false;
    },
  },
});

export const { setError, clearError } = errorStateSlice.actions;

export default errorStateSlice.reducer;
