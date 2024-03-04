import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookingStateData } from '~/models';
import { fetchBookings } from '~/services';

interface BookingState {
	bookings: BookingStateData[];
	status: string;
	filterHotel: string;
	checkInDate: string;
	checkOutDate: string;
	idBooking: string;
	isLoading: boolean;
	error: string;
}

const initialState: BookingState = {
	bookings: [
		{
			_id: '',
			id_customer: '',
			first_name: '',
			last_name: '',
			email: '',
			phone: '',
			name_customer: '',
			phone_customer: '',
			check_in_date: '',
			check_out_date: '',
			number_adults: '',
			number_children: '',
			number_room: '',
			total_price: '',
			note: '',
			status: '',
			createdAt: '',
			updatedAt: '',
			rooms: [{ _id: '', id_roomType: '', name: '', phone: '', price: '', status: '' }],
			hotel: {
				_id: '',
				img_url: [],
				name: '',
				address: '',
				phone: '',
				id_hotelType: {
					_id: '',
					name: '',
					description: '',
				},
				number_star: 0,
				description: '',
				regulations: '',
				id_famousPlace: {
					_id: '',
					name: '',
					id_city: {
						_id: '',
						name: '',
					},
				},
				id_tourists: [],
				certificate: '',
				tin: '',
			},
		},
	],
	status: 'New',
	filterHotel: 'All',
	checkInDate: '',
	checkOutDate: '',
	idBooking: '',
	isLoading: false,
	error: '',
};

const bookingSlice = createSlice({
	name: 'bookings',
	initialState,
	reducers: {
		filterChangeHotel: (state, action) => {
			state.filterHotel = action.payload;
		},
		filterChangeStatus: (state, action) => {
			state.status = action.payload;
		},
		filterChangeCheckInDate: (state, action) => {
			state.checkInDate = action.payload;
		},
		filterChangeCheckOutDate: (state, action) => {
			state.checkOutDate = action.payload;
		},
		uploadIdBooking: (state, action) => {
			state.idBooking = action.payload;
		},
		updateStatus: (state, action) => {
			const updatedObject = action.payload;
			const index = state.bookings.findIndex((obj) => obj._id === updatedObject._id);
			if (index !== -1) {
				state.bookings[index] = { ...state.bookings[index], status: updatedObject.status };
			}
		},
	},
	extraReducers: (builder) => {
		// xử lý hành động loginUser.fulfilled được trả về từ createAsyncThunk
		builder

			.addCase(fetchBookings.fulfilled, (state, action: PayloadAction<BookingStateData[]>) => {
				state.bookings = action.payload;
				state.isLoading = false;
				state.error = '';
			})
			.addCase(fetchBookings.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchBookings.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export default bookingSlice;
