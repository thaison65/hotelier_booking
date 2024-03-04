import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Typography,
} from '@mui/material';

import { filterBookings, filterDetailBooking, hotelsSelector } from '~/redux/selector';

import InputDateIn from '~/components/InputForm/InputDate';
import TableComponet from '~/components/Table';
import { BookingStateData, DataTable, HotelStateData, TitleBooking } from '~/models';
import { fetchBookings, fetchHotels } from '~/services';
import bookingSlice from '~/redux/bookingSlice';
import { statusBookings } from '~/routes/others';
import { convertStatusBooking, convertToVND, handleDateConvertVN } from '~/utils';
import DialogBooking from '~/components/Dialog/DialogBooking';

export interface StatusBooking {
	title: string;
	status: string;
}

const titles: TitleBooking = {
	name_hotel: 'Tên khách sạn',
	name: 'Họ và tên',
	phone: 'SDT',
	check_in_date: 'Ngày nhận phòng',
	check_out_date: 'Ngày trả phòng',
	createAt: 'Ngày tạo đơn',
	status: 'Trạng Thái',
	price: 'Giá tiền',
};

const BookingPage = () => {
	const dispatch = useDispatch<AppDispatch>();

	const newBookingsSelector: BookingStateData[] | undefined = useSelector(filterBookings);
	const newHotelsSelector: HotelStateData[] = useSelector(hotelsSelector);
	const newDetailBooking: BookingStateData | undefined = useSelector(filterDetailBooking);

	const nextDay = useMemo(() => {
		const currentDate = new Date();
		return new Date(currentDate.setDate(currentDate.getDate() + 1));
	}, []);

	const [status, setStatus] = useState<string>('New');
	const [valueSelectedHotel, setValueSelectedHotel] = useState<string>('All');

	const [hotels, setHotels] = useState<HotelStateData[]>([]);

	const [listBooking, setListBooking] = useState<DataTable[]>([]);

	// const [dateNumber, setDateNumber] = useState<string>('1');
	const [checkInDate, setCheckInDate] = useState<Date>(new Date());
	const [checkOutDate, setCheckOutDate] = useState<Date>(new Date(nextDay));

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchBookings());
				await dispatch(fetchHotels());
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [dispatch]);

	useEffect(() => {
		if (newBookingsSelector && newHotelsSelector) {
			setHotels(newHotelsSelector);

			const datas: DataTable[] = [];

			newBookingsSelector.forEach((booking) => {
				const data: DataTable = {
					_id: booking._id,
					name_hotel: booking.hotel.name,
					name: booking.first_name + ' ' + booking.last_name,
					phone: booking.phone,
					check_in_date: handleDateConvertVN(booking.check_in_date),
					check_out_date: handleDateConvertVN(booking.check_out_date),
					createdAt: handleDateConvertVN(booking.createdAt),
					status: convertStatusBooking(booking.status),
					price: convertToVND(parseInt(booking.total_price)),
				};

				datas.push(data);
			});

			setListBooking(datas);
		}
	}, [newBookingsSelector, newHotelsSelector]);

	const handleChangeStatus = (event: SelectChangeEvent) => {
		setStatus(event.target.value as string);
	};

	const handleChangeSelectedHotel = (event: SelectChangeEvent) => {
		setValueSelectedHotel(event.target.value as string);
	};

	const handleDateInDate = (date: Date) => {
		setCheckInDate(date);
	};
	const handleDataOutDate = (date: Date) => {
		setCheckOutDate(date);
	};

	const handleFilterValue = () => {
		dispatch(bookingSlice.actions.filterChangeStatus(status));
		dispatch(bookingSlice.actions.filterChangeHotel(valueSelectedHotel));
		dispatch(bookingSlice.actions.filterChangeCheckInDate(checkInDate.toISOString()));
		dispatch(bookingSlice.actions.filterChangeCheckOutDate(checkOutDate.toISOString()));
	};

	const handleOpenDialog = (id: string) => {
		setOpen(true);
		dispatch(bookingSlice.actions.uploadIdBooking(id));
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Box margin={2}>
				<Stack direction={'row'} spacing={2} marginY={2}>
					<Box flexGrow={1}>
						<Stack direction={'row'} spacing={2} alignItems={'end'}>
							<Box width={'20%'}>
								<Typography fontWeight={600} color={'primary'} marginY={1}>
									Lựa chọn trạng thái đơn
								</Typography>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
									<Select
										labelId="select-label"
										id="select"
										value={status}
										label="Trạng thái"
										onChange={handleChangeStatus}
									>
										<MenuItem value={'New'}>Mới nhất</MenuItem>
										{statusBookings.map((value) => {
											return (
												<MenuItem key={value.status} value={value.status}>
													{value.title}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Box>
							<Box>
								<Typography color={'primary'} fontWeight={600} marginY={1}>
									Lọc theo từng khách sạn
								</Typography>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Khách sạn</InputLabel>
									<Select
										labelId="select-label"
										id="select"
										value={valueSelectedHotel}
										label="Khách sạn"
										onChange={handleChangeSelectedHotel}
									>
										<MenuItem value={'All'}>Tất cả</MenuItem>
										{hotels.map((hotel: HotelStateData) => {
											return (
												<MenuItem key={hotel._id} value={hotel._id}>
													{hotel.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Box>

							{/* <Box>
								<Typography fontWeight={600} color={'primary'} marginY={1}>
									Ngày bắt đầu
								</Typography>
								<InputDateIn
									// dateNumber={dateNumber}
									onDateOut={handleDataOutDate}
									onDateIn={handleDateInDate}
								/>
							</Box>
							<Box>
								<Typography fontWeight={600} color={'primary'} marginY={1}>
									Ngày kết thúc
								</Typography>
								<InputDateIn
									// dateNumber={dateNumber}
									onDateOut={handleDataOutDate}
									onDateIn={handleDateInDate}
								/>
							</Box> */}
							<Button variant="contained" color="warning" onClick={handleFilterValue}>
								Lọc thông tin
							</Button>
						</Stack>
					</Box>
				</Stack>
			</Box>
			<Box sx={{ borderRadius: 4 }}>
				<TableComponet titles={titles} data={listBooking} handleOpenDialog={handleOpenDialog} />
			</Box>
			{newDetailBooking && (
				<DialogBooking open={open} handleClose={handleClose} booking={newDetailBooking} />
			)}
		</>
	);
};

export default BookingPage;
