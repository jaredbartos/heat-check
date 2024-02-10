import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  performances: [],
  currentPerformance: {}
};

const performancesSlice = createSlice({
  name: 'performances',
  initialState,
  reducers: {

  }
});

export default performancesSlice.reducer;