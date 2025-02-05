import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store;

// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat(tasksApi.middleware),