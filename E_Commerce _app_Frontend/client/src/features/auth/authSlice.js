import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticate: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth = null;
    },
  },
});

export const { setAuthenticate, logout } = authSlice.actions;
export default authSlice.reducer;
