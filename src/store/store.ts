import { configureStore } from "@reduxjs/toolkit";
import { graphSlice, modalSlice } from "./slices";

export const store = configureStore({
  reducer: {
    graph: graphSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
