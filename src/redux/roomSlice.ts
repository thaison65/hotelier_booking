import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RoomsStateResult, RoomStateResult } from '~/models';
import { fetchDetailRoom, fetchRooms } from '~/services';

interface HotelState {
	room: RoomStateResult;
	rooms: RoomsStateResult[];
	filterHotel: string;
	status: string;
	id: string;
	isLoading: boolean;
	error: string;
}

const initialState: HotelState = {
	room: {
		_id: '',
		id_roomType: {
			_id: '',
			name: '',
			beds: '',
			capacity: '',
		},
		img: {
			_id: '',
			img_url: '',
		},
		name: '',
		phone: '',
		price: '',
		status: '',
		description: '',
		createdAt: '',
	},
	rooms: [
		{
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
			newRooms: [
				{
					_id: '',
					id_roomType: {
						_id: '',
						name: '',
						beds: '',
						capacity: '',
					},
					img: {
						_id: '',
						img_url: '',
					},
					name: '',
					phone: '',
					price: '',
					status: '',
					description: '',
					createdAt: '',
				},
			],
		},
	],
	filterHotel: '',
	status: 'name',
	id: '',
	isLoading: false,
	error: '',
};

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		statusFilter: (state, action: PayloadAction<string>) => {
			state.status = action.payload;
		},
		filterChangeHotel: (state, action: PayloadAction<string>) => {
			state.filterHotel = action.payload;
		},

		uploadIdRoom: (state, action: PayloadAction<string>) => {
			state.id = action.payload;
		},

		setError: (state, action: PayloadAction<string>) => {
			console.log('lôi');
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		// xử lý hành động loginUser.fulfilled được trả về từ createAsyncThunk
		builder

			.addCase(fetchDetailRoom.fulfilled, (state, action: PayloadAction<RoomStateResult>) => {
				state.room = action.payload;
				state.isLoading = false;
				state.error = '';
			})
			.addCase(fetchDetailRoom.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchDetailRoom.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			.addCase(fetchRooms.fulfilled, (state, action: PayloadAction<RoomsStateResult[]>) => {
				state.rooms = action.payload;
				state.isLoading = false;
				state.error = '';
			})
			.addCase(fetchRooms.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchRooms.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export default roomSlice;
