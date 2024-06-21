import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ModalState {
  isOpen: boolean;
  isOpenMovements:boolean;
  ID:string
}

const initialState: ModalState = {
  isOpen: false,
  isOpenMovements:false,
  ID:''
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    openModalMovements: (state) => {
      state.isOpenMovements = true;
    },
    closeModalMovements: (state) => {
      state.isOpenMovements = false;
    },
    setIdDelete:(state,action: PayloadAction<string>)=>{
      state.ID=action.payload
    }
  },
});

export const { openModal, closeModal,setIdDelete,closeModalMovements,openModalMovements } = modalSlice.actions;

export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
