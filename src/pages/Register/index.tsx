import { useState, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Stack,
	Box,
	Paper,
	Button,
	Typography,
	Grid,
	TextField,
	FormControl,
	InputLabel,
	OutlinedInput,
	IconButton,
	InputAdornment,
	Select,
	MenuItem,
	FormHelperText,
	Alert,
	AlertTitle,
	Dialog,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { SelectChangeEvent } from '@mui/material/Select';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';

import {
	InvalidPhoneException,
	InvalidPasswordException,
	InvalidBirthdayException,
	InvalidEmailException,
	InvalidFirstNameException,
	InvalidLastNameException,
	InvalidAddressException,
	InvalidCardIDException,
} from '~/utils';

import { AppDispatch } from '~/redux/store';
import { RegisterUser } from '~/services';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

enum GenderEnum {
	Female = 'Female',
	Male = 'Male',
	Other = 'Other',
}

export interface FormValues {
	phone: string;
	password: string;
	email: string;
	first_name: string;
	last_name: string;
	gender: GenderEnum;
}

// export interface RegisterPageProps {}

function RegisterPage() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [phone, setPhone] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [pwd, setPwd] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [first_name, setFirstName] = useState<string>('');
	const [last_name, setLastName] = useState<string>('');
	const [gender, setGender] = useState<string>('Male');
	const [cardId, setCardId] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [birthday, setBirthday] = useState<Date>(new Date());

	const [phoneError, setPhoneError] = useState<string>('');
	const [pwdError, setPwdError] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [cardIdError, setCardIdError] = useState<string>('');
	const [addressError, setAddressError] = useState<string>('');
	const [firstNameError, setFirstNameError] = useState<string>('');
	const [lastNameError, setLastNameError] = useState<string>('');
	const [birthdayError, setBirthdayError] = useState<string>('');

	const [alertFail, setAlertFail] = useState<boolean>(false);
	const [openAlert, setOpenAlert] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleChangePhone = (event: ChangeEvent<{ value: unknown }>) => {
		setPhone(event.target.value as string);
	};
	const handleChangePassword = (event: ChangeEvent<{ value: unknown }>) => {
		setPassword(event.target.value as string);
	};
	const handleChangwPwd = (event: ChangeEvent<{ value: unknown }>) => {
		setPwd(event.target.value as string);
	};
	const handleChangeEmail = (event: ChangeEvent<{ value: unknown }>) => {
		setEmail(event.target.value as string);
	};
	const handleChangeCardId = (event: ChangeEvent<{ value: unknown }>) => {
		setCardId(event.target.value as string);
	};
	const handleChangeAddress = (event: ChangeEvent<{ value: unknown }>) => {
		setAddress(event.target.value as string);
	};
	const handleChangeFirstName = (event: ChangeEvent<{ value: unknown }>) => {
		setFirstName(event.target.value as string);
	};
	const handleChangeLastName = (event: ChangeEvent<{ value: unknown }>) => {
		setLastName(event.target.value as string);
	};
	const handleChangeGender = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};
	const handleChangeBirthday = (newDate: Date | null) => {
		if (newDate) {
			setBirthday(newDate);
		}
	};

	const handleOpenAlert = () => {
		setOpenAlert(true);
	};
	const handleCloseAlert = () => {
		setOpenAlert(false);
		if (!alertFail) {
			navigate('/login');
		}
	};

	const handleSubmitRegister = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			if (password !== pwd) {
				setPwdError('Mật khẩu xác nhận không trùng khớp!');
				throw new Error('Mật khẩu và xác nhận không trùng khớp!');
			}

			const card_id = cardId;
			await dispatch(
				RegisterUser({
					first_name,
					last_name,
					card_id,
					phone,
					email,
					password,
					address,
					gender,
					birthday,
				})
			);

			handleOpenAlert();
		} catch (error: unknown) {
			if (error instanceof InvalidPhoneException) {
				setPhoneError(error.message);
				setAlertFail(true);
				handleOpenAlert();
				console.log(error.message);
				return;
			}
			if (error instanceof InvalidPasswordException) {
				setPwdError(error.message);
				setAlertFail(true);
				handleOpenAlert();
				console.log(error.message);
				return;
			}
			if (error instanceof InvalidEmailException) {
				setEmailError(error.message);
				console.log(error.message);
				return;
			}
			if (error instanceof InvalidFirstNameException) {
				setFirstNameError(error.message);
				setAlertFail(true);
				handleOpenAlert();
				console.log(error.message);
				return;
			}
			if (error instanceof InvalidLastNameException) {
				setLastNameError(error.message);
				setAlertFail(true);
				handleOpenAlert();

				console.log(error.message);
				return;
			}
			if (error instanceof InvalidBirthdayException) {
				setBirthdayError(error.message);
				setAlertFail(true);
				handleOpenAlert();

				console.log(error.message);
				return;
			}
			if (error instanceof InvalidAddressException) {
				setAddressError(error.message);
				setAlertFail(true);
				handleOpenAlert();

				console.log(error.message);
				return;
			}
			if (error instanceof InvalidCardIDException) {
				setCardIdError(error.message);
				setAlertFail(true);
				handleOpenAlert();

				console.log(error.message);
				return;
			}

			console.log(error + ' register');
		}
	};

	return (
		<Box bgcolor={'#F8F7F9'}>
			<Dialog open={openAlert} onClose={handleCloseAlert}>
				<Alert
					severity={alertFail ? 'error' : 'success'}
					action={
						<IconButton aria-label="close" color="inherit" size="small" onClick={handleCloseAlert}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					<AlertTitle>Đăng ký tài khoản {alertFail ? 'thất bại' : 'thành công'}</AlertTitle>
					Bạn đã <strong>{alertFail ? 'Nhập sai thông tin' : 'Đăng ký thành công'}!</strong>
				</Alert>
			</Dialog>
			<Stack
				component={'form'}
				minHeight={'100vh'}
				direction={'row'}
				alignItems={'center'}
				justifyContent={'center'}
				method="POST"
				onSubmit={handleSubmitRegister}
			>
				<Stack
					component={Paper}
					elevation={4}
					direction={'column'}
					alignItems={'center'}
					justifyContent={'center'}
					minWidth={'30vw'}
					spacing={2}
					padding={4}
					borderRadius={4}
				>
					<Typography variant="h4" component={'h1'} fontWeight={500} color={'#7f7f7f'}>
						Đăng ký tài khoản quản lý khách sạn
					</Typography>
					<Stack spacing={2} width={'100%'}>
						<TextField
							fullWidth
							label={'Địa chỉ Email'}
							id="txt_email"
							type="email"
							name="email"
							onChange={handleChangeEmail}
							error={emailError ? true : false}
							helperText={emailError}
							onFocus={() => setEmailError('')}
						/>
						<FormControl sx={{ m: 1 }} variant="outlined" error={pwdError ? true : false}>
							<InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
							<OutlinedInput
								fullWidth
								id="outlined-adornment-password"
								type={showPassword ? 'text' : 'password'}
								name="password"
								onChange={handleChangePassword}
								onFocus={() => setPwdError('')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Mật khẩu"
							/>
							<FormHelperText>{pwdError}</FormHelperText>
						</FormControl>
						<FormControl sx={{ m: 1 }} variant="outlined" error={pwdError ? true : false}>
							<InputLabel htmlFor="outlined-adornment-pwd">Xác nhận mật khẩu</InputLabel>

							<OutlinedInput
								fullWidth
								id="outlined-adornment-pwd"
								type={showPassword ? 'text' : 'password'}
								name="pwd"
								onChange={handleChangwPwd}
								onFocus={() => setPwdError('')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Xác nhận mật khẩu"
							/>
							<FormHelperText>{pwdError}</FormHelperText>
						</FormControl>
						<Grid container spacing={1}>
							<Grid item md={6} xs={12} marginLeft={-1}>
								<Item elevation={0}>
									<TextField
										fullWidth
										label={'Số điện thoại'}
										id="txt_phone"
										type="text"
										name="phone"
										onChange={handleChangePhone}
										error={phoneError ? true : false}
										helperText={phoneError}
										onFocus={() => setPhoneError('')}
									/>
								</Item>
							</Grid>
							<Grid item md={6} xs={12}>
								<Item elevation={0}>
									<TextField
										fullWidth
										label={'Mã số định danh cá nhân'}
										id="txt_card_id"
										type="text"
										name="card_id"
										onChange={handleChangeCardId}
										placeholder="Số chứng minh nhân dân hoặc căn cước công dân"
										error={cardIdError ? true : false}
										helperText={cardIdError}
										onFocus={() => setCardIdError('')}
									/>
								</Item>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item md={8} xs={12} sx={{ ml: '-8px' }}>
								<Item elevation={0}>
									<TextField
										fullWidth
										label={'Họ và tên lót'}
										id="txt_first_name"
										type="text"
										name="first_name"
										placeholder="Họ và tên lót"
										onChange={handleChangeFirstName}
										error={firstNameError ? true : false}
										helperText={firstNameError}
										onFocus={() => setFirstNameError('')}
									/>
								</Item>
							</Grid>
							<Grid item md={4} xs={12}>
								<Item elevation={0}>
									<TextField
										fullWidth
										label={'Tên'}
										id="txt_last_name"
										name="last_name"
										placeholder="Tên chủ khách sạn"
										onChange={handleChangeLastName}
										error={lastNameError ? true : false}
										helperText={lastNameError}
										onFocus={() => setLastNameError('')}
									/>
								</Item>
							</Grid>
						</Grid>
						<TextField
							fullWidth
							label={'Địa chỉ'}
							id="txt_address"
							type="text"
							name="addrss"
							onChange={handleChangeAddress}
							error={addressError ? true : false}
							helperText={addressError}
							onFocus={() => setAddressError('')}
						/>
						<Grid container spacing={1}>
							<Grid sx={{ ml: '-8px' }} item md={6} xs={12}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Giới tính"
										value={gender}
										onChange={handleChangeGender}
									>
										<MenuItem value="Male">Nam</MenuItem>
										<MenuItem value="Female">Nữ</MenuItem>
										<MenuItem value="Orther">Giới tính khác</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item md={6} xs={12}>
								<Stack>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											label="Ngày sinh"
											format="DD/MM/YYYY"
											disableFuture
											onChange={handleChangeBirthday}
										/>
										<FormHelperText sx={{ color: 'red' }}>{birthdayError}</FormHelperText>
									</LocalizationProvider>
								</Stack>
							</Grid>
						</Grid>
						<Stack direction={'row'}>
							<Box flexGrow={1} display={'flex'} alignItems={'center'}>
								<Link style={{ textDecoration: 'none' }} to={'/login'}>
									<Typography
										color={'#1976D2'}
										sx={{
											':hover': {
												color: '#7f7f7f',
												textDecoration: 'underline',
											},
											flexGrow: 0,
										}}
									>
										Đã có tài khoản, Đăng nhập
									</Typography>
								</Link>
							</Box>
							<Button variant="contained" sx={{ paddingX: 2 }} type="submit">
								Đăng ký
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}

export default RegisterPage;
