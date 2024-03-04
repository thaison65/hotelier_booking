import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '~/redux/store';

import { Box, Stack, TextField, Typography, Button } from '@mui/material';

import { DataTable, HotelStateData, Title } from '~/models';
import TableComponet from '~/components/Table';
import { fetchHotels } from '~/services';
import { hotelsSelector } from '~/redux/selector';

interface TitleHotel extends Title {
	img_url: string;
	name: string;
	address: string;
	phone: string;
	type: string;
}

const titles: TitleHotel = {
	img_url: 'Hình ảnh',
	name: 'Tên khách sạn',
	name_short: 'Tên viết tắt',
	number_star: 'Số sao',
	address: 'Địa chỉ khách sạn',
	phone: 'Số điện thoại',
	type: 'Mô hình khách sạn',
	regulations: 'Chính sách',
};

function ProductHotelPage() {
	const dispatch = useDispatch<AppDispatch>();

	const hotelSelector: HotelStateData[] = useSelector(hotelsSelector);

	const [hotel, setHotel] = useState<DataTable[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchHotels());
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [dispatch]);

	useEffect(() => {
		if (hotelSelector) {
			const hotels = hotelSelector.map((value) => {
				const hotel: DataTable = {
					img_url: value.img_url,
					name: value.name,
					name_short: value.name_short,
					number_star: value.number_star.toString(),
					address: value.address,
					phone: value.phone,
					type: value.id_hotelType.name,
					regulations: value.regulations,
					_id: value._id,
				};
				return hotel;
			});
			setHotel(hotels);
		}
	}, [hotelSelector]);

	if (!hotel) {
		return <>Loading...</>;
	}

	return (
		<>
			<Box margin={2}>
				<Stack direction={'row'} spacing={1} justifyContent={'end'} alignItems={'center'}>
					{/* <Stack direction={'row'} spacing={1} alignItems={'center'} flexGrow={1}>
						<Typography fontWeight={600}>Tìm kiếm</Typography>
						<Box width={'90%'}>
							<TextField color="primary" fullWidth placeholder="Tìm kiếm thông tin khách sạn..." />
						</Box>
					</Stack> */}
					<Box>
						<Link style={{ textDecoration: 'none', color: '#fff' }} to={'/register-hotel'}>
							<Button variant="contained" color="warning">
								Thêm khách sạn
							</Button>
						</Link>
					</Box>
				</Stack>
			</Box>
			<Box sx={{ borderRadius: 4 }}>
				<TableComponet titles={titles} data={hotel} linkDetail="/detail-hotel/" />
			</Box>
		</>
	);
}

export default ProductHotelPage;
