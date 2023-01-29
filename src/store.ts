import { configureStore } from '@reduxjs/toolkit';
import bestsellersReducer from './features/bestsellers/bestsellersSlice';
import markedBooksReducer from './features/markedBooks/markedBooksSlice';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    bestsellers: bestsellersReducer,
    markedBooks: markedBooksReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
