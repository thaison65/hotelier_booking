import { useState } from 'react';
import { Stack } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface InputDateInProps {
	dateNumber?: string;
	onDateOut?: (date: Date) => void;
	onDateIn: (date: Date) => void;
}

export default function InputDateIn({
	dateNumber = '',
	onDateOut = (date: Date) => {
		return;
	},
	onDateIn,
}: InputDateInProps) {
	const [checkindate, setCheckindate] = useState<Date>(new Date());

	const handleChangeCheckInDate = (newDate: Date | null) => {
		if (newDate) {
			setCheckindate(newDate);
			onDateIn(newDate);
			const currentDate = new Date(newDate);
			const nextDay = new Date(currentDate.setDate(currentDate.getDate() + parseInt(dateNumber)));
			onDateOut(nextDay);
		}
	};
	return (
		<Stack>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker format="DD/MM/YYYY" onChange={handleChangeCheckInDate} disablePast />
			</LocalizationProvider>
		</Stack>
	);
}
