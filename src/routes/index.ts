import { ComponentType, ReactNode, FC } from 'react';
import { LayoutNone, LayoutOfForm, LayoutOneHeader } from '~/components/layout';

import {
	LoginPage,
	RegisterPage,
	RegisterHotelPage,
	ProductHotelPage,
	RoomPage,
	DetailHotelPage,
	BookingPage,
	RegisterRoomPage,
} from '~/pages';

export interface Element {
	path: string;
	element: ComponentType;
	layout?: FC<{ children: ReactNode }>;
}

const publicRoutes: Element[] = [
	{ path: '/login', element: LoginPage, layout: LayoutNone },
	{ path: '/register', element: RegisterPage, layout: LayoutNone },
];

const privateRoutes: Element[] = [
	{ path: '/register-hotel', element: RegisterHotelPage, layout: LayoutOfForm },
	{ path: '/register-room', element: RegisterRoomPage, layout: LayoutOfForm },
	{ path: '/', element: ProductHotelPage },
	{ path: '/phong', element: RoomPage },
	{ path: '/datphong', element: BookingPage },
	{ path: '/detail-hotel/:id', element: DetailHotelPage, layout: LayoutOfForm },
];

export { publicRoutes, privateRoutes };
