import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPartnerStatus = createAsyncThunk(
  "status/fetchPartnerStatus",
  async (userId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/auth/get-partner-status/${userId}`
    );
    return response.data.status === "Online";
  }
);

export const updatePartnerStatus = createAsyncThunk(
  "status/updatePartnerStatus",
  async (userId, { getState }) => {
    const currentStatus = getState().status.isOnline;
    const response = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/delivery/update-partner-status/${userId}`
    );
    return response.data.status === "Online";
  }
);

const statusSlice = createSlice({
  name: "status",
  initialState: {
    isOnline: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartnerStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartnerStatus.fulfilled, (state, action) => {
        state.isOnline = action.payload;
        state.loading = false;
      })
      .addCase(updatePartnerStatus.fulfilled, (state, action) => {
        state.isOnline = action.payload;
      });
  },
});

export default statusSlice.reducer;
