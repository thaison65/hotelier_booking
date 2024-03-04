import { useState, ChangeEvent } from 'react';

import { Box, Stack, Typography, Paper, TextField, Grid, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChangeDataInput from '../ChangeDataInput';
import { PLaceState, SearchResult, SearchTouristResult } from '~/models';
import InputTab from '../InputTab';
import { DataDemo } from '~/pages/RegisterHotel';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

interface StepForm2Props {
	handleActive: (data: DataDemo) => void;
}

const StepForm2 = (props: StepForm2Props) => {
	const { handleActive } = props;

	const [address, setAddress] = useState<string>('');
	const [place, setPlace] = useState<PLaceState>({ _id: '', name: '' });
	const [city, setCity] = useState<string>('');
	const [tourists, setTourists] = useState<SearchTouristResult[]>([]);

	const [addressError, setAddressError] = useState<string>('');

	const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
		setAddress(event.target.value);
	};

	const handleDataPlace = (data: SearchResult) => {
		setPlace({ _id: data._id, name: data.name });
		setCity(data.nameCity ? data.nameCity : '');
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
	return (
		<>
			<Stack direction={'row'} marginX={2} justifyContent={'center'}>
				<Stack component={Paper} padding={4} spacing={2} borderRadius={4}>
					<Typography variant="h6" fontWeight={600}>
						Điền các thông tin về địa chỉ nơi hoạt động của khách sạn
					</Typography>
					<Box>
						<TextField
							fullWidth
							label={'Địa chỉ khách sạn'}
							id="txt_address"
							type="text"
							name="address"
							placeholder="Nhập địa chỉ khách sạn"
							onChange={handleChangeAddress}
							error={addressError ? true : false}
							helperText={addressError}
							onFocus={() => setAddressError('')}
						/>
						<Typography color={'GrayText'}>
							<span style={{ color: 'red' }}>*</span> Địa chỉ cụ thể của khách sạn, VD: 1/2 Đường
							Trần Hưng Đạo, Phường 1, Quận 1, Tp Hồ Chí Minh
						</Typography>
					</Box>

					<Grid container spacing={2} marginTop={1}>
						<Grid item xs={12} md={6} marginLeft={-2}>
							<Item elevation={0}>
								<ChangeDataInput
									id=""
									label="Địa điểm du lịch"
									name="place"
									key={'place'}
									onData={handleDataPlace}
								/>
								<Typography color={'GrayText'} textAlign={'start'}>
									<span style={{ color: 'red' }}>*</span> Tên khu vực khách sạn đang hoạt động để dễ
									dàng cho việc tìm kiếm, VD: Đà Lạt, Phú Quốc,...
								</Typography>
							</Item>
						</Grid>
						<Grid item xs={12} md={6}>
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
							<Typography color={'GrayText'}>
								<span style={{ color: 'red' }}>*</span> Nhập tên khách sạn mà bạn muốn đăng ký, VD:
								Khách sạn Luxury Đà Lạt
							</Typography>
						</Grid>
					</Grid>

					<Grid container spacing={2} marginTop={1}>
						<Grid item xs={12} md={4} marginLeft={-2}>
							<Item elevation={0}>
								<InputTab
									label="Địa danh gần kề"
									id="txt_tourist"
									name="tourist"
									onData={handleDataTourist}
								/>
							</Item>
						</Grid>
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
						<Typography color={'GrayText'}>
							<span style={{ color: 'red' }}>*</span> Hãy lựa chọn các cho vui chơi, khu hoạt động
							về du lịch gần bạn để dễ tìm kiếm, VD: Hồ Xuân Hương, Phố đi bộ,...
						</Typography>
					</Grid>
				</Stack>
			</Stack>
		</>
	);
};

export default StepForm2;
