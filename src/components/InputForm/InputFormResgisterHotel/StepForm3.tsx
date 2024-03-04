import { useState, ChangeEvent } from 'react';

import { Box, Stack, Typography, Paper, TextField, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import BtnImage from '~/components/Button/BtnImage/BtnImage';
import { BtnImageResult, ImageResult } from '~/models';
import { imgsState } from '~/routes/others';
import { DataDemo } from '~/pages/RegisterHotel';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

interface StepForm3Props {
	handleActive: (data: DataDemo) => void;
}

const StepForm3 = (props: StepForm3Props) => {
	const { handleActive } = props;

	const [fileImages, setFileImageData] = useState<File[]>([]);
	const [idImg, setIdImg] = useState<number[]>([]);

	const handlefileImageData = (imageId: BtnImageResult) => {
		// Xử lý dữ liệu của hình ảnh với id là imageId

		if (idImg.length > 0) {
			const filteredIds = idImg.filter((value) => value !== imageId.index);
			setIdImg(filteredIds);

			if (fileImages[imageId.index]) {
				fileImages.splice(imageId.index, 1); // Assuming fileImages is an array
			}
		}

		setFileImageData((prevfileImageData) => [...prevfileImageData, imageId.img_url]);
		setIdImg((prevIdImg) => [...prevIdImg, imageId.index]);
	};
	return (
		<>
			<Stack direction={'row'} justifyContent={'center'}>
				<Stack component={Paper} padding={4} spacing={2} borderRadius={4}>
					<Typography variant="h6" fontWeight={600}>
						Thêm một số hình ảnh về khách sạn
					</Typography>
					<Stack direction={'row'} justifyContent={'start'} spacing={2} width={'75%'}>
						{imgsState.map((img, index) => {
							return (
								<Box key={img._id}>
									<BtnImage
										src={img.img_url}
										_id={img._id}
										handleCLick={handlefileImageData}
										index={index}
									/>
								</Box>
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default StepForm3;
