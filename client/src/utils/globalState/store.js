import { configureStore } from '@reduxjs/toolkit';
import recentChangesReducer from './slices/recentChangesSlice';

export default configureStore({
  reducer: {
    recentChanges: recentChangesReducer
  }
});
