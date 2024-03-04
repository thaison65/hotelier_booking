import { SearchTouristResult } from '.';

export interface ImageResult {
	_id: string;
	img_url: string;
}

export interface HotelStateData {
	_id: string;
	img_url: ImageResult[];
	tin: string;
	name: string;
	name_short?: string;
	address: string;
	phone: string;
	id_hotelType: HotelTypeResult;
	number_star: number;
	description: string;
	regulations: string;
	certificate?: string;
	id_famousPlace: PLaceResult;
	id_tourists: SearchTouristResult[];
}

export interface HotelTypeResult {
	_id: string;
	name: string;
	description?: string;
}

export interface PLaceResult {
	_id: string;
	name: string;
	id_city: CityResult;
}

export interface CityResult {
	_id: string;
	name: string;
}
