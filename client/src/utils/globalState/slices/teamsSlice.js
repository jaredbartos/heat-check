import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  currentTeam: {}
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    updateTeams: (state, action) => {
      return {
        ...state,
        teams: action.payload
      };
    }
  }
});

export const selectTeams = state => state.teams.teams;

export const { updateTeams } = teamsSlice.actions;

export default teamsSlice.reducer;