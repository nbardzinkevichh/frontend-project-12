import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';

export interface Message {
  id?: string;
  body: string;
  channelId: string;
  username?: string;
};

type Messages = {
  messages: Message[];
};

const initialState: Messages = {
  messages: [],
}

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (
      state,
      {
        payload: { messages },
      }: PayloadAction<{ messages: Message[] }>,
    ) => {
      state.messages = messages;
    },
    setMessage: (
      state,
      {
        payload: { message },
      }: PayloadAction<{ message: Message }>,
    ) => {
      state.messages.push(message);
    }
  },
})

export const { setMessages, setMessage } = slice.actions

export default slice.reducer

export const selectMessages = (state: RootState) => state.messagesSlice.messages;
// export const activeChannelMessages = (state: RootState, activeId: string) => state.messagesSlice.messages.filter((message) => message.id === activeId);
