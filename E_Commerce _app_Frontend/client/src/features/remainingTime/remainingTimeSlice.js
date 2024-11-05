import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: "",
};

const remainingTimeSlice = createSlice({
  name: "remainingTime",
  initialState,
  reducers: {
    setRemainingTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { setRemainingTime } = remainingTimeSlice.actions;
export default remainingTimeSlice.reducer;
