import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	get,
	postAuth,
	validateAddress,
	validateCardID,
	validateEmail,
	validateFirstName,
	validateLastName,
	validatePassword,
	validatePhone,
} from '~/utils';
import { UserAthu, UserRegister } from '~/models';

export const loginUser = createAsyncThunk<UserAthu, { email: string; password: string }>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await postAuth('hotels/users/login', { email, password });

			return response;
		} catch (error) {
			throw thunkAPI.rejectWithValue('Something went wrong');
		}
	}
);

export const RegisterUser = createAsyncThunk<
	UserRegister,
	{
		first_name: string;
		last_name: string;
		card_id: string;
		phone: string;
		email: string;
		password: string;
		address: string;
		gender: string;
		birthday: Date;
	}
>(
	'auth/register',
	async (
		{ first_name, last_name, card_id, phone, email, password, address, gender, birthday },
		thunkAPI
	) => {
		try {
			const response = await postAuth('hotels/users/register', {
				first_name,
				last_name,
				card_id,
				phone,
				email,
				password,
				address,
				gender,
				birthday,
			});

			return response;
		} catch (error) {
			throw thunkAPI.rejectWithValue('Something went wrong');
		}
	}
);

export const fetchUserProfile = createAsyncThunk('auth/profile', async () => {
	try {
		const response = await get('hotels/users/');
		return response;
	} catch (error) {
		throw new Error(`Get Profile failed: ${error}`);
	}
});
