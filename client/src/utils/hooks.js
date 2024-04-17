import { useDispatch } from 'react-redux';
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
