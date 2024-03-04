import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

type DialogImageProps = {
	handleClose: () => void;
	open: boolean;
	img: string;
	title: string;
};

const DialogImage = (props: DialogImageProps) => {
	const { handleClose, open, img, title } = props;

	return (
		<>
			<BootstrapDialog
				fullWidth={true}
				maxWidth={'md'}
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					{title}
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent>
					<img src={img} alt="" width={'100%'} />
				</DialogContent>
			</BootstrapDialog>
		</>
	);
};

export default DialogImage;
