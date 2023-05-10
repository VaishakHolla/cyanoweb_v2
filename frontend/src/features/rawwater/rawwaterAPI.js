// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchRawwaterdata = createAsyncThunk('rawwaterdata/fetchRawwaterdatas', async () => {
//   const response = await axios.get('http://127.0.0.1:8080/api/rawwaterdata/all');
//   console.log("INSIDE THE REDUX FUNCTION",response)
//   return response.data;
// });

export async function getRawWaterData() {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rawwaterdata/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch raw water data.');
    }
    const data = await response.json();
    return data;
  }
  