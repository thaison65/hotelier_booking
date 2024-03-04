import { HotelStateData, RoomResult } from '.';

export interface BookingResult {
	newBooking?: {
		_id: string;
		check_in_date: string;
		check_out_date: string;
		number_adults: string;
		number_children?: string;
		number_room: string;
		total_price: string;
	};
	room?: {
		name: string;
		price: string;
		capacity: string;
		beds: string;
	};
}

export interface BookingResultState {
	_id: string;
	id_customer: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	name_customer?: string;
	phone_customer?: string;
	check_in_date: string;
	check_out_date: string;
	number_adults: string;
	number_children?: string;
	number_room: string;
	total_price: string;
	note?: string;
	status: string;
}

export interface BookingStateData {
	_id: string;
	id_customer: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	name_customer?: string;
	phone_customer?: string;
	check_in_date: string;
	check_out_date: string;
	number_adults: string;
	number_children?: string;
	number_room: string;
	total_price: string;
	note?: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	rooms: RoomResult[];
	hotel: HotelStateData;
}
