import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.0.2.2:3000/api/login/v1/'
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
