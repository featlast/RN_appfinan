import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';
import { API_URL } from '@env';

type MovementsType={
  _id: string,
  userId: string,
  amount: number,
  type: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}


export const apiFinance = createApi({
  reducerPath: 'apiFinance',
  refetchOnMountOrArgChange:true,
  keepUnusedDataFor:0,
  refetchOnReconnect:true,
  baseQuery: fetchBaseQuery({ baseUrl: API_URL,
    prepareHeaders:(headers,{getState})=>{
      const token = (getState() as RootState).login.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
   }),
  endpoints: (builder) => ({
    getMovements: builder.query<MovementsType[],void>({
      query: ()=> 'movements',
    }),
  }),
});

export const { useGetMovementsQuery } = apiFinance;
