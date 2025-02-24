import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store.ts';
import { deleteChannel } from '../Channels/channelsSlice';

export interface Message {
  id?: string;
  body: string;
  channelId: string;
  username: string;
}

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
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const channelId = action.payload.id;
      
      state.messages = state.messages.filter((message) => message.channelId !== channelId);
      
    });
  }
})

export const { setMessages, setMessage } = slice.actions

export default slice.reducer

export const selectMessages = (state: RootState) => state.messagesSlice.messages;
