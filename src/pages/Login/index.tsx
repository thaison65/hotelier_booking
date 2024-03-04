import { useState, ChangeEvent, MouseEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import {
	Box,
	Button,
	FormControl,
	Paper,
	Stack,
	TextField,
	Typography,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormHelperText,
	Dialog,
	Alert,
	AlertTitle,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';

import { loginUser } from '~/services/authService';

import { InvalidEmailException, InvalidPasswordException } from '~/utils';

export interface FormValues {
	email: string;
	password: string;
}

// export interface LoginPageProps {}

function LoginPage() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [emailError, setEmailError] = useState<string>('');
	const [pwdError, setPwdError] = useState<string>('');

	const [alertFail, setAlertFail] = useState<boolean>(false);
	const [openAlert, setOpenAlert] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleChangeemail = (event: ChangeEvent<{ value: unknown }>) => {
		setEmail(event.target.value as string);
	};

	const handleChangePassword = (event: ChangeEvent<{ value: unknown }>) => {
		setPassword(event.target.value as string);
	};

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleCloseAlert = () => {
		setOpenAlert(false);
		if (!alertFail) {
			navigate('/');
			return;
		}
	};

	const handleSubmintLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			dispatch(loginUser({ email, password }));
			setOpenAlert(true);
		} catch (error: unknown) {
			if (error instanceof InvalidEmailException) {
				setEmailError(error.message);
				console.log(error.message);
				return;
			}
			if (error instanceof InvalidPasswordException) {
				setPwdError(error.message);
				console.log(error.message);
				return;
			}
			console.log(error + ' login page');
			setAlertFail(true);
		}
	};

	return (
		<Box bgcolor={'#F8F7F9'}>
			<Dialog open={openAlert} onClose={handleCloseAlert}>
				<Alert
					sx={{ fontSize: 16 }}
					severity={alertFail ? 'error' : 'success'}
					action={
						<IconButton aria-label="close" color="inherit" size="small" onClick={handleCloseAlert}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					<AlertTitle>
						Đăng nhập tài khoản khách sạn {alertFail ? 'thất bại' : 'thành công'}
					</AlertTitle>
					Bạn đã{' '}
					<strong>{alertFail ? 'Sai tài khoản hoặc mật khẩu' : 'Đăng nhập thành công'}!</strong>
				</Alert>
			</Dialog>

			<Stack
				component={'form'}
				method="POST"
				onSubmit={handleSubmintLogin}
				minHeight={'100vh'}
				direction={'row'}
				alignItems={'center'}
				justifyContent={'center'}
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
						Đăng nhập tài khoản khách sạn
					</Typography>

					<Stack spacing={2} width={'100%'}>
						<TextField
							fullWidth
							label={'Địa chỉ E-mail'}
							id="txt_email"
							name="email"
							onChange={handleChangeemail}
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
						<Box display={'flex'} justifyContent={'end'}>
							<Link style={{ textDecoration: 'none' }} to={'/recover'}>
								<Typography color={'#7f7f7f'} sx={{ ':hover': { color: '#1976d2' } }}>
									Bạn quên mật khẩu?
								</Typography>
							</Link>
						</Box>
						<Stack direction={'row'}>
							<Box flexGrow={1} display={'flex'} alignItems={'center'}>
								<Link style={{ textDecoration: 'none' }} to={'/register'}>
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
										Tạo tài khoản
									</Typography>
								</Link>
							</Box>
							<Button variant="contained" sx={{ paddingX: 2 }} type="submit">
								Đăng nhập
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}

export default LoginPage;
