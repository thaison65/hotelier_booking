import { createSelector } from '@reduxjs/toolkit';
import { BookingStateData } from '~/models';
import { sortByTimeOfBookings } from '~/utils';

export const bookingsSelector = (state: any) => state.bookings.bookings;
export const valueHotelSelector = (state: any) => state.bookings.filterHotel;
export const statusSelector = (state: any) => state.bookings.status;
export const checkInDateSelector = (state: any) => state.bookings.checkInDate;
export const checkOutDateSelector = (state: any) => state.bookings.checkOutDate;
export const idBookingSelector = (state: any) => state.bookings.idBooking;

export const filterBookings = createSelector(
	bookingsSelector,
	valueHotelSelector,
	statusSelector,
	checkInDateSelector,
	checkOutDateSelector,
	(
		bookings: BookingStateData[],
		valueHotelSelector: string,
		statusSelector: string,
		checkInDate: string,
		checkOutDate: string
	) => {
		if (bookings.length === 0 || bookings[0] === null) {
			return;
		}
		const newBookings = bookings.filter((booking) => booking !== null);

		const sortBookings = sortByTimeOfBookings(newBookings);

		return sortBookings.filter((booking) => {
			if (
				(statusSelector === 'New' && valueHotelSelector === 'All') ||
				checkInDate === '' ||
				checkOutDate === ''
			) {
				return booking;
			}

			if (statusSelector === 'New') {
				return booking.hotel._id === valueHotelSelector;
			}
			if (valueHotelSelector === 'All') {
				return booking.status === statusSelector;
			}
			return booking.hotel._id === valueHotelSelector && booking.status === statusSelector;
		});
	}
);
export const filterDetailBooking = createSelector(
	bookingsSelector,
	idBookingSelector,
	(bookings: BookingStateData[], idBooking: string) => {
		if (bookings[0] === null) {
			return;
		}
		const newBookings = bookings.filter((booking) => booking !== null);
		return newBookings.find((booking) => booking._id === idBooking);
	}
);
