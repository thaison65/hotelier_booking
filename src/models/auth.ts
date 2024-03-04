export interface UserAthu {
	expireAt: string;
	accessToken: string;
	id: string;
}

export interface UserRegister {
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

export interface ProfileResult {
	_id: string;
	first_name: string;
	last_name: string;
	card_id: string;
	email: string;
	phone: string;
	address: string;
	gender: string;
	birthday: string;
	slug: string;
}
