import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReccomendationData } from './reccomendationAPI';

const initialState = {
  reccomendationData: [],
  status: 'idle',
  error: null,
};

export const fetchReccomendationData = createAsyncThunk('reccomendationData/fetchReccomendationData', async (params) => {
  const response = await getReccomendationData(params);
  return response;
});

const reccomendationdataSlice = createSlice({
  name: 'reccomendationData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReccomendationData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReccomendationData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reccomendationData = action.payload;
      })
      .addCase(fetchReccomendationData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reccomendationdataSlice.reducer;

export const selectAllReccomendationData = (state) => state.reccomendationData.reccomendationData;
export const selectReccomendationDataStatus = (state) => state.reccomendationData.status;
export const selectReccomendationDataError = (state) => state.reccomendationData.error;
