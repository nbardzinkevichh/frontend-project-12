import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat(tasksApi.middleware),