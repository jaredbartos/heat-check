import { createSlice } from '@reduxjs/toolkit';

const recentChangesSlice = createSlice({
  name: 'recentChanges',
  initialState: [],
  reducers: {
    addRecentChange: (state, action) => {
      return [
        ...state,
        action.payload
      ];
    },
    removeRecentChange: (state, action) => {
      return state.filter((item) => action.payload != item);
    }
  }
});

export const selectRecentChanges = state => state.recentChanges;

export const { addRecentChange, removeRecentChange } = recentChangesSlice.actions;

export default recentChangesSlice.reducer