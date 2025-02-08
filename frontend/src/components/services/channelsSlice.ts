import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

export type Channel = {
  id: string;
  name: string;
  removable: boolean;
};

export type Channels = {
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
    setChannels: ( state, { payload: { channels }, }: PayloadAction<{ channels: Channel[] }>, ) => {
      state.channels = channels;
    },
    setActiveChannel: (state, { payload: { activeChannel }, }: PayloadAction<{ activeChannel: Channel }>) => {
      state.activeChannel = activeChannel;
    }
  },
})

export const { setChannels, setActiveChannel } = slice.actions;

export default slice.reducer;

export const selectChannels = (state: RootState) => state.channelsSlice.channels;
export const getActiveChannel = (state: RootState) => state.channelsSlice.activeChannel;
