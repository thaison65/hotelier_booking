import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HotelStateData } from '~/models';
import { fetchDetailHotel, fetchHotels } from '~/services';

interface HotelState {
	hotel: HotelStateData;
	hotels: HotelStateData[];
	isLoading: boolean;
	error: string;
}

const initialState: HotelState = {
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
	hotels: [
		{
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
	],
	isLoading: false,
	error: '',
};

const hotelSlice = createSlice({
	name: 'hotel',
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<string>) => {
			console.log('lôi');
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		// xử lý hành động loginUser.fulfilled được trả về từ createAsyncThunk
		builder

			.addCase(fetchDetailHotel.fulfilled, (state, action: PayloadAction<HotelStateData>) => {
				state.hotel = action.payload;
				state.isLoading = false;
				state.error = '';
			})
			.addCase(fetchDetailHotel.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchDetailHotel.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			.addCase(fetchHotels.fulfilled, (state, action: PayloadAction<HotelStateData[]>) => {
				state.hotels = action.payload;
				state.isLoading = false;
				state.error = '';
			})
			.addCase(fetchHotels.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchHotels.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export default hotelSlice;
