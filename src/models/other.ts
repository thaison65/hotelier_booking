import { ImageResult } from '.';

export interface BtnImageResult {
	img_url: File;
	index: number;
}

export interface Title {
	[key: string]: string; // Chỉ số kiểu dữ liệu string cho phép truy cập vào các thuộc tính và phương thức của đối tượng Title bằng cách sử dụng một biểu thức kiểu string
}
export interface TitleTable extends Title {
	img_url: string;
	name: string;
	name_hotel: string;
	phone: string;
	status: string;
	type: string;
	price: string;
}

export interface TitleBooking extends Title {
	name_hotel: string;
	name: string;
	phone: string;
	check_in_date: string;
	check_out_date: string;
	createAt: string;
	status: string;
	price: string;
}

export interface DataTable {
	_id: string;
	img_url?: ImageResult;
	name?: string;
	address?: string;
	number_star?: string;
	phone?: string;
	type?: string;
	name_hotel?: string;
	email?: string;
	check_in_date?: string;
	check_out_date?: string;
	createdAt?: string;
	status?: string;
	price?: string;
	description?: string;
	count?: string;
	[key: string]: string | ImageResult | undefined;
}

export interface DataHotelRequest {
	_id?: string;
	name?: string;
	address?: string;
	certificate?: File | '';
	imgs?: ImageResult[];
	description?: string;
	tin?: string;
	id_famousPlace?: string;
	id_hotelType?: string;
	id_tourists?: string[];
	name_short?: string;
	number_star?: string;
	phone?: string;
	regulations?: string;
	img_url?: File[];
}
