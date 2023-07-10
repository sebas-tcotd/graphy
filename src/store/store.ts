import { configureStore } from "@reduxjs/toolkit";
import { graphSlice } from "./slices/graph";
import { modalSlice } from "./slices/modal";

export const store = configureStore({
  reducer: {
    graph: graphSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
