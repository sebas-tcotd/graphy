import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isActive: boolean;
}

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isActive: false,
  } as ModalState,
  reducers: {
    setActiveModal: (state, { payload }: PayloadAction<ModalState>) => {
      state.isActive = payload.isActive;
    },
  },
});

export const { setActiveModal } = modalSlice.actions;
