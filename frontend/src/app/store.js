import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rawWaterDataReducer from '../features/rawwater/rawwaterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rawWaterData: rawWaterDataReducer
  },
});
