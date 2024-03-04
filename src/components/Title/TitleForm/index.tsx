import { Box, Typography } from '@mui/material';

interface TitleFormProps {
	title: string;
}

const TitleForm = (props: TitleFormProps) => {
	const { title } = props;
	return (
		<Box padding={2} display={'flex'}>
			<Typography fontWeight={600} variant="h4" color={'#1976D2'} flexGrow={1}>
				{title}
			</Typography>
			<Typography fontWeight={500} color={'GrayText'}>
				<span style={{ color: 'red' }}>*</span> Những thông tin không được để trống
			</Typography>
		</Box>
	);
};

export default TitleForm;
