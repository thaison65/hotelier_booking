// import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSearch } from '~/utils';

export const fetchPlace = async (debounce: string) => {
	try {
		const response = await getSearch('places/cities/search', {
			id: ' ',
			searchString: debounce,
			size: 3,
		});
		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
};

export const fetchTourist = async (debounce: string) => {
	try {
		const response = await getSearch('places/tourists', {
			id: ' ',
			searchString: debounce,
			size: 3,
		});
		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
};
