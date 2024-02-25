import { useDispatch } from 'react-redux';
import { addRecentChange, removeRecentChange } from './globalState/slices/recentChangesSlice';

export const useManageChanges = () => {
  const dispatch = useDispatch();

  const manageChanges = (id) => {
    dispatch(addRecentChange(id));

    setTimeout(() => {
      dispatch(removeRecentChange(id));
    }, 5000);
  };

  return manageChanges;
}