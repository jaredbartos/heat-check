import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import teamsReducer from './slices/teamsSlice';
import playersReducer from './slices/playersSlice';
import performancesReducer from './slices/performancesSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    teams: teamsReducer,
    players: playersReducer,
    performances: performancesReducer
  }
});