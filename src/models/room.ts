import { HotelStateData, ImageResult } from '.';

export interface RoomResult {
	_id: string;
	name: string;
	img_url?: string;
	id_roomType: string;
	status: string;
	phone: string;
	price: string;
}

export interface RoomStateResult {
	_id: string;
	id_hotel?: string;
	name: string;
	name_hotel?: string;
	img: ImageResult;
	id_roomType: RoomTypeResult;
	status: string;
	phone: string;
	price: string;
	description: string;
	createdAt: string;
}

export interface RoomsStateResult {
	hotel: HotelStateData;
	newRooms: RoomStateResult[];
}

export interface RoomTypeResult {
	_id: string;
	name: string;
	beds: string;
	capacity: string;
	description?: string;
}

export interface GroupedRoom {
	roomType: {
		_id: string;
		name: string;
		capacity: string;
		beds: string;
		description?: string;
	};
	img: ImageResult;
	count: number;
	name_hotel?: string;
}
