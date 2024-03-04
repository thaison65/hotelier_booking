import { BookingStateData, GroupedRoom, RoomStateResult } from '~/models';

export function sortByTimeOfBookings(array: BookingStateData[]) {
	const newArray = Object.values(array);
	newArray.sort((a, b) => {
		const aTime = Math.max(new Date(a.createdAt).getTime(), new Date(a.updatedAt).getTime());
		const bTime = Math.max(new Date(b.createdAt).getTime(), new Date(b.updatedAt).getTime());
		return bTime - aTime;
	});
	return newArray;
}

export const groupedRooms = (rooms: RoomStateResult[]): GroupedRoom[] => {
	// Tạo một đối tượng để lưu trữ các phòng theo id_roomType
	const groupedRooms: GroupedRoom[] = Object.values(
		rooms.reduce<{ [key: string]: GroupedRoom }>((acc, room) => {
			const { id_roomType, img, name_hotel } = room;
			if (acc[id_roomType._id]) {
				acc[id_roomType._id].count += 1;
			} else {
				acc[id_roomType._id] = {
					roomType: id_roomType,
					img: img,
					name_hotel: name_hotel,
					count: 1,
				};
			}
			return acc;
		}, {})
	);

	return groupedRooms;
};
