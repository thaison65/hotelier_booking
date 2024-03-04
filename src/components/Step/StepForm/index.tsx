import { Fragment, ReactNode, useState, ReactElement } from 'react';
import { Stepper, Step, StepLabel, Typography, Box, Button, Stack } from '@mui/material';
import { DataDemo } from '~/pages/RegisterHotel';

const steps = ['Thông tin cơ bản của khách sạn', 'Chọn khu vực hoạt động', 'Hình ảnh khách sạn'];

interface StepFormProps {
	children: ReactElement;
	handleActive: (data: DataDemo) => void;
}

const StepForm = ({ ...props }: StepFormProps) => {
	const { children, handleActive } = props;

	const [activeStep, setActiveStep] = useState<number>(0);
	const [skipped, setSkipped] = useState(new Set<number>());

	const isStepOptional = (step: number) => {
		return step === 1;
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		handleActive({ id: activeStep + 1 });
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		handleActive({ id: activeStep - 1 });
	};

	const handleReset = () => {
		setActiveStep(0);
		handleActive({ id: 0 });
	};

	return (
		<Box p={2}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: ReactNode;
					} = {};
					if (isStepOptional(index)) {
						labelProps.optional = '';
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} height={200}>
					<Box>
						<Typography variant="h6" fontWeight={500} sx={{ mt: 2, mb: 1 }}>
							Bạn đã hoàn thành các bước đăng ký thông tin cho khách sạn
						</Typography>
						<Stack direction={'row'} justifyContent={'center'}>
							<Button
								variant="contained"
								color="error"
								disabled={activeStep === 0}
								onClick={handleReset}
								sx={{ mr: 1 }}
							>
								Reset
							</Button>
							<Button
								variant="contained"
								color="primary"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Gửi thông tin
							</Button>
						</Stack>
					</Box>
				</Stack>
			) : (
				<Fragment>
					<Box margin={2}>{children}</Box>
					<Stack direction={'row'} justifyContent={'space-between'} marginY={2}>
						<Button
							variant="contained"
							color="warning"
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>

						<Box display={'flex'}>
							<Typography marginX={2}>Điều khoản và chính sách</Typography>
							<Button variant="contained" color="warning" onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
							</Button>
						</Box>
					</Stack>
				</Fragment>
			)}
		</Box>
	);
};

export default StepForm;
