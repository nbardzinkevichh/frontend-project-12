import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';

export interface Channel {
  id: string;
  name: string;
  removable: boolean;
};

export interface Channels {
  channels: Channel[];
  activeChannel: Channel | null;
};
const initialState: Channels = {
  channels: [],
  activeChannel: null,
}

const slice = createSlice({
  name: 'channelsSlice',
  initialState,
  reducers: {
    setChannels: (state, { payload: { channels }, }: PayloadAction<{ channels: Channel[] }>, ) => {
      state.channels = channels;
    },
    setActiveChannel: (state, action: PayloadAction<Channel>) => {
      state.activeChannel = action.payload;
    },
    setChannel: (state, action: PayloadAction<Channel>, ) => {
      state.channels.push(action.payload);
    },
    editChannelName: (state, action: PayloadAction<Channel>) => {
      const channel = state.channels.find((channel) => channel.id === action.payload.id);
      if (channel) {
        channel.name = action.payload.name
      }
    },
    deleteChannel: ( state, action: PayloadAction<{id: string}>) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload.id);
    }
  }, 
})

export const { setChannels, setActiveChannel, setChannel, editChannelName, deleteChannel } = slice.actions;

export default slice.reducer;

export const selectChannels = (state: RootState) => state.channelsSlice.channels;
export const getActiveChannel = (state: RootState) => state.channelsSlice.activeChannel;
