import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../app/apiRoutes';
import store from '../store.ts';
import { Message } from './messagesSlice';

const baseUrl = routes.messages();

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
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
    getMessages: builder.query<Message[], void>({
      query: () => '',
    }),
    sendMessage: builder.mutation<Message, { message: string, channelId: string | 0, username: string }>({
      query: ({ message, channelId, username }) => ({
        url: '',
        method: 'POST',
        body: { body: message, channelId, username }
      }),
    })
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation
} = messagesApi;
