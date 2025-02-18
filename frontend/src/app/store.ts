import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'

import authSlice from '../feauters/Login/authSlice';
import messagesSlice from '../feauters/Messages/messagesSlice';
import channelsSlice from '../feauters/Channels/channelsSlice';

import { channelsApi } from '../feauters/Channels/channelsApi';
import { messagesApi } from '../feauters/Messages/messagesApi';

const rootReducer = combineReducers({
  auth: authSlice,
  [channelsApi.reducerPath]: channelsApi.reducer,
  channelsSlice,
  messagesSlice,
  [messagesApi.reducerPath]: messagesApi.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),

});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootReducerType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
