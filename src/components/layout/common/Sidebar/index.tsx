import { MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material';
import './Sidebar.scss';

import { Page, PAGES_ADMIN } from './routes';

interface Props {
	handleTitlePage: (event: MouseEventHandler<HTMLAnchorElement> | undefined, page: Page) => void;
}

function Sidebar({ handleTitlePage }: Props) {
	return (
		<>
			<Box
				sx={{
					height: '105%',
					width: '18vw',
					maxWidth: 360,
					bgcolor: '#037CCE',
					color: '#ffffff',
					zIndex: 1,
					marginTop: -6,
					marginLeft: 4,
					borderRadius: 4,
					display: { xs: 'none', md: 'block' },
				}}
				component={Paper}
			>
				<Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, padding: 4 }}>
					Quản lý khách sạn
				</Typography>
				<nav aria-label="main mailbox folders">
					<Typography sx={{ textAlign: 'center', fontWeight: 600 }}>Quản lý thông tin</Typography>
					<Divider variant="middle" sx={{ margin: 2 }} />

					<List>
						{PAGES_ADMIN.map((page, index) => {
							return (
								<ListItem key={index} disablePadding sx={{ mt: 1, borderRadius: 4 }}>
									<NavLink
										className={({ isActive }) => (isActive ? 'active link-page' : 'link-page')}
										to={page.link}
										onClick={() => {
											handleTitlePage(undefined, page);
										}}
									>
										<ListItemButton
											sx={{
												borderRadius: 4,
												':hover': { backgroundColor: 'rgba(1, 24, 74, 0.5)' },
											}}
										>
											<ListItemIcon>
												<page.Icon className="color-icon" />
											</ListItemIcon>
											<ListItemText primary={page.title} />
										</ListItemButton>
									</NavLink>
								</ListItem>
							);
						})}
					</List>
				</nav>
				<Divider variant="middle" sx={{ margin: 2 }} />
			</Box>
		</>
	);
}

export default Sidebar;
