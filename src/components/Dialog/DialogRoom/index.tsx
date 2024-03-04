import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
	styled,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import {
	BtnImageResult,
	HotelStateData,
	ImageResult,
	RoomStateResult,
	RoomTypeResult,
} from '~/models';
import { hotelsSelector } from '~/redux/selector';
import { fetchHotels, fetchRoomImages, fetchRoomTypes } from '~/services';
import BtnImage from '~/components/Button/BtnImage/BtnImage';
import { imgsState } from '~/routes/others';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

type DialogRoomProps = {
	open: boolean;
	handleClose: () => void;
	room: RoomStateResult;
};

const DialogRoom = (props: DialogRoomProps) => {
	const { open, handleClose, room } = props;

	const dispatch = useDispatch<AppDispatch>();

	const newHotelsSelector = useSelector(hotelsSelector);

	const [hotels, setHotels] = useState<HotelStateData[]>([]);
	const [types, setTypes] = useState<RoomTypeResult[]>([]);

	const [valueSelected, setValueSelected] = useState<string>(room.id_hotel as string);
	const [valueTypeSelected, setValueTypeSelected] = useState<string>(room.id_roomType._id);

	const [imgs, setImgs] = useState<ImageResult[]>();

	const [fileImages, setFileImageData] = useState<File[]>([]);
	const [idImg, setIdImg] = useState<number[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchHotels());
				const reponseType = await fetchRoomTypes();
				const reponseImgs: ImageResult[] = await fetchRoomImages(room._id);

				const updatedImgsState = imgsState.map((value, index) =>
					index < reponseImgs.length ? reponseImgs[index] : value
				);

				setImgs(updatedImgsState);
				setTypes(reponseType);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [dispatch, room]);

	useEffect(() => {
		if (newHotelsSelector.length > 0) {
			setHotels(newHotelsSelector);
		}
	}, [newHotelsSelector]);

	const handleChangeSelected = (event: SelectChangeEvent) => {
		setValueSelected(event.target.value as string);
	};

	const handleChangeTypeSelected = (event: SelectChangeEvent) => {
		setValueTypeSelected(event.target.value as string);
	};

	const handlefileImageData = (imageId: BtnImageResult) => {
		// Xử lý dữ liệu của hình ảnh với id là imageId

		if (idImg.length > 0) {
			const filteredIds = idImg.filter((value) => value !== imageId.index);
			setIdImg(filteredIds);

			if (fileImages[imageId.index]) {
				fileImages.splice(imageId.index, 1); // Assuming fileImages is an array
			}
		}

		setFileImageData((prevfileImageData) => [...prevfileImageData, imageId.img_url]);
		setIdImg((prevIdImg) => [...prevIdImg, imageId.index]);
	};

	const handleOpenUpdate = () => {
		console.log('');
	};

	const handleOpenDelete = () => {
		console.log('');
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
			<DialogTitle>
				<Typography component={'span'} variant="h6" fontWeight={600}>
					Thông tin chi tiết phòng {room.name}
				</Typography>
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
			</DialogTitle>
			<DialogContent dividers>
				<Grid container spacing={2} marginY={2}>
					<Grid item xs={12} md={4}>
						<Item elevation={0}>
							<TextField
								id="txt_name"
								name="name"
								label="Tên phòng (Số phòng)"
								fullWidth
								variant="outlined"
								defaultValue={room.name}
							/>
						</Item>
					</Grid>
					<Grid item xs={12} md={4}>
						<Item elevation={0}>
							<TextField
								id="txt_phone"
								name="phone"
								label="Số điện thoại của phòng"
								fullWidth
								variant="outlined"
								defaultValue={room.phone}
							/>
						</Item>
					</Grid>
					<Grid item xs={12} md={4}>
						<Item elevation={0}>
							<TextField
								id="txt_price"
								name="price"
								label="Giá phòng"
								fullWidth
								variant="outlined"
								defaultValue={room.price}
							/>
						</Item>
					</Grid>
				</Grid>
				<TextField
					id="txt_description"
					name="description"
					label="Mô tả"
					fullWidth
					variant="outlined"
					defaultValue={room.description}
				/>
				<Grid container spacing={2} marginY={2}>
					<Grid item xs={12} md={6}>
						<Item elevation={0}>
							<FormControl fullWidth>
								<InputLabel>Phòng thuộc khách sạn</InputLabel>
								<Select
									labelId="select-label"
									id="select"
									value={valueSelected}
									label="Phòng thuộc khách sạn"
									onChange={handleChangeSelected}
									sx={{ textAlign: 'start' }}
								>
									{hotels.map((hotel) => {
										return (
											<MenuItem key={hotel._id} value={hotel._id}>
												{hotel.name}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Item>
					</Grid>
					<Grid item xs={12} md={6}>
						<Item elevation={0}>
							<FormControl fullWidth>
								<InputLabel>Loại phòng</InputLabel>
								<Select
									labelId="select-label"
									id="select"
									value={valueTypeSelected}
									label="Loại phòng"
									onChange={handleChangeTypeSelected}
									sx={{ textAlign: 'start' }}
								>
									{types.map((type) => {
										return (
											<MenuItem key={type._id} value={type._id}>
												{type.name}: {type.beds} gường, {type.capacity} người
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Item>
					</Grid>
				</Grid>

				<Stack direction={'row'} width={'100%'} flexWrap={'wrap'}>
					{imgs &&
						imgs.map((img, index) => {
							return (
								<Box key={img._id} margin={1}>
									<BtnImage
										src={img.img_url}
										_id={img._id}
										handleCLick={handlefileImageData}
										index={index}
									/>
								</Box>
							);
						})}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={'row'} spacing={1} justifyContent={'end'}>
					<Button variant="contained" onClick={handleClose}>
						Thoát
					</Button>
					<Button variant="contained" color="error" onClick={handleOpenDelete}>
						Xóa
					</Button>
					<Button variant="contained" color="success" onClick={handleOpenUpdate}>
						Cập nhật
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
};

export default DialogRoom;
