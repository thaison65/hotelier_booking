import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import hotelReducer from './hotelSlice';
import bookingSlice from './bookingSlice';
import roomSlice from './roomSlice';

const store = configureStore({
	reducer: {
		auth: authReducer.reducer,
		hotels: hotelReducer.reducer,
		bookings: bookingSlice.reducer,
		rooms: roomSlice.reducer,
	},
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
