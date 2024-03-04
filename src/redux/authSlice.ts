import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { loginUser, fetchUserProfile, RegisterUser } from '~/services';
import { ProfileResult, UserAthu } from '~/models';

interface UserState {
	user: UserAthu;

	profile: ProfileResult;
	isLoggedIn: boolean;
	isLoading: boolean;
	error: string;
}

const initialState: UserState = {
	user: { expireAt: '', accessToken: '', id: '' },
	profile: {
		_id: '',
		first_name: '',
		last_name: '',
		card_id: '',
		email: '',
		phone: '',
		address: '',
		gender: '',
		birthday: '',
		slug: '',
	},
	isLoggedIn: false,
	isLoading: false,
	error: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		//Lưu thông tin người dùng
		userInfo: (state, action: PayloadAction<ProfileResult>) => {
			state.profile = action.payload;
		},

		// Định nghĩa hành động updateUserInfo để cập nhật thông tin người dùng
		updateUserInfo: (state, action: PayloadAction<UserAthu>) => {
			state.user = action.payload;

			const expireAt = new Date(0);
			expireAt.setUTCSeconds(parseInt(action.payload.expireAt));
			Cookies.set('userHotel', JSON.stringify(action.payload), {
				expires: expireAt,
				secure: true,
				sameSite: 'Lax',
			});
		},
		// định nghĩa hành động logout để đăng xuất
		logout: (state) => {
			state.user = { expireAt: '', accessToken: '', id: '' };
			state.profile = {
				_id: '',
				first_name: '',
				last_name: '',
				card_id: '',
				email: '',
				phone: '',
				address: '',
				gender: '',
				birthday: '',
				slug: '',
			};
			state.isLoggedIn = false;
			Cookies.set('userHotel', '');
		},
		setError: (state, action: PayloadAction<string>) => {
			console.log('lôi');
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		// xử lý hành động loginUser.fulfilled được trả về từ createAsyncThunk
		builder
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserAthu>) => {
				state.user = action.payload;
				state.isLoggedIn = true;
				state.isLoading = false;
				state.error = '';

				const expireAt = new Date(0);
				expireAt.setUTCSeconds(parseInt(action.payload.expireAt));
				Cookies.set('userHotel', JSON.stringify(action.payload), {
					expires: expireAt,
					secure: true,
					sameSite: 'Lax',
				});
			})
			// xử lý hành động loginUser.pending được trả về từ createAsyncThunk
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			// xử lý hành động loginUser.rejected được trả về từ createAsyncThunk
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			.addCase(RegisterUser.fulfilled, (state) => {
				state.isLoggedIn = true;
				state.isLoading = false;
				state.error = '';
			})
			.addCase(RegisterUser.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(RegisterUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<ProfileResult>) => {
				state.profile = action.payload;
				state.isLoggedIn = true;
				state.isLoading = false;
				state.error = '';
			})
			.addCase(fetchUserProfile.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export default authSlice;
