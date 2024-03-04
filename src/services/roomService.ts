// import { createAsyncThunk } from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '~/utils';

export const fetchRooms = createAsyncThunk('rooms/rooms', async () => {
	try {
		const response = await get('rooms/manager/', { id: '' });
		return response;
	} catch (error) {
		throw new Error(`Get List Room failed: ${error}`);
	}
});

export const fetchDetailRoom = createAsyncThunk('rooms/room', async (id: string) => {
	try {
		const response = await get(`rooms/`, { id: id });
		return response;
	} catch (error) {
		throw new Error(`Get Detail Room failed: ${error}`);
	}
});

export const fetchRoomTypes = async () => {
	try {
		const response = await get(`rooms/types`, { id: ' ' });
		return response;
	} catch (error) {
		throw new Error(`Get Room Type failed: ${error}`);
	}
};

export const fetchRoomImages = async (id: string) => {
	try {
		const response = await get(`rooms/imgs/`, { id: id });
		return response;
	} catch (error) {
		throw new Error(`Get Room Type failed: ${error}`);
	}
};

export const fetchAddRoom = async (data: FormData) => {
	try {
		const response = await post('rooms/inserts', { id: ' ' }, data);
		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
};
