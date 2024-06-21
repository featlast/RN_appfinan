import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';
import loginSlice from './feature/loginSlice';
import { apiAuth } from '../api/apiAuth';
import { apiFinance } from '../api/apiFinance';
import modalReducer from './feature/modalSlice';


export const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiFinance.reducerPath]: apiFinance.reducer,
    login: loginSlice,
    modal: modalReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiAuth.middleware, apiFinance.middleware]),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
