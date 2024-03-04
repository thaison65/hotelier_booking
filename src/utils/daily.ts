export const handleDateConvertVN = (nextDay: Date | string) => {
	const checkoutdate = new Date(nextDay);
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	};
	const formattedDate = checkoutdate.toLocaleDateString('vi-VN', options);

	return formattedDate;
};
