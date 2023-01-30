import { configureStore } from '@reduxjs/toolkit';
import bestsellersReducer from './features/bestsellers/bestsellersSlice';
import markedBooksReducer from './features/markedBooks/markedBooksSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    bestsellers: bestsellersReducer,
    markedBooks: markedBooksReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
