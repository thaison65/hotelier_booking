import PersonIcon from '@mui/icons-material/Person';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

export interface Page {
	Icon: any;
	title: string;
	link: string;
}

export const PAGES_ADMIN: Page[] = [
	{ Icon: PersonIcon, title: 'Thông tin các khách sạn', link: '/' },
	{ Icon: FolderSharedIcon, title: 'Thông tin các phòng', link: '/phong' },
	{ Icon: SwitchAccountIcon, title: 'Quản lý đặt phòng', link: '/datphong' },
];
