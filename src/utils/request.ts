import axios from 'axios';
import Cookies from 'js-cookie';

interface RequestOptions {
	id?: string;
	searchString?: string;
	size?: number;
}

const request = axios.create({
	baseURL: `http://localhost:3065/api/`,
});

request.interceptors.response.use(
	function (response) {
		return response.data;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export const get = async (path: string, option: RequestOptions = {}) => {
	const userHotelCookie = Cookies.get('userHotel');
	const userHotelObject = userHotelCookie ? JSON.parse(userHotelCookie) : null;
	const accessToken = userHotelObject?.accessToken;
	let id = userHotelObject?.id;

	if (option.id) {
		id = option.id;
	}

	try {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		};
		const response = await request.get(`${path}${id}`, { headers });
		return response.data;
	} catch (error) {
		throw new Error(error as string);
	}
};

export const getSearch = async (path: string, option: RequestOptions = {}) => {
	const userHotelCookie = Cookies.get('userHotel');
	const userHotelObject = userHotelCookie ? JSON.parse(userHotelCookie) : null;
	const accessToken = userHotelObject?.accessToken;

	let searchString = '';
	let size = 0;
	if (option.searchString && option.size) {
		searchString = option.searchString;
		size = option.size;
	}
	try {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		};
		const response = await request.get(`${path}?searchString=${searchString}&size=${size}`, {
			headers,
		});
		return response.data;
	} catch (error) {
		throw new Error(error as string);
	}
};

export const post = async (path: string, option: RequestOptions = {}, data: FormData) => {
	// Code kiểm tra cookie và accessToken
	const userHotelCookie = Cookies.get('userHotel');
	const userHotelObject = userHotelCookie ? JSON.parse(userHotelCookie) : null;
	let id = userHotelObject?.id;

	if (!userHotelObject || !userHotelObject.accessToken) {
		throw new Error('Invalid user data');
	}

	const accessToken = userHotelObject.accessToken;
	if (option.id) {
		id = option.id;
	}

	const headers = {
		Authorization: `Bearer ${accessToken}`,
		// Thiết lập Content-Type header
		'Content-Type': 'multipart/form-data',
	};

	const response = await request.post(`${path}/${id}`, data, { headers });
	return response.data;
};

export const postAuth = async (path: string, data: any) => {
	const response = await request.post(path, data);
	return response.data;
};

export const put = async (path: string, option: RequestOptions = {}, data: FormData) => {
	try {
		const userHotelCookie = Cookies.get('userHotel');
		const userHotelObject = userHotelCookie ? JSON.parse(userHotelCookie) : null;
		if (!userHotelObject || !userHotelObject.accessToken) {
			throw new Error('Invalid user data');
		}

		const accessToken = userHotelObject.accessToken;
		const id = option.id || '';

		const headers = {
			Authorization: `Bearer ${accessToken}`,
			// Thiết lập Content-Type header
			'Content-Type': 'multipart/form-data',
		};

		const response = await request.put(`${path}/${id}`, data, { headers });
		return response.data;
	} catch (error) {
		throw new Error(error as string);
	}
};

export const del = async (path: string, option: RequestOptions = {}) => {
	try {
		// Code kiểm tra cookie và accessToken
		const userHotelCookie = Cookies.get('userHotel');
		const userHotelObject = userHotelCookie ? JSON.parse(userHotelCookie) : null;
		if (!userHotelObject || !userHotelObject.accessToken) {
			throw new Error('Invalid user data');
		}

		const accessToken = userHotelObject.accessToken;
		const id = option.id || '';

		const headers = {
			Authorization: `Bearer ${accessToken}`,
			// Thiết lập Content-Type header
			'Content-Type': 'application/json',
		};

		const response = await request.delete(`${path}/${id}`, { headers });
		return response;
	} catch (error) {
		throw new Error(error as string);
	}
};

export default request;
