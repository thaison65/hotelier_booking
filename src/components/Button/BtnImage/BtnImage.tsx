import { ReactElement, ChangeEvent, useState, useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { BtnImageResult } from '~/models';

interface BtnImageProps {
	src: string;
	_id: string;
	handleCLick: (data: BtnImageResult) => void;
	index: number;
}

const BtnImage = (props: BtnImageProps): ReactElement => {
	const { src, _id, handleCLick, index } = props;

	const [imageSrc, setImageSrc] = useState<string>('');

	useEffect(() => {
		setImageSrc(src);
	}, [src]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const data = reader.result as string;
				setImageSrc(data);
				handleCLick({ img_url: file, index: index });
			};
		}
	};

	const handleDoubleClick = () => {
		console.log('double click nè');
	};

	return (
		<>
			<Box sx={{ width: 200, height: 200 }} position={'relative'} component={Paper}>
				{imageSrc !== '' ? (
					<img
						src={imageSrc ? imageSrc : ''}
						alt={_id}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
				) : (
					''
				)}
				<Button
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						margin: 'auto',
					}}
					variant="text"
					component="label"
					onDoubleClick={handleDoubleClick}
				>
					{imageSrc === '' ? <AddIcon /> : ''}
					<input type="file" hidden onChange={handleFileChange} />
				</Button>
			</Box>
		</>
	);
};

export default BtnImage;
