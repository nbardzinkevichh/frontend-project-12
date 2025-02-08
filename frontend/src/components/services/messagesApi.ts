import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes';
import store from './store';
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
    editMessage: builder.mutation<Message, void>({
      query: (id) => '',
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useEditMessageMutation,
} = messagesApi;
