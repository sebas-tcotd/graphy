import { configureStore } from "@reduxjs/toolkit";
import { graphSlice } from "./slices/graph";
import { modalSlice } from "./slices/modal";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    graph: graphSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
