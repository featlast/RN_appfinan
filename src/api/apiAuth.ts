import { API_URL, API_URL_LOGIN } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL_LOGIN
   }),
  endpoints: (builder) => ({
    signIn: builder.mutation<string,string>({
      query: (body) => ({
        url: 'signIn',
        method: 'POST',
        body,
        responseHandler:(response)=> response.text(),
      }),
    }),
  }),
});

export const { useSignInMutation } = apiAuth;
