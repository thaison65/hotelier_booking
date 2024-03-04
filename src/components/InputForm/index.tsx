import { Paper, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import SelectForm from './SelectForm';
import DateForm from './DateForm';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

interface Props {
	title: string;
	label: string;
	type: string;
	id: string;
	required?: boolean;
}

function InputForm({ title, label, type, id, required = false }: Props) {
	return (
		<>
			<Item elevation={0}>
				<Typography align="left" className="txt_title">
					{title}{' '}
					{required ? (
						<span style={{ color: '#ff0000' }} title="Không được để trống">
							*
						</span>
					) : (
						''
					)}
				</Typography>
				<TextField
					autoFocus
					margin="dense"
					id={id}
					name={id}
					fullWidth
					label={label}
					type={type}
					variant="outlined"
					required={required}
				/>
			</Item>
		</>
	);
}

export { SelectForm, DateForm };

export default InputForm;
