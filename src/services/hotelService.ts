import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataHotelRequest } from '~/models';
import { del, get, post, put } from '~/utils';

export const fetchHotels = createAsyncThunk('hotels/hotels', async () => {
	try {
		const response = await get('hotels/managers/');
		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
});

export const fetchDetailHotel = createAsyncThunk('hotels/hotel', async (id: string) => {
	try {
		const response = await get(`hotels/`, { id: id });
		return response;
	} catch (error) {
		throw new Error(`Get Detail Hotel failed: ${error}`);
	}
});

export const fetchHotelType = async () => {
	try {
		const response = await get('hotels/types', { id: ' ' });
		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
};

export const fetchAddHotel = async (data: DataHotelRequest) => {
	try {
		// Tạo đối tượng FormData
		const formData = new FormData();

		// Kiểm tra dữ liệu
		if (
			data.img_url &&
			Array.isArray(data.img_url) &&
			data.img_url.every((file: File) => file instanceof File)
		) {
			// Nếu có dữ liệu file hợp lệ
			for (const file of data.img_url) {
				// Thêm từng file vào FormData
				formData.append('img_url', file);
			}
		}

		// Thêm các thuộc tính vào FormData
		if (data.name) formData.append('name', data.name);
		if (data.address) formData.append('address', data.address);
		if (data.certificate && data.certificate instanceof File)
			formData.append('certificate', data.certificate);

		if (data.description) formData.append('description', data.description);
		if (data.tin) formData.append('tin', data.tin);
		if (data.id_famousPlace) formData.append('id_famousPlace', data.id_famousPlace);
		if (data.id_hotelType) formData.append('id_hotelType', data.id_hotelType);
		if (data.id_tourists) {
			for (let i = 0; i < data.id_tourists.length; i++) {
				formData.append(`id_tourists[${i}]`, data.id_tourists[i]);
			}
		}
		if (data.name_short) formData.append('name_short', data.name_short);
		if (data.number_star) formData.append('number_star', data.number_star.toString());
		if (data.phone) formData.append('phone', data.phone);
		if (data.regulations) formData.append('regulations', data.regulations);

		const response = await post('hotels/insert', { id: '' }, formData);
		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
};

export const fetchUpdateHotel = async (id: string, data: DataHotelRequest) => {
	try {
		// Tạo đối tượng FormData
		const formData = new FormData();

		// Kiểm tra dữ liệu
		if (
			data.img_url &&
			Array.isArray(data.img_url) &&
			data.img_url.every((file: any) => file instanceof File)
		) {
			// Nếu có dữ liệu file hợp lệ
			for (const file of data.img_url) {
				// Thêm từng file vào FormData
				formData.append('img_url', file);
			}
		}

		// Thêm các thuộc tính vào FormData
		if (data.name) formData.append('name', data.name);
		if (data.address) formData.append('address', data.address);
		if (data.certificate && data.certificate instanceof File)
			formData.append('certificate', data.certificate);
		if (data.description) formData.append('description', data.description);
		if (data.tin) formData.append('tin', data.tin);
		if (data.id_famousPlace) formData.append('id_famousPlace', data.id_famousPlace);
		if (data.id_hotelType) formData.append('id_hotelType', data.id_hotelType);
		if (data.id_tourists) {
			for (let i = 0; i < data.id_tourists.length; i++) {
				formData.append(`id_tourists[${i}]`, data.id_tourists[i]);
			}
		}
		if (data.name_short) formData.append('name_short', data.name_short);
		if (data.number_star) formData.append('number_star', data.number_star.toString());
		if (data.phone) formData.append('phone', data.phone);
		if (data.regulations) formData.append('regulations', data.regulations);

		const response = await put('hotels/update', { id: id }, formData);
		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
};

export const fetchDeleteHotels = async (id: string) => {
	try {
		const response = await del('hotels/delete', { id: id });
		return response;
	} catch (error) {
		throw new Error(`Get List Hotel failed: ${error}`);
	}
};
