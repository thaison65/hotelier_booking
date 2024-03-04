import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
	titlePage: string;
	children: ReactElement;
}

function Main({ children, titlePage }: Props) {
	return (
		<>
			<Box sx={{ mt: 8, ml: -4 }}>
				<Typography variant="h4" color={'GrayText'} sx={{ fontWeight: 600 }}>
					{titlePage}
				</Typography>
				<Box sx={{ mt: 4, mr: 4, borderRadius: 4 }}>{children}</Box>
			</Box>
		</>
	);
}

export default Main;
