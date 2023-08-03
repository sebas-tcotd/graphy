import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GraphStatus, GraphAlgorithmTypes } from "../../../enums";
import { LayoutTypes } from "../../../enums/LayoutTypes";

interface GraphState {
  complexity?: number;
  layout?: LayoutTypes;
  numberOfNodes?: number;
  algorithmUsed?: GraphAlgorithmTypes;
  status?: GraphStatus;
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    complexity: undefined,
    layout: undefined,
    numberOfNodes: undefined,
    algorithmUsed: undefined,
    status: GraphStatus.NOT_CREATED,
  } as GraphState,
  reducers: {
    setGraphData: (state, { payload }: PayloadAction<GraphState>) => {
      state.numberOfNodes = payload.numberOfNodes;
      state.complexity = payload.complexity;
      state.layout = payload.layout;
      state.algorithmUsed = undefined;
    },
    setGraphStatus: (
      state,
      { payload }: PayloadAction<{ status: GraphStatus }>
    ) => {
      state.status = payload.status;
    },
    setGraphLayout: (
      state,
      { payload }: PayloadAction<{ layout: LayoutTypes }>
    ) => {
      state.layout = payload.layout;
    },
    setGraphAlgorithm: (
      state,
      { payload }: PayloadAction<{ algorithmUsed?: GraphAlgorithmTypes }>
    ) => {
      state.algorithmUsed = payload.algorithmUsed;
    },
  },
});

export const {
  setGraphData,
  setGraphLayout,
  setGraphStatus,
  setGraphAlgorithm,
} = graphSlice.actions;
