import { MouseEvent, useEffect, useState } from 'react';
import {
	AppBar,
	Box,
	Container,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Avatar,
	styled,
	alpha,
	InputBase,
	Button,
	Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import './HeaderMain.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import authSlice from '~/redux/authSlice';

const Search = styled('div')(({ theme }) => ({
	borderRadius: 8,
	backgroundColor: alpha('#aaaaaa', 0.15),
	'&:hover': {
		backgroundColor: alpha('#aaaaaa', 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
	[theme.breakpoints.down('sm')]: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled(Button)(({ theme }) => ({
	padding: theme.spacing(1, 2),
	borderRadius: 8,
	border: 0,
	position: 'absolute',
	right: 16,
	top: 0,
	bottom: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	[theme.breakpoints.down('sm')]: {
		right: 16,
	},
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 0, 1, 1.5),
		// vertical padding + font size from searchIcon
		paddingRight: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

function HeaderMain() {
	const dispatch = useDispatch<AppDispatch>();

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		dispatch(authSlice.actions.logout());
	};

	useEffect(() => {
		console.log('');
	}, [dispatch]);

	return (
		<>
			<AppBar
				position="static"
				className="header-main"
				sx={{ bgcolor: '#ffffff', color: '#000000' }}
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							></Menu>
						</Box>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
						<Box sx={{ position: 'relative' }}>
							<Search>
								<StyledInputBase
									placeholder="Search here…"
									inputProps={{ 'aria-label': 'search' }}
								/>
							</Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
						</Box>
						<Box sx={{ flexGrow: 0, display: 'flex' }}>
							<Tooltip title="Open settings">
								<Button onClick={handleOpenUserMenu} sx={{ padding: 0 }} color="inherit">
									<Avatar alt="Remy Sharp" src="" />
									<Box sx={{ display: { xs: 'none', md: 'block' }, marginLeft: 1 }}>
										<Typography variant="body2">Welcome</Typography>
										<Typography variant="body1" className="title-user">
											Đặng Thái Sơn
										</Typography>
									</Box>
								</Button>
							</Tooltip>

							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<Box sx={{ display: { xs: 'block', md: 'none' } }}>
									<Typography variant="body1" sx={{ textAlign: 'center' }} className="title-user">
										Đặng Thái Sơn
									</Typography>
								</Box>
								<Divider />
								<MenuItem>
									<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="primary-search-account-menu"
										aria-haspopup="true"
										color="inherit"
									>
										<AccountCircle />
									</IconButton>
									<p>Thông tin cá nhân</p>
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="primary-search-account-menu"
										aria-haspopup="true"
										color="inherit"
									>
										<LogoutIcon />
									</IconButton>
									<p>Đăng xuất</p>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}

export default HeaderMain;
