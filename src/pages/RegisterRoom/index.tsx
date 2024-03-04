import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import {
	Alert,
	Box,
	Button,
	Container,
	Dialog,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Snackbar,
	Stack,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import { fetchAddRoom, fetchHotels, fetchRoomTypes } from '~/services';
import { BtnImageResult, HotelStateData, RoomTypeResult } from '~/models';
import { hotelsSelector } from '~/redux/selector';
import { imgsState } from '~/routes/others';
import BtnImage from '~/components/Button/BtnImage/BtnImage';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const RegisterRoomPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const newHotelsSelector = useSelector(hotelsSelector);

	const [count, setCount] = useState<number>(0);
	const [countRoom, setCountRoom] = useState<number>(0);
	const [names, setNames] = useState<string[]>([]);
	const [phones, setPhones] = useState<string[]>([]);
	const [prices, setPrices] = useState<string[]>([]);
	const [descriptions, setDescriptions] = useState<string[]>([]);

	const [fileImages, setFileImageData] = useState<File[]>([]);
	const [idImg, setIdImg] = useState<number[]>([]);

	const [open, setOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');

	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [titleAlert, setTitleAlertErr] = useState<string>('');

	const [valueTypeSelected, setValueTypeSelected] = useState<string>('');
	const [valueSelected, setValueSelected] = useState<string>('');

	const [hotels, setHotels] = useState<HotelStateData[]>([]);
	const [types, setTypes] = useState<RoomTypeResult[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchHotels());
				const reponseType = await fetchRoomTypes();

				setTypes(reponseType);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [dispatch]);

	useEffect(() => {
		if (newHotelsSelector.length > 0) {
			setHotels(newHotelsSelector);
		}
	}, [newHotelsSelector]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeSelected = (event: SelectChangeEvent) => {
		setValueSelected(event.target.value as string);
	};

	const handleChangeTypeSelected = (event: SelectChangeEvent) => {
		setValueTypeSelected(event.target.value as string);
	};

	const handleClickCount = () => {
		if (typeof count !== 'number' || count === 0 || count > 10) {
			setOpenAlert(true);
			setTitleAlertErr('Nhập số lượng phòng sai');
			setCount(0);
		}
		setCountRoom(count);
		setNames(Array(countRoom).fill(''));
		setPhones(Array(countRoom).fill(''));
		setPrices(Array(countRoom).fill(''));
		setDescriptions(Array(countRoom).fill(''));
	};

	const handleCloseAlert = () => {
		setOpenAlert(false);
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

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (valueSelected === '' || valueTypeSelected === '') {
				setOpen(true);
				setTitle('Bạn chưa chọn khách sạn hoặc loại phòng');
				return;
			}

			const formData = new FormData();
			for (let i = 0; i < countRoom; i++) {
				formData.append('name', names[i]);
				formData.append('phone', phones[i]);
				formData.append('price', prices[i]);
				formData.append('description', descriptions[i]);
			}
			formData.append('id_hotel', valueSelected as string);
			formData.append('id_roomType', valueTypeSelected as string);
			for (const file of fileImages) {
				// Thêm từng file vào FormData
				formData.append('img_url', file);
			}

			await fetchAddRoom(formData);
			// Xử lý kết quả response tại đây (nếu cần)
			setOpen(true);
			setTitle('Thêm thành công');
			setTimeout(() => {
				navigate('/phong');
			}, 1000);
		} catch (error) {
			console.log(error);
			// Xử lý lỗi tại đây (nếu cần)
			setOpen(true);
			setTitle('Thêm không thành công');
		}
	};

	const renderTextFields = () => {
		const textFields = [];

		for (let i = 0; i < countRoom; i++) {
			textFields.push(
				<Box key={i} marginY={1}>
					<Typography marginBottom={1}>Phòng thứ {i + 1}</Typography>
					<Grid container spacing={2}>
						<Grid item xs={6} md={4}>
							<Item elevation={0}>
								<TextField
									id={`txt_name${i}`}
									name={`name${i}`}
									label={`Nhập tên phòng (Số phòng)`}
									fullWidth
									variant="outlined"
									type="text"
									value={names[i] ? names[i] : ''}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										const updatedNames = [...names];
										updatedNames[i] = event.target.value;
										setNames(updatedNames);
									}}
								/>
							</Item>
						</Grid>
						<Grid item xs={6} md={4}>
							<Item elevation={0}>
								<TextField
									id={`txt_phone${i}`}
									name={`phone${i}`}
									label={`Nhập sdt phòng`}
									fullWidth
									variant="outlined"
									type="text"
									value={phones[i] ? phones[i] : ''}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										const updatedPhones = [...phones];
										updatedPhones[i] = event.target.value;
										setPhones(updatedPhones);
									}}
								/>
							</Item>
						</Grid>
						<Grid item xs={6} md={4}>
							<Item elevation={0}>
								<TextField
									id={`txt_price${i}`}
									name={`price${i}`}
									label={`Nhập giá phòng`}
									fullWidth
									variant="outlined"
									type="text"
									value={prices[i] ? prices[i] : ''}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										const updatedPrices = [...prices];
										updatedPrices[i] = event.target.value;
										setPrices(updatedPrices);
									}}
								/>
							</Item>
						</Grid>
					</Grid>

					<Box marginTop={1}>
						<Item elevation={0}>
							<TextField
								id={`txt_description${i}`}
								name={`description${i}`}
								label={`Mô tả về phòng`}
								fullWidth
								variant="outlined"
								type="text"
								value={descriptions[i] ? descriptions[i] : ''}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									const updatedDescriptions = [...descriptions];
									updatedDescriptions[i] = event.target.value;
									setDescriptions(updatedDescriptions);
								}}
							/>
						</Item>
					</Box>
				</Box>
			);
		}

		return textFields;
	};

	return (
		<Container>
			<Dialog open={openAlert} onClose={handleCloseAlert}>
				<Alert variant="filled" severity="error">
					{titleAlert}
				</Alert>
			</Dialog>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={title === 'Thêm thành công' ? 'success' : 'error'}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{title}
				</Alert>
			</Snackbar>
			<Typography fontWeight={600} variant="h4" textAlign={'center'} marginY={2}>
				Thông tin chi tiết phòng
			</Typography>
			<Box component={'form'} onSubmit={handleSubmit}>
				<Box component={Paper} padding={4} marginY={2}>
					<Stack direction={'row'} justifyContent={'end'} marginBottom={2}>
						<Typography component={'h6'}>
							Những thông tin có dấu{' '}
							<Typography component={'span'} color={'red'}>
								*
							</Typography>{' '}
							không được để trống
						</Typography>
					</Stack>
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
								<Typography variant="body1" component={'h6'} textAlign={'start'}>
									<Typography component={'span'} color={'red'}>
										*
									</Typography>
									Lựa chọn khách sạn của phòng. VD: Khách sạn Hồ Xuân,...
								</Typography>
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
										{types &&
											types.map((type) => {
												return (
													<MenuItem key={type._id} value={type._id}>
														{type.name}: {type.beds} gường, {type.capacity} người
													</MenuItem>
												);
											})}
									</Select>
								</FormControl>
								<Typography variant="body1" component={'h6'} textAlign={'start'}>
									<Typography component={'span'} color={'red'}>
										*
									</Typography>
									Lựa chọn loại phòng. VD: Standard,...
								</Typography>
							</Item>
						</Grid>
					</Grid>
					<Box>
						<Grid container spacing={2}>
							<Grid item xs={6} md={5}>
								<Item elevation={0}>
									<TextField
										id="txt_number"
										name="number"
										label="Nhập số lượng phòng"
										fullWidth
										variant="outlined"
										type="number"
										value={count ? count : ''}
										onChange={(event: ChangeEvent<HTMLInputElement>) => {
											setCount(parseInt(event.target.value));
										}}
									/>
									<Typography variant="body1" component={'h6'} textAlign={'start'}>
										<Typography component={'span'} color={'red'}>
											*
										</Typography>
										Nhập số lượng phòng cùng loại đã chọn ở trên.{' '}
										<Typography component={'span'} color={'red'}>
											Nhập 1 lần không quá 10
										</Typography>
									</Typography>
								</Item>
							</Grid>
							<Grid item xs={6} md={7} sx={{ display: 'flex', alignItems: 'center' }}>
								<Item elevation={0}>
									<Stack direction={'row'}>
										<Button type="button" variant="contained" onClick={handleClickCount}>
											Lọc số lượng
										</Button>
									</Stack>
								</Item>
							</Grid>
						</Grid>
					</Box>
					<Box marginY={1}>{renderTextFields()}</Box>
					<Typography fontWeight={600} marginLeft={1}>
						Hình ảnh chung cho loại phòng này
					</Typography>
					<Stack direction={'row'} width={'100%'} flexWrap={'wrap'}>
						{imgsState.map((img, index) => {
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
					{countRoom >= 1 && (
						<Stack direction={'row'} justifyContent={'end'} marginTop={1}>
							<Button type="submit" color="warning" variant="contained">
								Thêm thông tin
							</Button>
						</Stack>
					)}
				</Box>
			</Box>
		</Container>
	);
};

export default RegisterRoomPage;
