import { ReactNode } from 'react';
import HeaderOfForm from '../common/Header/header-of-form';

interface LayoutOfFormProps {
	children: ReactNode;
}

function LayoutOfForm({ children }: LayoutOfFormProps) {
	return (
		<>
			<HeaderOfForm />
			{children}
		</>
	);
}

export default LayoutOfForm;
