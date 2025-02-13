import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../app/apiRoutes';
import store from '../../app/store';
import { Channel } from './channelsSlice';

const baseUrl = routes.channels();

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl,
    prepareHeaders: (headers) => {
      const TOKEN: unknown = store.getState().auth.token;
      if (TOKEN) {
        headers.set('Authorization', `Bearer ${TOKEN}`);
      }
      return headers;
    },
   }),
  endpoints: (builder) => ({
    getChannels: builder.query<Channel[], void>({
      query: () => '',
    }),
    addChannel: builder.mutation<Channel, { name: string}>({
      query: ({ name }) => ({
          url: '',
          method: 'POST',
          body: { name: name},
        }
      )
    }),
    editChannel: builder.mutation<Channel[], void>({
      query: (id) => '',
    }),
    removeChannel: builder.mutation<Channel[], void>({
      query: (id) => '',
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
