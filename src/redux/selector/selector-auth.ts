// import { createSelector } from '@reduxjs/toolkit';

// Định nghĩa selector
export const profileUserHotelSelector = (state: any) => state.auth.profile;
export const isLoggedInSelector = (state: any) => state.auth.isLoggedIn;
export const userHotelSelector = (state: any) => state.auth.user;
export const errorSelector = (state: any) => state.auth.error;
