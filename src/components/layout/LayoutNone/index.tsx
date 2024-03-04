import { ReactNode } from 'react';

interface LayoutNoneProps {
	children: ReactNode;
}

function LayoutNone({ children }: LayoutNoneProps) {
	return <>{children}</>;
}

export default LayoutNone;
