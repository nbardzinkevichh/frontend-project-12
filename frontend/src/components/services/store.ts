import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { useDispatch } from 'react-redux'
import { channelsApi } from './channelsApi';
import messagesSlice from './messagesSlice';
import channelsSlice from './channelsSlice';
import { messagesApi } from './messagesApi';


// localStorage.clear();
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



export type RootReducerType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store;
