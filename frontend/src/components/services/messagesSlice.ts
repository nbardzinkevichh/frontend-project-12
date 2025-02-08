import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

// [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]

export type Message = {
  id: string;
  body: string;
  channelId: string;
  username: string;
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
  },
})

export const { setMessages } = slice.actions

export default slice.reducer

export const selectMessages = (state: RootState) => state.messagesSlice.messages;
// export const activeChannelMessages = (state: RootState, activeId: string) => state.messagesSlice.messages.filter((message) => message.id === activeId);
