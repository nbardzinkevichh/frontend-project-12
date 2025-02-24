import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../components/Login/Login.tsx';
import type { RootState } from '../store.ts';

interface AuthState {
  username: string | unknown | null;
  token: string | unknown | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { 
    username: localStorage.getItem('username') || null,
    token: localStorage.getItem('token') || null,
   } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, token },
      }: PayloadAction<{ username: Pick<User, "username"> | string; token: string }>,
    ) => {
      state.username = username
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.username
export const selectCurrentToken = (state: RootState) => state.auth.token
