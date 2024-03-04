import { ReactNode } from 'react';
import HeaderMain from '../common/Header/header-main';

type Props = {
	children: ReactNode;
};

function LayoutOneHeader({ children }: Props) {
	return (
		<>
			<HeaderMain />
			{children}
		</>
	);
}

export default LayoutOneHeader;
