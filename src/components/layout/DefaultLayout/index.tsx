import { ReactElement, useState, MouseEventHandler, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Grid, Box, Typography, Stack } from '@mui/material';

import Main from '../common/Main';
import Sidebar from '../common/Sidebar';
import HeaderMain from '../common/Header/header-main';

type Props = {
	children: ReactElement;
};

interface Page {
	title: string;
	link: string;
}

function DefaultLayout({ children }: Props) {
	const location = useLocation();
	const [titlePage, setTitlePage] = useState<string>(() => {
		const storedTitlePage = localStorage.getItem('titlePage');
		return storedTitlePage as string;
	});

	useEffect(() => {
		const path = location.pathname;
		const storedPathPage = localStorage.getItem('pathPage');
		if (path !== storedPathPage) {
			setTitlePage('Tổng quan');
		}
	}, [location.pathname]);

	const handleTitlePage = (event: MouseEventHandler<HTMLAnchorElement> | undefined, page: Page) => {
		event?.name;
		setTitlePage(page.title); // Cập nhật giá trị của titlePage
		localStorage.setItem('titlePage', page.title);
		localStorage.setItem('pathPage', page.link);
	};

	return (
		<>
			<HeaderMain />
			<Stack direction={'row'} spacing={6}>
				<Box>
					<Sidebar handleTitlePage={handleTitlePage} />
				</Box>
				<Stack>
					<Main titlePage={titlePage}>{children}</Main>
				</Stack>
			</Stack>
		</>
	);
}

export default DefaultLayout;
