import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exchanges: [],
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    addExchange: (state, action) => {
      state.exchanges.push(action.payload);
    },
  },
});

export const { addExchange } = exchangeSlice.actions;
export default exchangeSlice.reducer;
