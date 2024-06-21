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
  baseQuery: fetchBaseQuery({ baseUrl: API_URL,
    prepareHeaders:(headers,{getState})=>{
      const token = (getState() as RootState).login.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
   }),
   refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    tagTypes:["Add", "Delete"],
  endpoints: (builder) => ({
    //Traer todos los movimientos
    getMovements: builder.query<MovementsType[],void>({
      query: ()=> 'movements',
      providesTags:['Delete', 'Add']
    }),
    //Traer el saldo
    getBalance: builder.query<MovementsType[],void>({
      query: ()=> 'balance',
      providesTags:['Delete','Add']
    }),
    addMovements: builder.mutation<void,{amount:number}>({
      query:(amount)=>({
        url:'deposit',
        method:'POST',
        body:amount
      }),
      invalidatesTags:['Add']
    }),
    addWithdraw: builder.mutation<void,{amount:number}>({
      query:(amount)=>({
        url:'withdraw',
        method:'POST',
        body:amount
      }),
      invalidatesTags:['Add']
    }),
    deleteMovements: builder.mutation<{success: boolean; id: string }, string>({
      query: (id) => ({
        url: `delete?id=${id}`,
        method: 'DELETE'
      }),
      invalidatesTags:['Delete']
    })
  }),
});

export const { useGetMovementsQuery, useGetBalanceQuery ,useDeleteMovementsMutation, useAddWithdrawMutation,useAddMovementsMutation} = apiFinance;
