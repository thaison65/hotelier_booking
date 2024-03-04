import { createSelector } from '@reduxjs/toolkit';
import { RoomStateResult, RoomsStateResult } from '~/models';
import { groupedRooms } from '~/utils';

export const roomSelector = (state: any) => state.rooms.room;
export const roomsSelector = (state: any) => state.rooms.rooms;
export const statusRoomSelector = (state: any) => state.rooms.status;
export const FilterHotelSelector = (state: any) => state.rooms.filterHotel;
export const idRoomSelectoer = (state: any) => state.rooms.id;

export const filterRooms = createSelector(
	roomsSelector,
	statusRoomSelector,
	FilterHotelSelector,
	(rooms: RoomsStateResult[], status: string, filterHotel: string) => {
		if (rooms.length === 0) {
			return;
		}
		const filteredRooms: RoomStateResult[] = rooms.flatMap((room) => {
			return room.newRooms.map((value) => {
				return { ...value, name_hotel: room.hotel.name };
			});
		});

		if (status === 'name') {
			if (filterHotel === '') {
				return rooms[0].newRooms.map((room) => {
					return { ...room, name_hotel: rooms[0].hotel.name };
				});
			}

			return filteredRooms.filter((room) => room.id_hotel === filterHotel);
		}

		if (filterHotel === '') {
			const datas = groupedRooms(rooms[0].newRooms);
			return datas.map((value) => {
				return { ...value, name_hotel: rooms[0].hotel.name };
			});
		}

		const newFilterRooms = filteredRooms.filter((room) => room.id_hotel === filterHotel);

		return groupedRooms(newFilterRooms);
	}
);

export const detailRoom = createSelector(
	roomsSelector,
	FilterHotelSelector,
	idRoomSelectoer,
	(rooms: RoomsStateResult[], filterHotel: string, id: string) => {
		let filteredRooms = [];

		if (filterHotel === '') {
			filteredRooms = rooms.length > 0 ? rooms[0].newRooms : [];
		} else {
			filteredRooms = rooms.flatMap((room) => {
				if (room.hotel._id === filterHotel) {
					return room.newRooms;
				}
				return [];
			});
		}

		return filteredRooms.find((room) => room._id === id);
	}
);
