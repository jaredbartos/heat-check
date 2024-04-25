import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_LEAGUES } from './queries/league';
import {
  addRecentChange,
  removeRecentChange
} from './globalState/slices/recentChangesSlice';

// Custom hook to add recent change to Redux and set timeout for removal
export const useManageChanges = () => {
  const dispatch = useDispatch();

  const manageChanges = id => {
    dispatch(addRecentChange(id));

    setTimeout(() => {
      dispatch(removeRecentChange(id));
    }, 5000);
  };

  return manageChanges;
};

// Custom hook to get league names
export const useLeagueNames = () => {
  const { data } = useQuery(GET_LEAGUES);

  return data?.leagues.map(league => league.name);
};
