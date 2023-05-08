import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRawWaterData } from './rawwaterAPI';

const initialState = {
  rawWaterData: [],
  status: 'idle',
  error: null,
};

export const fetchRawWaterData = createAsyncThunk('rawWaterData/fetchRawWaterData', async () => {
  const response = await getRawWaterData();
  return response;
});

const rawwaterdataSlice = createSlice({
  name: 'rawWaterData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawWaterData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRawWaterData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rawWaterData = action.payload;
      })
      .addCase(fetchRawWaterData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default rawwaterdataSlice.reducer;

export const selectAllRawWaterData = (state) => state.rawWaterData.rawWaterData;
export const selectRawWaterDataStatus = (state) => state.rawWaterData.status;
export const selectRawWaterDataError = (state) => state.rawWaterData.error;
