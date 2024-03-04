import { ImageResult } from '~/models';
import { StatusBooking } from '~/pages/Booking';

export const arrNumberStar = [
	{
		id: 0,
		title: 'Không có sao',
	},
	{
		id: 1,
		title: '1 sao',
	},
	{
		id: 2,
		title: '2 sao',
	},
	{
		id: 3,
		title: '3 sao',
	},
	{
		id: 4,
		title: '4 sao',
	},
	{
		id: 5,
		title: '5 sao',
	},
];

export const regulation = [
	{
		title: 'Hủy phòng miễn phí',
	},
	{
		title: 'Thanh toán trước',
	},
];

export const imgsState: ImageResult[] = [
	{
		_id: '1',
		img_url: '',
	},
	{
		_id: '2',
		img_url: '',
	},
	{
		_id: '3',
		img_url: '',
	},
	{
		_id: '4',
		img_url: '',
	},
	{
		_id: '5',
		img_url: '',
	},
];

export const statusBookings: StatusBooking[] = [
	{ title: 'Đã xác nhận', status: 'Confirmed' },
	{ title: 'Đang chờ xác nhận', status: 'PendingConfirmation' },
	{ title: 'Đã hủy đặt phòng', status: 'Cancelled' },
	{ title: 'Đã trả phòng', status: 'Completed' },
];
