import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  currentTeam: {}
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {

  }
});

export default teamsSlice.reducer;