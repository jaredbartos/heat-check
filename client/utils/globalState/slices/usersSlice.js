import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    username: '',
    teams: []
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  }
});

export default usersSlice.reducer;