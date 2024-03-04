import { FormEvent, useState } from 'react';

import {
	Alert,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Typography,
} from '@mui/material';
import { DataHotelRequest } from '~/models';
import { fetchAddHotel, fetchUpdateHotel } from '~/services';

type DialogAlertProps = {
	title: string;
	description: string;
	lable_btn: string;
	open: boolean;
	data: DataHotelRequest;
	handleClose: () => void;
};

const DialogAlert = (props: DialogAlertProps) => {
	const { title, description, lable_btn, open, handleClose, data } = props;

	const [openAltert, setOpenAlert] = useState<boolean>(false);
	const [titleAlert, setTitleAlert] = useState<string>('');

	const handleDelete = () => {
		console.log('delete');

		// const id = data?._id ? data._id : '';

		try {
			const fetchUpdate = async () => {
				// await fetchDetailHotel(id);
			};
			fetchUpdate();
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitFormAdd = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const fetchAdd = async () => {
				await fetchAddHotel(data);
			};
			fetchAdd();
			handleClose();
			setOpenAlert(true);
			setTitleAlert('Thêm thành công');
		} catch (error) {
			console.log(error);
			setOpenAlert(true);
			setTitleAlert('Thêm không thành công');
		}
	};

	const handleSubmitFormUpdate = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const id = data?._id ? data._id : '';

		try {
			const fetchUpdate = async () => {
				await fetchUpdateHotel(id, data);
			};
			fetchUpdate();
			handleClose();
			setOpenAlert(true);
			setTitleAlert('Cập nhật thành công');
		} catch (error) {
			console.log(error);
			setOpenAlert(true);
			setTitleAlert('Cập nhật không thành công');
		}
	};

	const handlCloseAlert = () => {
		setOpenAlert(false);
		setTitleAlert('');
	};

	return (
		<>
			<Snackbar open={openAltert} autoHideDuration={6000} onClose={handlCloseAlert}>
				<Alert
					onClose={handlCloseAlert}
					severity={titleAlert.includes('không') ? 'error' : 'success'}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{titleAlert}
				</Alert>
			</Snackbar>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Bạn có muốn{' '}
						<Typography variant="body1" component={'span'} color={'red'} fontWeight={600}>
							{description}
						</Typography>{' '}
						thông tin về khách sạn này không ?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Box
						component={'form'}
						onSubmit={lable_btn === 'Sửa đổi' ? handleSubmitFormUpdate : handleSubmitFormAdd}
					>
						<Button
							onClick={lable_btn === 'Xóa' ? handleDelete : undefined}
							type={lable_btn === 'Xóa' ? 'button' : 'submit'}
							variant="contained"
							color={lable_btn === 'Xóa' ? 'error' : 'primary'}
						>
							{lable_btn}
						</Button>
						<Button onClick={handleClose} autoFocus>
							Đóng
						</Button>
					</Box>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DialogAlert;
