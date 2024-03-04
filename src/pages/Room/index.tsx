import { useState, useEffect, ChangeEvent } from 'react';
import {
	Box,
	Stack,
	TextField,
	Typography,
	Button,
	FormControl,
	MenuItem,
	Grid,
} from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import { DataTable, GroupedRoom, HotelStateData, RoomStateResult, Title } from '~/models';
import TableComponet from '~/components/Table';
import { Link, useNavigate } from 'react-router-dom';
import { fetchHotels, fetchRooms } from '~/services';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import {
	filterRooms,
	hotelsSelector,
	detailRoom,
	FilterHotelSelector,
	statusRoomSelector,
} from '~/redux/selector';
import { convertToVND, handleDateConvertVN } from '~/utils';
import roomSlice from '~/redux/roomSlice';
import DialogRoom from '~/components/Dialog/DialogRoom';

interface TitleRoom extends Title {
	img_url: string;
	name_hotel: string;
	name: string;
	phone: string;
	beds: string;
	capacity: string;
	type: string;
	price: string;
	description: string;
	create_at: string;
}

interface TitleRoomByType extends Title {
	img_url: string;
	name_hotel: string;
	name: string;
	beds: string;
	capacity: string;
	description: string;
	count: string;
}

const titlesByName: TitleRoom = {
	img_url: 'Hình ảnh',
	name_hotel: 'Tên khách sạn',
	type: 'Loại phòng',
	name: 'Tên phòng',
	beds: 'Số gường',
	capacity: 'Sức chứa',
	phone: 'Số điện thoại',
	price: 'Giá phòng',
	description: 'Mô tả',
	create_at: 'Ngày tạo',
};

const titleByType: TitleRoomByType = {
	img_url: 'Hình ảnh',
	name_hotel: 'Tên khách sạn',
	name: 'Tên loại phòng',
	count: 'Số lượng phòng cùng loại',
	beds: 'Số gường',
	capacity: 'Sức chứa',
	description: 'Mô tả',
};

function RoomPage() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const newRooms: RoomStateResult[] | GroupedRoom[] | undefined = useSelector(filterRooms);
	const newHotels: HotelStateData[] = useSelector(hotelsSelector);
	const valueNameHotel: string = useSelector(FilterHotelSelector);
	const statusRoom: string = useSelector(statusRoomSelector);
	const newRoom: RoomStateResult | undefined = useSelector(detailRoom);

	const [rooms, setRooms] = useState<DataTable[]>([]);
	const [hotels, setHotels] = useState<HotelStateData[]>([]);
	// const [search, setSearch] = useState<string>('');

	const [valueSelected, setValueSelected] = useState<string>('name');
	const [valueSelectedHotel, setValueSelectedHotel] = useState<string>('');

	const [open, setOpen] = useState<boolean>(false);

	if (newHotels.length === 0) {
		navigate('/');
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchRooms());
				await dispatch(fetchHotels());
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [dispatch]);

	useEffect(() => {
		setHotels(newHotels);
		setValueSelectedHotel(valueNameHotel === '' ? newHotels[0]._id : valueNameHotel);

		if (newRooms && newRooms.length > 0) {
			if (statusRoom === 'name') {
				const typeRooms: RoomStateResult[] = newRooms as RoomStateResult[];
				const datas: DataTable[] = typeRooms.map((room) => {
					const data: DataTable = {
						_id: room._id,
						img_url: room.img,
						name_hotel: room.name_hotel,
						type: room.id_roomType.name,
						name: room.name,
						beds: room.id_roomType.beds + ' gường',
						capacity: room.id_roomType.capacity + ' người',
						phone: room.phone,
						price: convertToVND(parseInt(room.price)),
						description: room.description,
						createdAt: handleDateConvertVN(room.createdAt),
					};
					return data;
				});
				setRooms(datas);
			} else {
				const typeRooms: GroupedRoom[] = newRooms as GroupedRoom[];
				const datas: DataTable[] = typeRooms.map((room) => {
					const data: DataTable = {
						_id: room.roomType._id,
						img_url: room.img,
						name_hotel: room.name_hotel,
						name: room.roomType.name,
						count: room.count.toString() + ' phòng',
						beds: room.roomType.beds + ' gường',
						capacity: room.roomType.capacity + ' người',
						description: room.roomType.description,
					};
					return data;
				});
				setRooms(datas);
			}
		} else {
			setRooms([]);
		}
	}, [newRooms, newHotels, valueNameHotel, statusRoom]);

	const handleChangeSelected = (event: SelectChangeEvent) => {
		setValueSelected(event.target.value as string);
	};

	const handleChangeSelectedHotel = (event: SelectChangeEvent) => {
		setValueSelectedHotel(event.target.value as string);
		console.log(event.target.value);
	};

	// const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
	// 	setSearch(event.target.value as string);
	// };

	const handleOpenDialog = (id: string) => {
		setOpen(true);
		dispatch(roomSlice.actions.uploadIdRoom(id));
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleFilter = () => {
		dispatch(roomSlice.actions.statusFilter(valueSelected));
		dispatch(roomSlice.actions.filterChangeHotel(valueSelectedHotel));
	};

	return (
		<Box margin={2} width={'100%'}>
			<Stack direction={'row'} justifyContent={'end'}>
				<Link style={{ textDecoration: 'none', color: '#fff' }} to={'/register-room'}>
					<Button variant="contained" color="warning">
						Thêm phòng
					</Button>
				</Link>
			</Stack>
			{/* <Grid container spacing={2} alignItems={'end'} marginBottom={1}>
				<Grid item xs={12} md={10}>
					<Box>
						<Typography fontWeight={600} color={'primary'} marginY={1}>
							Nhập thông tin
						</Typography>
						<TextField
							color="primary"
							fullWidth
							placeholder="Nhập thông tin cần tìm..."
							onChange={handleChangeSearch}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} md={2} display={'flex'} justifyContent={'end'}>
					<Button variant="contained">Tìm kiếm</Button>
				</Grid>
			</Grid> */}
			<Grid container spacing={2} marginBottom={2}>
				<Grid item xs={12} md={5}>
					<Typography fontWeight={600} color={'primary'}>
						Lựa chọn phần để lọc
					</Typography>
					<FormControl fullWidth>
						<Select
							labelId="select-label"
							id="select"
							value={valueSelected}
							label=""
							onChange={handleChangeSelected}
						>
							<MenuItem value={'name'}>Tên phòng</MenuItem>
							<MenuItem value={'type'}>Loại phòng</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={5}>
					<Typography color={'primary'} fontWeight={600}>
						Lọc theo khách sạn
					</Typography>
					<FormControl fullWidth>
						<Select
							labelId="select-label"
							id="select"
							value={valueSelectedHotel}
							label=""
							onChange={handleChangeSelectedHotel}
						>
							{hotels.length > 0 &&
								hotels.map((hotel: HotelStateData) => {
									return (
										<MenuItem key={hotel._id} value={hotel._id}>
											{hotel.name}
										</MenuItem>
									);
								})}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={2} display={'flex'} alignItems={'end'} justifyContent={'end'}>
					<Button variant="outlined" onClick={handleFilter}>
						Lọc thông tin
					</Button>
				</Grid>
			</Grid>

			<Box sx={{ borderRadius: 4 }}>
				<TableComponet
					titles={statusRoom === 'name' ? titlesByName : titleByType}
					data={rooms}
					handleOpenDialog={handleOpenDialog}
				/>
			</Box>

			{newRoom && statusRoom === 'name' && (
				<DialogRoom open={open} handleClose={handleClose} room={newRoom} />
			)}
		</Box>
	);
}

export default RoomPage;
