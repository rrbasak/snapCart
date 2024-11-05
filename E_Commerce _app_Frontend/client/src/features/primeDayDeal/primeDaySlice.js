// src/redux/primeDaySlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primestartDate: "",
  primeendDate: "",
};

const primeDaySlice = createSlice({
  name: "primeDay",
  initialState,
  reducers: {
    setPrimeDates: (state, action) => {
      state.primestartDate = action.payload.primestartDate;
      state.primeendDate = action.payload.primeendDate;
    },
    clearPrimeDates: (state) => {
      state.primestartDate = "";
      state.primeendDate = "";
    },
  },
});

export const { setPrimeDates, clearPrimeDates } = primeDaySlice.actions;

export default primeDaySlice.reducer;
