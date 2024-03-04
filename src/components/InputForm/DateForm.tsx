import { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

interface Props {
	title: string;
}

function DateForm({ title }: Props) {
	const [value, setValue] = useState<Dayjs | null>(null);

	return (
		<>
			<Item elevation={0}>
				<Typography align="left" className="txt_title">
					{title}
				</Typography>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={['DatePicker']}>
						<DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
					</DemoContainer>
				</LocalizationProvider>
			</Item>
		</>
	);
}

export default DateForm;
