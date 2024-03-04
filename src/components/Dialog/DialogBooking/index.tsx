import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Paper,
	Stack,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import { BookingStateData } from '~/models';

import CloseIcon from '@mui/icons-material/Close';
import VillaIcon from '@mui/icons-material/Villa';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import { convertStatusBooking, convertToVND, handleDateConvertVN } from '~/utils';
import bookingSlice from '~/redux/bookingSlice';
import { fetchChangeStatusBooking } from '~/services';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

type DialogBookingProps = {
	open: boolean;
	handleClose: () => void;
	booking: BookingStateData;
};

const DialogBooking = (props: DialogBookingProps) => {
	const { open, handleClose, booking } = props;

	const dispatch = useDispatch<AppDispatch>();

	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [titleAlert, setTitleAlert] = useState<string>('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await fetchChangeStatusBooking(booking._id, 'Confirmed');

			dispatch(bookingSlice.actions.updateStatus({ _id: booking._id, status: 'Confirmed' }));

			handleClose();
			handleCloseAlert();
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancelOrder = async () => {
		try {
			await fetchChangeStatusBooking(booking._id, 'Cancelled');

			dispatch(bookingSlice.actions.updateStatus({ _id: booking._id, status: 'Cancelled' }));

			handleClose();
			handleCloseAlert();
		} catch (error) {
			console.log(error);
		}
	};

	const handleOpenCancelOrder = () => {
		setOpenAlert(true);
		setTitleAlert('Hủy');
	};

	const handleOpenUpdateOrder = () => {
		setOpenAlert(true);
		setTitleAlert('Chấp thuận');
	};

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth={'lg'}>
				<DialogTitle>
					<Typography component={'span'} variant="h6" fontWeight={600}>
						Chi tiết đơn đặt phòng
					</Typography>
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers>
					<Stack paddingY={2} spacing={3}>
						<Stack spacing={2}>
							<Typography marginLeft={1} fontWeight={600} color={'GrayText'}>
								Thông tin khách hàng
							</Typography>
							<Box>
								<Grid container spacing={1}>
									<Grid item md={2} xs={6}>
										<Item elevation={0}>
											<TextField
												id="txt_fisrt_name"
												name="fisrt_name"
												label="Họ tên lót"
												fullWidth
												variant="outlined"
												defaultValue={booking.first_name}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item md={2} xs={6}>
										<Item elevation={0}>
											<TextField
												id="txt_last_name"
												name="last_name"
												label="Tên khách hàng"
												fullWidth
												variant="outlined"
												defaultValue={booking.last_name}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item md={3} xs={12}>
										<Item elevation={0}>
											<TextField
												id="txt_customer_name"
												name="customer_name"
												label="Tên khách hàng được đặt giúp"
												fullWidth
												variant="outlined"
												defaultValue={booking.name_customer}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item md={2} xs={12}>
										<Item elevation={0}>
											<TextField
												id="txt_phone"
												name="phone"
												label="Số điện thoại"
												fullWidth
												variant="outlined"
												defaultValue={booking.phone}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item md={3} xs={12}>
										<Item elevation={0}>
											<TextField
												id="txt_phone_customer"
												name="phone_customer"
												label="SDT khác"
												fullWidth
												variant="outlined"
												defaultValue={booking.phone_customer}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
								</Grid>
							</Box>
							<Box>
								<Grid container spacing={1}>
									<Grid item xs={12} md={4}>
										<Item elevation={0}>
											<TextField
												id="txt_email"
												name="email"
												label="Địa chỉ email"
												fullWidth
												variant="outlined"
												defaultValue={booking.email}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item xs={12} md={8}>
										<Item elevation={0}>
											<TextField
												id="txt_note"
												name="note"
												label="Ghi chú thông tin"
												fullWidth
												variant="outlined"
												defaultValue={booking.note}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
								</Grid>
							</Box>
						</Stack>

						<Stack spacing={2}>
							<Stack direction={'row'} justifyContent={'space-between'}>
								<Typography marginLeft={1} fontWeight={600} color={'GrayText'}>
									Thông tin về đơn đặt phòng
								</Typography>
								<Typography color={'red'}>
									Bạn chỉ có thể thay đổi trạng thái của đơn đặt phòng
								</Typography>
							</Stack>
							<Box>
								<Grid container spacing={1}>
									<Grid item xs={6} md={3}>
										<Item elevation={0}>
											<TextField
												id="txt_check_in_date"
												name="check_in_date"
												label="Ngày nhận phòng"
												fullWidth
												variant="outlined"
												defaultValue={handleDateConvertVN(booking.check_in_date)}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item xs={6} md={3}>
										<Item elevation={0}>
											<TextField
												id="txt_check_out_date"
												name="check_out_date"
												label="Ngày trả phòng"
												fullWidth
												variant="outlined"
												defaultValue={handleDateConvertVN(booking.check_out_date)}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item xs={6} md={3}>
										<Item elevation={0}>
											<TextField
												id="txt_created_at"
												name="created_at"
												label="Ngày đặt phòng (tạo đơn)"
												fullWidth
												variant="outlined"
												defaultValue={handleDateConvertVN(booking.createdAt)}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
								</Grid>
							</Box>
							<Box>
								<Grid container spacing={1}>
									<Grid item xs={6} md={2}>
										<Item elevation={0}>
											<TextField
												id="txt_number_adults"
												name="number_adults"
												label="Số lượng người lớn"
												fullWidth
												variant="outlined"
												defaultValue={booking.number_adults + ' người lớn'}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item xs={6} md={2}>
										<Item elevation={0}>
											<TextField
												id="txt_number_children"
												name="number_children"
												label="Số lượng trẻ em"
												fullWidth
												variant="outlined"
												defaultValue={
													booking.number_children?.length
														? booking.number_children.length
														: 0 + ' trẻ em'
												}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item xs={6} md={2}>
										<Item elevation={0}>
											<TextField
												id="txt_number_room"
												name="number_room"
												label="Số lượng phòng đã đặt"
												fullWidth
												variant="outlined"
												defaultValue={booking.number_room + ' phòng'}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item xs={6} md={2}>
										<Item elevation={0}>
											<TextField
												id="txt_total_price"
												name="total_price"
												label="Tổng tiền khách trả"
												fullWidth
												variant="outlined"
												defaultValue={convertToVND(parseInt(booking.total_price))}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
									<Grid item xs={6} md={4}>
										<Item elevation={0}>
											<TextField
												id="txt_total_price"
												name="total_price"
												label="Trạng thái đơn đặt phòng"
												fullWidth
												variant="outlined"
												defaultValue={convertStatusBooking(booking.status)}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Item>
									</Grid>
								</Grid>
							</Box>
						</Stack>

						<Stack spacing={2}>
							<Typography marginLeft={1} fontWeight={600} color={'GrayText'}>
								Thông tin về khách sạn và phòng
							</Typography>

							<Stack direction={'row'} justifyContent={'space-between'}>
								<Stack spacing={1}>
									<Stack direction={'row'}>
										<VillaIcon />
										<Typography>
											{booking.hotel.name} {`(${booking.hotel.name_short})`}
										</Typography>
									</Stack>
									<Stack direction={'row'}>
										<LocalPhoneIcon />
										<Typography>{booking.hotel.phone}</Typography>
									</Stack>
									<Stack direction={'row'}>
										<PlaceIcon />
										<Typography>{booking.hotel.address}</Typography>
									</Stack>
								</Stack>
								<Box>
									<Typography color={'GrayText'}>Danh sách các phòng được đặt</Typography>
									<Typography color={'GrayText'}>
										{booking.rooms.length} phòng đã được đặt
									</Typography>
									{booking.rooms.map((room, index) => {
										return (
											<Box key={room._id}>
												<Stack direction={'row'} spacing={1}>
													<Typography>Tên phòng thứ {index + 1}: </Typography>
													<Typography fontWeight={600}>{room.name}</Typography>
												</Stack>
											</Box>
										);
									})}
								</Box>
							</Stack>
						</Stack>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Stack spacing={1}>
						<Typography color={'GrayText'}>
							Nếu bạn đã thay đổi trạng thái của đơn đặt phòng theo ý bản thân thì bấm cập nhật
						</Typography>
						<Stack direction={'row'} spacing={1} justifyContent={'end'}>
							<Button variant="contained" onClick={handleClose}>
								Thoát
							</Button>
							<Button variant="contained" color="error" onClick={handleOpenCancelOrder}>
								Hủy đơn đặt phòng
							</Button>
							<Button variant="contained" color="success" onClick={handleOpenUpdateOrder}>
								Xác nhận đặt phòng
							</Button>
						</Stack>
					</Stack>
				</DialogActions>
			</Dialog>

			<Dialog open={openAlert} onClose={handleCloseAlert}>
				<Box component={'form'} onSubmit={handleSubmit}>
					<DialogContent>Bạn muốn {titleAlert} đơn đặt phòng?</DialogContent>
					<DialogActions>
						<Button variant="contained" onClick={handleCloseAlert}>
							Thoát
						</Button>
						<Button
							variant="contained"
							color="warning"
							type={titleAlert === 'Hủy' ? 'button' : 'submit'}
							onClick={titleAlert === 'Hủy' ? handleCancelOrder : undefined}
						>
							{titleAlert}
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</>
	);
};

export default DialogBooking;
