export class InvalidPhoneException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidPhoneException';
	}
}

export class InvalidCardIDException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidCardIDException';
	}
}

export class InvalidAddressException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidAddressException';
	}
}

export class InvalidPasswordException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidPasswordException';
	}
}

export class InvalidEmailException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidEmailException';
	}
}

export class InvalidFirstNameException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidFirstNameException';
	}
}

export class InvalidLastNameException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidLastNameException';
	}
}

export class InvalidBirthdayException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidBirthdayException';
	}
}

export const validatePhone = (phone: string): string | undefined => {
	if (phone.length < 1) {
		throw new InvalidPhoneException('Số điện thoại không được trống');
	}

	// Loại bỏ tất cả các ký tự không phải số
	const cleaned = ('' + phone).replace(/\D/g, '');

	// Kiểm tra xem số điện thoại có hợp lệ hay không
	const regex = /^(03[2-9]|05[2-9]|07[0-9]|08[1-9]|09[0-9])[0-9]{7}$/; //Biểu số Việt Nam
	if (!regex.test(cleaned)) {
		throw new InvalidPhoneException('Số điện thoại sai định dạng');
	}

	// Kiểm tra xem số điện thoại có bắt đầu bằng 0 hay không
	if (cleaned.charAt(0) !== '0') {
		throw new InvalidPhoneException('Số điện thoại sai định dạng');
	}

	// Kiểm tra độ dài của số điện thoại
	if (cleaned.length !== 10) {
		throw new InvalidPhoneException('Số điện thoại không đúng 10 ký tự');
	}

	return undefined;
};

export const validatePassword = (password: string): string | undefined => {
	// Kiểm tra rỗng
	if (password.length < 1) {
		throw new InvalidPasswordException('Mật khẩu không được để trống');
	}

	// Kiểm tra độ dài của mật khẩu
	if (password.length < 8 || password.length > 20) {
		throw new InvalidPasswordException('Mật khẩu phải có từ 8 đến 20 ký tự');
	}

	// Kiểm tra mật khẩu có chứa ít nhất một chữ cái viết hoa
	if (!/[A-Z]/.test(password)) {
		throw new InvalidPasswordException('Mật khẩu phải chứa ít nhất một chữ cái viết hoa');
	}

	// Kiểm tra mật khẩu có chứa ít nhất một chữ cái viết thường
	if (!/[a-z]/.test(password)) {
		throw new InvalidPasswordException('Mật khẩu phải chứa ít nhất một chữ cái viết thường');
	}

	// Kiểm tra mật khẩu có chứa ít nhất một số
	if (!/[0-9]/.test(password)) {
		throw new InvalidPasswordException('Mật khẩu phải chứa ít nhất một số');
	}

	// Kiểm tra mật khẩu có chứa ít nhất một ký tự đặc biệt
	if (!/[#@$!%*&]/.test(password)) {
		throw new InvalidPasswordException('Mật khẩu phải chứa ít nhất một ký tự đặc biệt');
	}

	// Mật khẩu hợp lệ
	return undefined;
};

export const validateEmail = (email: string): string | undefined => {
	// Kiểm tra rỗng
	if (email.length < 1) {
		throw new InvalidEmailException('Email không được để trống');
	}

	// Biểu thức chính quy kiểm tra tính hợp lệ của địa chỉ email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Kiểm tra địa chỉ email có hợp lệ hay không
	if (!emailRegex.test(email)) {
		throw new InvalidEmailException('Địa chỉ email không hợp lệ');
	}

	// Email hợp lệ
	return undefined;
};
export const validateFirstName = (firstName: string): string | undefined => {
	// Kiểm tra độ dài của tên
	if (firstName.length < 1 || firstName.length > 50) {
		throw new InvalidFirstNameException('Họ phải có từ 1 đến 50 ký tự');
	}
	// Tên hợp lệ
	return undefined;
};

export const validateCardID = (card_id: string): string | undefined => {
	// Kiểm tra độ dài của tên
	if (card_id.length === 8 || card_id.length === 12) {
		throw new InvalidCardIDException('Mã số định danh phải đủ 8 hoặc 12 ký tự');
	}
	// Tên hợp lệ
	return undefined;
};

export const validateAddress = (address: string): string | undefined => {
	// Kiểm tra độ dài của tên
	if (address.length === 8 || address.length === 12) {
		throw new InvalidAddressException('Địa chỉ phải có ít nhất 5 ký tự');
	}
	// Tên hợp lệ
	return undefined;
};

export const validateLastName = (lastName: string): string | undefined => {
	// Kiểm tra độ dài của họ
	if (lastName.length < 1 || lastName.length > 50) {
		throw new InvalidLastNameException('Tên phải có từ 3 đến 50 ký tự');
	}
	// Họ hợp lệ
	return undefined;
};

export const validateBirthday = (birthday: Date): string | undefined => {
	// Tính tuổi của người dùng
	const ageDiffMs = Date.now() - birthday.getTime();
	const ageDate = new Date(ageDiffMs);
	const age = Math.abs(ageDate.getUTCFullYear() - 1970);

	// Kiểm tra người dùng có đủ tuổi để sử dụng dịch vụ hay không
	if (age < 16) {
		throw new InvalidBirthdayException('Bạn phải đủ 18 tuổi để sử dụng dịch vụ');
	}

	// Ngày sinh hợp lệ
	return undefined;
};
