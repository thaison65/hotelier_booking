import { statusBookings } from '~/routes/others';

export const convertStatusBooking = (status: string) => {
	const foundTitle = statusBookings.find((title) => title.status === status);
	return foundTitle ? foundTitle.title : '';
};

export const convertToVND = (price: number) => {
	const amount: number = price;
	const formattedAmount: string = amount.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
	return formattedAmount;
};
