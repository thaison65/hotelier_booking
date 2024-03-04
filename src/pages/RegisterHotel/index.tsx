import { ChangeEvent, useEffect, useState } from 'react';
import {
	Box,
	Container,
	Typography,
	Paper,
	TextField,
	Grid,
	styled,
	Button,
	FormControl,
	InputLabel,
	Select,
	SelectChangeEvent,
	MenuItem,
	Stack,
	Chip,
	Card,
	CardActionArea,
	CardMedia,
} from '@mui/material';
import { fetchHotelType } from '~/services';
import {
	BtnImageResult,
	DataHotelRequest,
	HotelTypeResult,
	PLaceState,
	SearchResult,
	SearchTouristResult,
} from '~/models';

import ChangeDataInput from '~/components/InputForm/ChangeDataInput';
import BtnImage from '~/components/Button/BtnImage/BtnImage';
import InputTab from '~/components/InputForm/InputTab';
import DialogImage from '~/components/Dialog/DialogImage';
import DialogAlert from '~/components/Dialog/DialogAlert';
import { arrNumberStar, imgsState, regulation } from '~/routes/others';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const RegisterHotelPage = () => {
	const [name, setName] = useState<string>('');
	const [nameShort, setNameShort] = useState<string>('');
	const [tin, setTin] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [numberStar, setNumberStar] = useState<string>('0');
	const [regulations, setRegulations] = useState<string>('');

	const [type, setType] = useState<string>('');
	const [types, setTypes] = useState<HotelTypeResult[]>([{ _id: '', name: '' }]);

	const [tourists, setTourists] = useState<SearchTouristResult[]>([]);
	const [place, setPlace] = useState<PLaceState>({ _id: '', name: '' });
	const [city, setCity] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const [certificate, setCertificate] = useState<string>('');
	const [fileCertificate, setFileCertificate] = useState<File>();

	const [fileImages, setFileImageData] = useState<File[]>([]);
	const [idImg, setIdImg] = useState<number[]>([]);

	const [open, setOpen] = useState<boolean>(false);
	const [openAlert, setOpenAlert] = useState<boolean>(false);

	const [titleAlert, setTitleAlert] = useState<string>('');
	const [descriptionAlert, setDescriptionAlert] = useState<string>('');
	const [lableBtn, setLableBtn] = useState<string>('');

	const [data, setData] = useState<DataHotelRequest>({});

	useEffect(() => {
		const fetchDataHotelType = async () => {
			try {
				const data = await fetchHotelType();
				setTypes(data);
			} catch (error) {
				//
			}
		};
		fetchDataHotelType();
	}, []);

	const handleDataPlace = (data: SearchResult) => {
		setPlace({ _id: data._id, name: data.name });
		setCity(data.nameCity ? data.nameCity : '');
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

	const handleDataTourist = (data: SearchTouristResult) => {
		// Kiểm tra xem data._id đã tồn tại trong mảng tourists chưa
		const isExist = tourists.some((element) => element._id === data._id);

		// Nếu data._id không tồn tại trong mảng, thêm vào
		if (!isExist) {
			setTourists((prevTourist) => [...prevTourist, data]);
		}
	};

	const handleDeleteTourist = (name: string) => {
		const newTourists = tourists.filter((value) => value.name !== name);
		setTourists(newTourists);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickZoomImage = () => {
		setOpen(true);
	};

	const handleClickChangeImageCertificate = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileCertificate(file);
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const data = reader.result as string;
				setCertificate(data);
			};
		}
	};

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};

	const handleOpenAlertAdd = () => {
		setOpenAlert(true);
		setTitleAlert(`Thông báo thêm thông tin khách sạn ${name}`);
		setDescriptionAlert('Thêm');
		setLableBtn('Thêm khách sạn');

		const dataTourists = tourists.map((tourist) => {
			return tourist._id;
		});

		const id_type = () => {
			let id = '';
			types.map((value) => {
				value.name === type ? (id = value._id) : null;
			});
			return id;
		};

		const data: DataHotelRequest = {
			name: name,
			name_short: nameShort,
			certificate: fileCertificate,
			tin: tin,
			address: address,
			phone: phone,
			number_star: numberStar,
			description: description,
			regulations: regulations,
			id_hotelType: id_type(),
			id_famousPlace: place._id,
			id_tourists: dataTourists,
			img_url: fileImages,
		};

		setData(data);
	};

	return (
		<Container>
			<Typography fontWeight={600} variant="h4" textAlign={'center'} marginY={2}>
				Thông tin chi tiết của khách sạn
			</Typography>
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
				<Grid container spacing={1}>
					<Grid item xs={12} md={6}>
						<Item elevation={0}>
							<TextField
								fullWidth
								label={'Tên khách sạn'}
								id="txt_name"
								type="txt"
								name="name"
								value={name}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									setName(event.target.value as string);
								}}
								required={true}
							/>
							<Typography variant="body1" component={'h6'} textAlign={'start'}>
								<Typography component={'span'} color={'red'}>
									*
								</Typography>
								Viết tên đầy đủ của khách sạn. VD: Khách sạn Hồ Xuân,...
							</Typography>
						</Item>
					</Grid>
					<Grid item xs={12} md={3}>
						<Item elevation={0}>
							<TextField
								fullWidth
								label={'Tên viết tắt'}
								id="txt_name_short"
								type="txt"
								name="name_short"
								value={nameShort}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									setNameShort(event.target.value as string);
								}}
							/>
							<Typography variant="body1" component={'h6'} textAlign={'start'}>
								Tên vắn tắt khách sạn. VD: HX,...
							</Typography>
						</Item>
					</Grid>
					<Grid item xs={12} md={3}>
						<Item elevation={0}>
							<TextField
								fullWidth
								label={'Mã số thuế'}
								id="txt_tin"
								type="txt"
								name="tin"
								value={tin}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									setTin(event.target.value as string);
								}}
							/>
							<Typography variant="body1" component={'h6'} textAlign={'start'}>
								<Typography component={'span'} color={'red'}>
									*
								</Typography>
								Mã số thuế khách sạn.
							</Typography>
						</Item>
					</Grid>
				</Grid>

				<Grid container spacing={1} marginTop={1}>
					<Grid item xs={12} md={3}>
						<Item elevation={0}>
							<TextField
								fullWidth
								label={'Số điện thoại'}
								id="txt_phone"
								type="txt"
								name="phone"
								value={phone}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									setPhone(event.target.value as string);
								}}
								required={true}
							/>
							<Typography variant="body1" component={'h6'} textAlign={'start'}>
								<Typography component={'span'} color={'red'}>
									*
								</Typography>
								Nhập số điện thoại khách sạn. VD: 0912345678,...
							</Typography>
						</Item>
					</Grid>
					<Grid item xs={12} md={9}>
						<Item elevation={0}>
							<TextField
								fullWidth
								label={'Địa chỉ cụ thể'}
								id="txt_address"
								type="txt"
								name="address"
								value={address}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									setAddress(event.target.value as string);
								}}
								required={true}
							/>
							<Typography variant="body1" component={'h6'} textAlign={'start'}>
								<Typography component={'span'} color={'red'}>
									*
								</Typography>
								Nhập địa chỉ cụ thể khách sạn. VD: Đường 1, Phường A, Quận B,...
							</Typography>
						</Item>
					</Grid>
				</Grid>

				<Grid container spacing={1} marginTop={1}>
					<Grid item xs={12} md={2}>
						<Item elevation={0}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Số sao của khách sạn</InputLabel>
								<Select
									sx={{ textAlign: 'start' }}
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={numberStar}
									label="Số sao của khách sạn"
									onChange={(event: SelectChangeEvent) => {
										setNumberStar(event.target.value as string);
									}}
								>
									{arrNumberStar.map((value) => {
										return (
											<MenuItem key={value.id} value={value.id}>
												{value.title}
											</MenuItem>
										);
									})}
								</Select>
								<Typography variant="body1" component={'h6'} textAlign={'start'}>
									<Typography component={'span'} color={'red'}>
										*
									</Typography>
									Chọn số sao.
								</Typography>
							</FormControl>
						</Item>
					</Grid>
					<Grid item xs={12} md={5}>
						<Item elevation={0}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Quy định đặt phòng</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={regulations}
									label="Quy định đặt phòng"
									onChange={(event: SelectChangeEvent) => {
										setRegulations(event.target.value as string);
									}}
									sx={{ textAlign: 'start' }}
								>
									{regulation.map((value) => (
										<MenuItem key={value.title} value={value.title}>
											{value.title}
										</MenuItem>
									))}
								</Select>
								<Typography variant="body1" component={'h6'} textAlign={'start'}>
									<Typography component={'span'} color={'red'}>
										*
									</Typography>
									Chọn quy định của khách sạn.
								</Typography>
							</FormControl>
						</Item>
					</Grid>
					<Grid item xs={12} md={5}>
						<Item elevation={0}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Mô hình khách sạn</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={type}
									label="Mô hình khách sạn"
									onChange={(event: SelectChangeEvent) => {
										setType(event.target.value as string);
									}}
									sx={{ textAlign: 'start' }}
								>
									{types.map((value) => (
										<MenuItem key={value._id} value={value.name}>
											{value.name}
										</MenuItem>
									))}
								</Select>
								<Typography variant="body1" component={'h6'} textAlign={'start'}>
									<Typography component={'span'} color={'red'}>
										*
									</Typography>
									Chọn mô hình hoạt động của khách sạn.
								</Typography>
							</FormControl>
						</Item>
					</Grid>
				</Grid>

				<Grid container spacing={1} marginTop={1}>
					<Grid item xs={12} md={8}>
						<Item elevation={0}>
							<ChangeDataInput
								label="Địa danh du lịch"
								name="place"
								id="txt_place"
								onData={handleDataPlace}
								textData={place.name ? place.name : ''}
							/>
							<Typography variant="body1" component={'h6'} textAlign={'start'}>
								<Typography component={'span'} color={'red'}>
									*
								</Typography>
								Chọn địa danh du lịch để dễ tìm kiếm. VD: Đà Lạt, Sapa,...
							</Typography>
						</Item>
					</Grid>
					<Grid item xs={12} md={4}>
						<Item elevation={0}>
							<TextField
								fullWidth
								label={'Thành phố'}
								InputProps={{
									readOnly: true,
								}}
								id="txt_city"
								type="text"
								name="city"
								value={city ? city : ''}
								required={true}
							/>
						</Item>
					</Grid>
				</Grid>

				<Grid container spacing={1} marginTop={1}>
					<Grid item xs={12} md={4}>
						<Item elevation={0}>
							<InputTab
								label="Địa danh gần kề"
								id="txt_tourist"
								name="tourist"
								onData={handleDataTourist}
							/>
						</Item>
					</Grid>
					<Typography
						variant="body1"
						component={'h6'}
						textAlign={'start'}
						marginLeft={1}
						color={'GrayText'}
					>
						<Typography component={'span'} color={'red'}>
							*
						</Typography>
						Chọn các địa danh ở gần với khách sạn cho khách hàng dễ lựa chọn. VD: Hồ Xuân Hương, Chợ
						đêm Đà Lạt,...
					</Typography>
					<Grid item xs={12} md={8}>
						<Item elevation={0} sx={{ textAlign: 'start' }}>
							{tourists &&
								tourists.map((tourist) => {
									return (
										<Chip
											key={tourist._id}
											color="primary"
											label={tourist.name}
											onDelete={() => handleDeleteTourist(tourist.name)}
										/>
									);
								})}
						</Item>
					</Grid>
				</Grid>

				<Box marginTop={2}>
					<TextField
						fullWidth
						label={'Mô tả'}
						id="txt_description"
						type="txt"
						name="description"
						value={description ? description : ''}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setDescription(event.target.value as string);
						}}
						required={true}
					/>
					<Typography variant="body1" component={'h6'} textAlign={'start'} color={'GrayText'}>
						Viết mô tả về khách sạn.
					</Typography>
				</Box>

				<Grid container spacing={1} marginTop={1}>
					<Grid item xs={12} md={4}>
						<Item elevation={0} sx={{ textAlign: 'start' }}>
							<Typography marginY={1} fontWeight={600} variant="h6" color={'ButtonText'}>
								Giấy phép kinh doanh{' '}
								<Typography component={'span'} color={'red'}>
									*
								</Typography>
							</Typography>
							<Card onClick={handleClickZoomImage}>
								<CardActionArea>
									{certificate && (
										<CardMedia
											component="img"
											height="400"
											image={certificate}
											alt="green iguana"
										/>
									)}
								</CardActionArea>
							</Card>
							<Box
								sx={{ width: 350, height: 45 }}
								marginY={1}
								position={'relative'}
								component={Paper}
							>
								<Button
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										margin: 'auto',
									}}
									variant="contained"
									component="label"
								>
									{certificate ? 'Đổi' : 'Thêm'} giấy phép kinh doanh
									<input type="file" hidden onChange={handleClickChangeImageCertificate} />
								</Button>
							</Box>
						</Item>
					</Grid>
					<Grid item xs={12} md={8}>
						<Box margin={1}>
							<Stack direction={'row'} alignItems={'end'} justifyContent={'space-between'}>
								<Typography marginLeft={1} fontWeight={600} variant="h6">
									Danh mục hình ảnh{' '}
									<Typography component={'span'} color={'red'}>
										*
									</Typography>
								</Typography>
								<Typography color={'GrayText'}>
									<span style={{ color: 'red' }}>*</span>Tấm hình đầu tiên được làm ảnh nền
								</Typography>
							</Stack>
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
						</Box>
					</Grid>
				</Grid>

				<Stack marginY={2} direction={'row'} component={'form'} spacing={1} justifyContent={'end'}>
					<Button variant="contained" color="warning" onClick={handleOpenAlertAdd}>
						Thêm khách sạn
					</Button>
					<DialogAlert
						title={titleAlert}
						description={descriptionAlert}
						key={titleAlert}
						lable_btn={lableBtn}
						open={openAlert}
						handleClose={handleCloseAlert}
						data={data}
					/>
				</Stack>
			</Box>
			<DialogImage
				handleClose={handleClose}
				open={open}
				img={certificate}
				title="Giấy phép kinh doanh"
			/>
		</Container>
	);
};

export default RegisterHotelPage;
