import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [],
  currentPlayer: {}
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {

  }
});

export default playersSlice.reducer;