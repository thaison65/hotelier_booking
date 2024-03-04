import { useState, ChangeEvent, useEffect } from 'react';

import {
	Box,
	Stack,
	Typography,
	Paper,
	TextField,
	Grid,
	InputLabel,
	Select,
	SelectChangeEvent,
	MenuItem,
	FormControl,
	Card,
	CardActionArea,
	Button,
	CardMedia,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DialogImage from '~/components/Dialog/DialogImage';
import { HotelTypeResult } from '~/models';
import { fetchHotelType } from '~/services';
import { arrNumberStar, regulation } from '~/routes/others';
import { DataDemo } from '~/pages/RegisterHotel';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

interface StepForm1Props {
	handleActive: (data: DataDemo) => void;
}

const StepForm1 = (props: StepForm1Props) => {
	const { handleActive } = props;

	const [name, setName] = useState<string>('');
	const [nameShort, setNameShort] = useState<string>(''); // Tên viết tắt
	const [phone, setPhone] = useState<string>('');

	const [type, setType] = useState<string>('');
	const [types, setTypes] = useState<HotelTypeResult[]>([{ _id: '', name: '' }]);

	const [regulations, setRegulations] = useState<string>('');

	const [numberStar, setNumberStar] = useState<string>('0');
	const [description, setDescription] = useState<string>('');
	const [tin, setTin] = useState<string>('');

	const [certificate, setCertificate] = useState<string>('');
	const [fileCertificate, setFileCertificate] = useState<File>();

	const [nameError, setNameError] = useState<string>('');
	const [nameShortError, setNameShortError] = useState<string>('');
	const [phoneError, setPhoneError] = useState<string>('');
	const [descriptionErr, setDescriptionErr] = useState<string>('');

	const [open, setOpen] = useState<boolean>(false);

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

	const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleChangenameShort = (event: ChangeEvent<HTMLInputElement>) => {
		setNameShort(event.target.value);
		handleActive({ data: event.target.value });
	};

	const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
		setPhone(event.target.value);
	};

	const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};

	const handleChangeNumberStar = (event: SelectChangeEvent) => {
		setNumberStar(event.target.value);
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

	const handleClickZoomImage = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Stack direction={'row'} justifyContent={'center'}>
				<Stack component={Paper} padding={4} spacing={2} borderRadius={4}>
					<Typography variant="h6" fontWeight={600}>
						Điền các thông tin cơ bản của khách sạn
					</Typography>
					<Grid container spacing={2}>
						<Grid item md={8} xs={12} marginTop={-2} marginLeft={-2}>
							<Item elevation={0}>
								<TextField
									fullWidth
									label={'Tên khách sạn'}
									id="txt_name"
									type="text"
									name="name"
									placeholder="Nhập tên khách sạn"
									onChange={handleChangeName}
									error={nameError ? true : false}
									helperText={nameError}
									onFocus={() => setNameError('')}
									required={true}
								/>
								<Typography color={'GrayText'} textAlign={'start'}>
									<span style={{ color: 'red' }}>*</span> Nhập tên khách sạn mà bạn muốn đăng ký,
									VD: Khách sạn Luxury Đà Lạt
								</Typography>
							</Item>
						</Grid>
						<Grid item md={4} xs={12} marginTop={-2}>
							<Item elevation={0}>
								<TextField
									fullWidth
									label={'Tên viết tắt của khách sạn'}
									id="txt_nameShort"
									type="text"
									name="nameShort"
									placeholder="Nhập tên viết tắt"
									onChange={handleChangenameShort}
									error={nameShortError ? true : false}
									helperText={nameShortError}
									onFocus={() => setNameShortError('')}
									required={true}
								/>
								<Typography color={'GrayText'} textAlign={'start'}>
									<span style={{ color: 'red' }}>*</span> Nhập tên viết tắt, VD: Luxury DL
								</Typography>
							</Item>
						</Grid>
					</Grid>

					<Grid container spacing={2}>
						<Grid item md={2} xs={12} marginTop={-2} marginLeft={-2}>
							<Item elevation={0}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Số sao của khách sạn</InputLabel>
									<Select
										sx={{ textAlign: 'start' }}
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={numberStar}
										label="Số sao của khách sạn"
										onChange={handleChangeNumberStar}
									>
										{arrNumberStar.map((value) => {
											return (
												<MenuItem key={value.id} value={value.id}>
													{value.title}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
								<Typography color={'GrayText'} textAlign={'start'}>
									<span style={{ color: 'red' }}>*</span> Số sao khách sạn
								</Typography>
							</Item>
						</Grid>
						<Grid item md={5} xs={12} marginTop={-2}>
							<Item elevation={0}>
								<TextField
									fullWidth
									label={'Số điện thoại'}
									id="txt_phone"
									type="text"
									name="phone"
									placeholder="Nhập số điện thoại của khách sạn"
									onChange={handleChangePhone}
									error={phoneError ? true : false}
									helperText={phoneError}
									onFocus={() => setPhoneError('')}
									required={true}
								/>
								<Typography color={'GrayText'} textAlign={'start'}>
									<span style={{ color: 'red' }}>*</span> Số điện thoại của khách sạn, VD:
									0912345678
								</Typography>
							</Item>
						</Grid>
						<Grid item md={5} xs={12} marginTop={-2}>
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
									required={true}
								/>
								<Typography color={'GrayText'} textAlign={'start'}>
									<span style={{ color: 'red' }}>*</span> Nhập mã số thuế của khách sạn, VD:
									02131412...
								</Typography>
							</Item>
						</Grid>
					</Grid>

					<Grid container spacing={2}>
						<Grid item xs={12} md={6} marginTop={-2} marginLeft={-2}>
							<Item elevation={0}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Quy định đặt phòng</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={regulations ? regulations : ''}
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
								</FormControl>
								<Typography color={'GrayText'} textAlign={'start'}>
									<span style={{ color: 'red' }}>*</span> Chọn phương thức đặt phòng
								</Typography>
							</Item>
						</Grid>
						<Grid item xs={12} md={6} marginTop={-2}>
							<Item elevation={0}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Mô hình khách sạn</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={type ? type : ''}
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
								</FormControl>
								<Typography color={'GrayText'} textAlign={'start'}>
									<span style={{ color: 'red' }}>*</span> Chọn mô hình đang hoạt động của khách sạn,
									VD: HomeStay, Resort, Khách sạn,...
								</Typography>
							</Item>
						</Grid>
					</Grid>

					<Box>
						<TextField
							fullWidth
							label={'Mô tả'}
							id="txt_address"
							type="text"
							name="address"
							placeholder="Nhập thông tin mô tả về khách sạn"
							onChange={handleChangeDescription}
							error={description ? true : false}
							helperText={descriptionErr}
							onFocus={() => setDescriptionErr('')}
							required={true}
						/>
						<Typography color={'GrayText'}>
							<span style={{ color: 'red' }}>*</span> Viết mô tả một chút về khách sạn đang vận
							hành, điều này giúp dễ thu hút khách hơn, VD: Cảnh vật, môi trường, giao thông, tọa
							đọa,...
						</Typography>
					</Box>

					<Grid container spacing={1} marginTop={1}>
						<Grid item xs={12} md={4}>
							<Item elevation={0} sx={{ textAlign: 'start' }}>
								<Typography marginY={1} fontWeight={600} variant="h6" color={'ButtonText'}>
									Giấy phép kinh doanh
								</Typography>
								<Card onClick={handleClickZoomImage}>
									<CardActionArea>
										{certificate && (
											<CardMedia component="img" height="400" image={certificate} alt="" />
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
										{certificate ? 'Thay đổi' : 'Thêm hình ảnh'} giấy phép kinh doanh
										<input type="file" hidden onChange={handleClickChangeImageCertificate} />
									</Button>
								</Box>
							</Item>
						</Grid>
					</Grid>
				</Stack>
			</Stack>
			{certificate && (
				<DialogImage
					handleClose={handleClose}
					open={open}
					img={certificate}
					title="Giấy phép kinh doanh"
				/>
			)}
		</>
	);
};

export default StepForm1;
