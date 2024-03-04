import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Stack } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

function HeaderOfForm(): ReactElement {
	const location = useLocation();
	const currentPath = location.pathname;
	const navigate = useNavigate();

	const handleBackDashBoard = () => {
		// Hàm xử lý khi cần quay lại trang trước đó
		const goBack = () => {
			navigate(-1);
		};

		// Sử dụng hàm goBack() khi cần quay lại trang trước đó
		goBack();
	};

	const handleGoToManeger = () => {
		// navigate('/register-hotel');
	};

	return (
		<>
			<Stack direction={'row'} justifyContent={'space-between'} bgcolor={'#fff'}>
				<Box>
					<IconButton sx={{ py: 2, px: 4, borderRadius: 12 }} onClick={handleBackDashBoard}>
						<ArrowBackIcon />
						<Typography>Quay lại trang trước</Typography>
					</IconButton>
				</Box>
				<Stack direction={'row'} alignItems={'center'}>
					<Typography fontWeight={600} color={'#1976D2'} textAlign={'center'} variant="h5">
						{currentPath === '/register-hotel' || currentPath.includes('/detail-hotel')
							? 'Quản lý thông tin khách sạn'
							: 'Quản lý thông tin tài khoản'}
					</Typography>
				</Stack>
				<Box>
					<IconButton sx={{ py: 2, px: 4, borderRadius: 12 }} onClick={handleGoToManeger}>
						{currentPath === '/register-hotel' || currentPath.includes('/detail-hotel') ? (
							<Stack direction={'row'}>
								<AdminPanelSettingsIcon />
								<Typography>Quản lý tài khoản</Typography>
							</Stack>
						) : (
							<Stack direction={'row'}>
								<MapsHomeWorkIcon />
								<Typography>Quản lý khách sạn</Typography>
							</Stack>
						)}
					</IconButton>
				</Box>
			</Stack>
		</>
	);
}

export default HeaderOfForm;
