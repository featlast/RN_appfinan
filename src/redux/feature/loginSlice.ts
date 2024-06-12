import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TextInputState {
  token: string;
  email: string;
}

const initialState: TextInputState = {
  token: '',
  email:''
};

const textInputSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token=action.payload;
    },
    changeText: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { addToken,changeText } = textInputSlice.actions;
export default textInputSlice.reducer;
