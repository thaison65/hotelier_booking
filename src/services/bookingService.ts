import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, put } from '~/utils';

export const fetchBookingOfHotel = async () => {
	try {
		const response = await get('/hotels/bookings/', { id: '649168c386be6fba39740537' });

		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
};

export const fetchBookings = createAsyncThunk('bookings/manager', async () => {
	try {
		const response = await get(`bookings/manager/`, {});
		return response;
	} catch (error) {
		throw new Error(`Get bookings of manager failed: ${error}`);
	}
});

export const fetchChangeStatusBooking = async (id: string, status: string) => {
	try {
		const formData = new FormData();
		if (status) formData.append('status', status);

		const response = await put(`bookings/updateStatus`, { id: id }, formData);
		return response;
	} catch (error) {
		throw new Error(`Changes booking failed: ${error}`);
	}
};
