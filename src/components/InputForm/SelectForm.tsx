import { FormControl, InputLabel, Select, MenuItem, Paper, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

interface Props {
	value: string;
	title: string;
	genders: Gender[];
	handleChangeGender: (event: SelectChangeEvent) => void;
}

interface Gender {
	value: string;
	name: string;
}

function SelectForm({ value, title, genders, handleChangeGender }: Props) {
	return (
		<>
			<Item elevation={0}>
				<Typography align="left" className="txt_title" sx={{ marginBottom: 1 }}>
					{title}
				</Typography>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">{title}</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={value}
						label="gender"
						onChange={handleChangeGender}
					>
						{genders.map((value) => {
							return (
								<MenuItem key={value.value} value={value.value}>
									{value.name}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Item>
		</>
	);
}

export default SelectForm;
