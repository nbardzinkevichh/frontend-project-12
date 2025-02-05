import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../routes/AuthForm/AuthForm';
import type { RootState } from './index';

interface AuthState {
  username: Pick<User, "username"> | null;
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { 
    username: localStorage.getItem('username') ?? null,
    token: localStorage.getItem('token') ?? null
   } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, token },
      }: PayloadAction<{ username: Pick<User, "username">; token: string }>,
    ) => {
      state.username = username
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.username
