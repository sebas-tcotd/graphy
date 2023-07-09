import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GraphState {
  numberOfNodes: number | undefined;
  complexity: number | undefined;
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    numberOfNodes: undefined,
    complexity: undefined,
  } as GraphState,
  reducers: {
    setGraphData: (state, { payload }: PayloadAction<GraphState>) => {
      state.numberOfNodes = payload.numberOfNodes;
      state.complexity = payload.complexity;
    },
  },
});

export const { setGraphData } = graphSlice.actions;
